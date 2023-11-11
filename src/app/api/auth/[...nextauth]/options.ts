import { getServerSession, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authenticate } from '@/app/_server/service/auth';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) return null;

        const user = await authenticate({ username: credentials.username, password: credentials.password });

        if (user) return user;
        else return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, session }) {
      // when tokens are refreshed from client
      if (session && token.cognito)
        token.cognito = {
          ...token.cognito,
          expiresIn: session.cognito.expiresIn,
          expiresAt: session.cognito.expiresAt,
          accessToken: session.cognito.accessToken,
        };

      // inital sign in
      if (account && user) {
        token.cognito = {
          expiresIn: user.authenticatedResults.ExpiresIn ?? 300,
          expiresAt: user.expiresAt,
          accessToken: user.authenticatedResults.AccessToken ?? '',
          refreshToken: user.authenticatedResults.RefreshToken ?? '',
          userId: user.id,
          username: user.username,
        };
      }

      return token;
    },
    async session({ session, token }) {
      return { ...session, cognito: token.cognito };
    },
  },

  session: {
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
};

export const getServerSessionHelper = () => getServerSession(options);
