import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Access cookies from the request
  const accessToken = request.cookies.get('accessToken'); // Replace with the actual cookie name
  console.log("Access token: " + accessToken)

  // Check if the accessToken exists in cookies
  if (accessToken) {
    // If no accessToken is found, redirect to the login page
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
  
  // If accessToken exists, proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/sign-in'], // You can specify the routes where this middleware applies
};
