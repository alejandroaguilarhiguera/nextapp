import { NextAuthOptions } from 'next-auth';
import { Role } from 'types';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */

  export interface Session {
    refreshTokenExpires?: number;
    accessTokenExpires?: string;
    refreshToken?: string;
    token?: string;
    error?: string;
    user?: User;
  }

  export interface User {
    id: number;
    jwt: string;
    name: string;
    lastname: string;
    username: string | null;
    image?: string | null;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
    role?: Role;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    token: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}
