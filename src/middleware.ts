import { getCookie, getCookies } from "cookies-next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/sign-in", "/sign-up",  "/verify/:path*" ,"/","/users","/courses" ,"/message","/users/profile", ],
};
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  
  
  

  const url = req.nextUrl.pathname;

  // Redirect to dashboard if the user is already authenticated

  const isPublicPath =
    url.startsWith("/sign-in") ||
    url.startsWith("/sign-up") ||
    url.startsWith("/verify");

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}
