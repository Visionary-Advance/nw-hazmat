import { NextResponse } from 'next/server';

export function middleware(request) {
  // Add CORS headers for webhook endpoints
  if (request.nextUrl.pathname.startsWith('/api/webhooks/stripe')) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'POST');
    response.headers.set('Access-Control-Allow-Headers', 'stripe-signature');
    return response;
  }

  // Rate limiting for API endpoints (basic example)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Implement rate limiting logic here
    // You might use a service like Upstash Redis for this
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*']
};