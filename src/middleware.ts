import { Session } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { ROLES } from '~/config';

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = (await getToken({ req, secret: process.env.NEXTAUTH_SECRET })) as any;
  // FIXME: Type all data on session but is not session
  // unauthorized validation
  if (!session?.token) {
    const url = new URL('/401', req.url);
    return NextResponse.rewrite(url);
  }
  const role = ROLES.find(
    ({ type }) => type.toLocaleLowerCase() === String(session.role?.type).toLocaleLowerCase(),
  );
  if (!role || !role.routes.includes(pathname)) {
    // forbidden validation
    const url = new URL('/403', req.url);
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: ['/customers/:path*', '/dashboard'],
};
