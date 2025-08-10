import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Check if user is trying to access admin routes
    if (req.nextUrl.pathname.startsWith("/admin")) {
      // Check if user has admin role
      if (req.nextauth.token?.role !== "admin") {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
    }

    // Check if user is trying to access protected booking routes
    if (
      req.nextUrl.pathname.startsWith("/booking") &&
      !req.nextUrl.pathname.includes("/api")
    ) {
      // Allow access to booking page for everyone, but could be restricted if needed
      // if (!req.nextauth.token) {
      //   return NextResponse.redirect(new URL("/auth/signin", req.url))
      // }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // For admin routes, require admin role
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "admin";
        }

        // For API routes that need protection
        if (req.nextUrl.pathname.startsWith("/api/admin")) {
          return token?.role === "admin";
        }

        if (req.nextUrl.pathname.startsWith("/api/user")) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/user/:path*",
    // Add other protected routes here
  ],
};
