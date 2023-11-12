import dayjs from 'dayjs';
import {
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  CognitoIdentityProviderClient,
  AdminCreateUserCommandInput,
  InitiateAuthCommand,
  AuthFlowType,
  GlobalSignOutCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { createUsers, getUserByUsername } from '../drizzle/users';
import { constants } from '../constants';
import { createSecretHash, decodeToken } from './cognito_utils';

const client = new CognitoIdentityProviderClient({
  region: constants.Region,
  credentials: {
    accessKeyId: constants.AccessKeyId as string,
    secretAccessKey: constants.SecretAccessKey as string,
  },
});

const userPoolId = constants.UserPoolId;

export const registerUser = async ({ username, password }: { username: string; password: string }) => {
  try {
    const userResult = await createUsers(username);

    if (userResult.rowsAffected === 1) {
      const createAdminUserInput: AdminCreateUserCommandInput = {
        Username: username,
        UserPoolId: userPoolId,
        MessageAction: 'SUPPRESS',
        ClientMetadata: {
          dbUserId: userResult.insertId,
        },
      };

      createAdminUserInput.TemporaryPassword = password;
      await client.send(new AdminCreateUserCommand(createAdminUserInput));
      await client.send(
        new AdminSetUserPasswordCommand({
          Username: username,
          Password: password,
          UserPoolId: userPoolId,
          Permanent: true,
        }),
      );

      return true;
    }

    return false;
  } catch (e: any) {
    console.error('users.ts: ', { e });
    if (e.message.includes('Duplicate entry')) throw new Error('Username already exist! Try another one!');
    throw new Error('Something Went Wrong');
  }
};

export const authenticate = async ({ username, password }: { username: string; password: string }) => {
  try {
    const checkIfUserExist = await getUserByUsername(username);

    if (checkIfUserExist.length === 0) return null;

    const hash = createSecretHash(username);
    const result = await client.send(
      new InitiateAuthCommand({
        ClientId: constants.appClientId,
        AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
          SECRET_HASH: hash,
        },
      }),
    );

    const user = await decodeToken(result.AuthenticationResult?.AccessToken ?? '');

    if (!result.AuthenticationResult) return null;

    return {
      authenticatedResults: result.AuthenticationResult,
      expiresAt: dayjs()
        .add(result.AuthenticationResult?.ExpiresIn ?? 300, 'seconds')
        .unix(),
      id: user.sub,
      userId: checkIfUserExist[0].id,
      username,
    };
  } catch (e) {
    console.error('users.ts: ', { e });
    return null;
  }
};

export const logout = async ({ accessToken }: { accessToken: string }) => {
  const globalSignOutCommand = new GlobalSignOutCommand({
    AccessToken: accessToken,
  });
  const res = await client.send(globalSignOutCommand);
  return res;
};

export async function refreshToken({ refreshToken, username }: { refreshToken: string; username: string }) {
  try {
    const hash = createSecretHash(username);
    const command = new InitiateAuthCommand({
      ClientId: constants.appClientId,
      AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
        SECRET_HASH: hash,
      },
    });

    const result = await client.send(command);

    if (
      !result.AuthenticationResult ||
      !result.AuthenticationResult.AccessToken ||
      !result.AuthenticationResult.ExpiresIn ||
      !result.AuthenticationResult.IdToken
    )
      return null;

    return {
      idToken: result.AuthenticationResult.IdToken,
      accessToken: result.AuthenticationResult.AccessToken,
      expiresIn: result.AuthenticationResult.ExpiresIn,
      expiresAt: dayjs()
        .add(result.AuthenticationResult.ExpiresIn ?? 300, 'seconds')
        .unix(),
    };
  } catch (err) {
    console.error(err);
    throw {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'auth.ts: refresh token failed',
    };
  }
}
