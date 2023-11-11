import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    cognito: {
      userId: string;
      expiresIn: number;
      expiresAt: number;
      accessToken: string;
      refreshToken: string;
      username: string;
    };
  }

  interface User {
    authenticatedResults: AuthenticationResultType;
    username: string;
    expiresAt: number;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    cognito: {
      userId: string;
      expiresIn: number;
      expiresAt: number;
      accessToken: string;
      refreshToken: string;
      username: string;
    };
  }
}
