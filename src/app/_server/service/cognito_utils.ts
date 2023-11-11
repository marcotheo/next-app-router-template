import crypto from 'crypto';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { JwtExpiredError as JWTErrorExpired } from 'aws-jwt-verify/error';
import { constants } from '../constants';

export const JwtExpiredError = JWTErrorExpired;

export const verifier = CognitoJwtVerifier.create({
  userPoolId: constants.UserPoolId as string,
  tokenUse: 'access',
  clientId: constants.appClientId as string,
});

export const createSecretHash = (username: string) => {
  const appClientId = constants.appClientId;
  const userPoolSecret = constants.appClientSecret;

  const hmac = crypto.createHmac('sha256', userPoolSecret as string);
  const data = hmac.update(username + appClientId);
  return data.digest('base64');
};

export const decodeToken = async (token: string) => {
  return verifier.verify(token);
};
