// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { pathsProfile, getAccount } from './constants/headersconst';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('sessionid');

  if (!token && request.nextUrl.pathname === pathsProfile.profile) {
    return NextResponse.redirect(new URL(getAccount.login, request.url));
  }
}
