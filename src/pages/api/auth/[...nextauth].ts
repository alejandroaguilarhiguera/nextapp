import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { API_AUTH_LOGIN } from '~/config/routes';

import { Session } from '~/types';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { path, method } = API_AUTH_LOGIN;
        const url = process.env.URL_API;
        const request = await fetch(`${url}/auth/local`, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: credentials?.identifier,
            password: credentials?.password,
          }),
        });
        if (!request.ok) return null;
        const session: Session = await request.json();
        const user = {
          id: String(session.user.id),
          name: session.user.name,
          email: session.user.email,
        };
        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
};

export default NextAuth(authOptions);
