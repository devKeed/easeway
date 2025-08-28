import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Test email endpoint",
    status: "available",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // This is a test endpoint - you can implement email testing logic here
    console.log("Test email request:", body);

    return NextResponse.json({
      success: true,
      message: "Test email endpoint received request",
    });
  } catch (error) {
    console.error("Test email error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process test email request" },
      { status: 500 }
    );
  }
}
