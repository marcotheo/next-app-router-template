import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { JWT, encode } from 'next-auth/jwt';
import { revokeNextAuthSession } from '@/app/_server/service/nextauth';
import { constants } from '@/server/constants';

export const sessionCookie = constants.nextAuthUrl.startsWith('https://')
  ? '__Secure-next-auth.session-token'
  : 'next-auth.session-token';

export const isCookieSecure = constants.nextAuthUrl.startsWith('https://');

export const signOut = async (request: NextRequest, accessToken: string) => {
  console.log('signinOut');
  const response = NextResponse.redirect(new URL('/login', request.url));

  request.cookies.getAll().forEach((cookie) => {
    if (cookie.name.includes('next-auth')) response.cookies.delete(cookie.name);
  });

  await fetch(constants.nextAuthUrl + '/api/auth/logout', {
    method: 'POST',
    body: JSON.stringify({
      accessToken,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const refreshToken = async (refreshToken: string, username: string) => {
  const res = await fetch(constants.nextAuthUrl + '/api/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({
      username,
      refreshToken,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return data as {
    idToken: string;
    accessToken: string;
    expiresIn: number;
    expiresAt: number;
  } | null;
};

export const generateNewSessionToken = async (
  session: JWT,
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

export const setNextCookies = (tokenChunks: RegExpMatchArray | null, req: NextRequest) => {
  if (tokenChunks) {
    // set request cookies for the incoming getServerSession to read new session
    tokenChunks.forEach((tokenChunk, index) => {
      req.cookies.set(`${sessionCookie}.${index}`, tokenChunk);
    });

    // updated request cookies can only be passed to server if its passdown here after setting its updates
    const response = NextResponse.next({
      request: {
        headers: req.headers,
      },
    });

    // set response cookies to send back to browser
    tokenChunks.forEach((tokenChunk, index) => {
      response.cookies.set(`${sessionCookie}.${index}`, tokenChunk, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60, // 1 day
        secure: !!isCookieSecure,
        sameSite: 'lax',
      });
    });

    return response;
  }

  return NextResponse.next();
};
