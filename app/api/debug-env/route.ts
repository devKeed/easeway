import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Only show this in development or if authenticated
    const isDev = process.env.NODE_ENV === "development";

    if (!isDev) {
      return NextResponse.json(
        { error: "Environment check not available in production" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      environment: process.env.NODE_ENV,
      hasResendKey: !!process.env.RESEND_API_KEY,
      resendKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 10) + "...",
      emailService: process.env.EMAIL_SERVICE,
      adminEmail: process.env.ADMIN_EMAIL,
      nextAuthUrl: process.env.NEXTAUTH_URL,
      publicSiteUrl: process.env.NEXT_PUBLIC_SITE_URL,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
    });
  } catch (error) {
    console.error("Environment check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
