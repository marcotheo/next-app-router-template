import { cookies } from 'next/headers';
import { Session } from 'next-auth';
import { encode } from 'next-auth/jwt';
import { constants } from '../constants';

export const revokeNextAuthSession = () => {
  const resCookies = cookies();

  resCookies.getAll().forEach((cookie) => {
    if (cookie.name.includes('next-auth')) resCookies.delete(cookie.name);
  });
};

export const generateNewNextAuthSession = async (
  session: Session,
  newToken: { accessToken: string; expiresIn: number; expiresAt: number },
) => {
  const newSessionToken = await encode({
    secret: constants.nextAuthSecret,
    token: {
      ...session,
      cognito: {
        ...session.cognito,
        accessToken: newToken.accessToken,
        expiresIn: newToken.expiresIn,
        expiresAt: newToken.expiresAt,
      },
    },
    maxAge: 1 * 24 * 60 * 60, // 1 day
  });

  const size = 3933; // maximum size of each chunk
  const regex = new RegExp('.{1,' + size + '}', 'g');
  // split the string into an array of strings
  const tokenChunks = newSessionToken.match(regex);

  return tokenChunks;
};

export const setNextAuthSession = (tokenChunks: RegExpMatchArray) => {
  const resCookies = cookies();

  const sessionCookie = constants.nextAuthUrl.startsWith('https://')
    ? '__Secure-next-auth.session-token'
    : 'next-auth.session-token';

  const isCookieSecure = constants.nextAuthUrl.startsWith('https://');

  tokenChunks.forEach((tokenChunk, index) => {
    resCookies.set(`${sessionCookie}.${index}`, tokenChunk, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60, // 1 day
      secure: !!isCookieSecure,
      sameSite: 'lax',
    });
  });
};
