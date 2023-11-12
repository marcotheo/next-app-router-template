'use server';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as z from 'zod';
import { registerUser, logout, refreshToken } from '@/app/_server/service/auth';
import { generateNewNextAuthSession, revokeNextAuthSession, setNextAuthSession } from '@/app/_server/service/nextauth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { regFormSchema } from './form_schema';

export const registerAction = async (values: z.infer<typeof regFormSchema>) => {
  const data = regFormSchema.safeParse(values);

  if (!data.success) {
    console.log(data.error);
    throw 'invalid input';
  }

  await registerUser(data.data);
};

export const logoutAction = async (includeNextAuth?: boolean) => {
  const session = await getServerSession(options);
  if (!!session?.cognito?.accessToken) await logout({ accessToken: session.cognito.accessToken });
  if (!!includeNextAuth) revokeNextAuthSession();
};

export const refreshTokenAction = async (path: string) => {
  const session = await getServerSession(options);

  const logoutHelper = async (accessToken: string) => {
    await logout({ accessToken: accessToken });
    revokeNextAuthSession();
    revalidatePath(path);
    return null;
  };

  if (!!session?.cognito) {
    const result = await refreshToken({
      refreshToken: session.cognito.refreshToken,
      username: session.cognito.username,
    });

    if (!result) return await logoutHelper(session.cognito.accessToken);

    const tokenChunks = await generateNewNextAuthSession(session, {
      accessToken: result.accessToken,
      expiresAt: result.expiresAt,
      expiresIn: result.expiresIn,
    });

    if (tokenChunks) {
      setNextAuthSession(tokenChunks);
      return {
        expiresAt: result.expiresAt,
      };
    } else return await logoutHelper(result.accessToken);
  }

  return null;
};
