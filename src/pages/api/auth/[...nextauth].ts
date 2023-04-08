import NextAuth, { CookiesOptions } from 'next-auth';
import { NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { EXTERNAL_API_AUTH_LOGIN, EXTERNAL_API_ME } from '~/config/externalAPIRoutes';

const cookies: Partial<CookiesOptions> = {
  sessionToken: {
    name: 'next-auth.session-token',
    options: {
      httpOnly: true,
      sameSite: 'none',
      path: '/',
      domain: process.env.NEXT_PUBLIC_DOMAIN,
      secure: true,
    },
  },
  callbackUrl: {
    name: 'next-auth.callback-url',
    options: {},
  },
  csrfToken: {
    name: 'next-auth.csrf-token',
    options: {},
  },
};

export const jwt = async ({ token, user }: { token: JWT; user?: User }) => {
  // first call of jwt function just user object is provided
  if (user?.email) {
    return { ...token, ...user };
  }

  // on subsequent calls, token is provided and we need to check if it's expired
  // if (token?.accessTokenExpires) {
  //   if (Date.now() / 1000 < token?.accessTokenExpires) return { ...token, ...user };
  // } else if (token?.refreshToken) return refreshAccessToken(token);
  return { ...token, ...user };
};

export const session = ({ session, token }: { session: Session; token: JWT }): Promise<Session> => {
  const now = Date.now();
  if (
    now / 1000 > (token?.accessTokenExpires ?? 0) &&
    token?.refreshTokenExpires &&
    now / 1000 > token?.refreshTokenExpires
  ) {
    return Promise.reject({
      error: new Error(
        'Refresh token has expired. Please log in again to get a new refresh token.',
      ),
    });
  }

  if (!token?.token) {
    return Promise.reject({
      error: new Error('We need the token.'),
    });
  }
  const [, secondHash] = token.token.split('.');
  const accessTokenData = JSON.parse(atob(secondHash));
  session.user = { ...accessTokenData, ...session.user };
  token.accessTokenExpires = accessTokenData.exp;
  session.token = token?.token;
  return Promise.resolve(session);
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const url = process.env.URL_API;
        const authRequest = await fetch(`${url}${EXTERNAL_API_AUTH_LOGIN.path}`, {
          method: EXTERNAL_API_AUTH_LOGIN.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: credentials?.identifier,
            password: credentials?.password,
          }),
        });
        if (!authRequest.ok) return null;
        const authSession: { jwt: string; user: User } = await authRequest.json();
        const sessionRequest = await fetch(`${url}${EXTERNAL_API_ME.path}`, {
          method: EXTERNAL_API_ME.method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authSession.jwt}`,
          },
        });
        if (!sessionRequest.ok) return null;
        const user: User = await sessionRequest.json();
        return { ...user, token: authSession.jwt }; // return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  cookies,
  callbacks: {
    session,
    jwt: jwt as any, //FIXME:
  },
};

export default NextAuth(authOptions);
