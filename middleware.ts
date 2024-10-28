// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { setCookie } from 'cookies-next';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // If visiting the cart page, set a 'redirect_from' cookie
  if (url.pathname === '/students/cart') {
    const response = NextResponse.next();
    setCookie('redirect_from', '/students/cart', { path: '/' });
    return response;
  }

  return NextResponse.next();
}

// Apply the middleware to the specific paths
export const config = {
  matcher: ['/cart'],
};