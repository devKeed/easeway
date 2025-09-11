import { NextResponse } from "next/server";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// GET - Redirect to webmail
export async function GET() {
  try {
    // Redirect to your actual webmail server
    return NextResponse.redirect("https://server358.web-hosting.com:2096", {
      status: 302,
    });
  } catch (error) {
    console.error("Error redirecting to webmail:", error);
    return NextResponse.json(
      { error: "Unable to redirect to webmail" },
      { status: 500 }
    );
  }
}
