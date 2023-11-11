import dayjs from 'dayjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { refreshToken, signOut, generateNewSessionToken, setNextCookies } from './lib/middleware_util';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req });

  try {
    // check if access token is expired then refresh
    if (!!session && session.cognito.expiresAt - dayjs().unix() < 30) {
      const newToken = await refreshToken(session.cognito.refreshToken, session.cognito.username);

      if (!newToken) return signOut(req, session.cognito.accessToken);

      const tokenChunks = await generateNewSessionToken(session, newToken);
      const response = setNextCookies(tokenChunks, req);

      return response;
    }

    return NextResponse.next();
  } catch (err) {
    if (session?.cognito.accessToken) return signOut(req, session.cognito.accessToken);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/'],
};
