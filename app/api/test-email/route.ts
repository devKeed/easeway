import { NextRequest, NextResponse } from "next/server";
import {
  sendAdminBookingNotification,
  sendPatientConfirmationEmail,
} from "../../../lib/email";

export async function POST(request: NextRequest) {
  try {
    const testBookingData = {
      name: "Test Patient",
      email: "4tuneadebiyi@gmail.com", // Using the verified email for testing
      phone: "+44 7460 091561",
      service: "Test Booking",
      serviceCategory: "clinic",
      date: "2025-08-25",
      time: "10:00",
      sessionType: "new",
      sessionDuration: 30,
      message: "This is a test booking to verify email functionality",
      confirmationNumber: "TEST123",
    };

    console.log("Starting email test...");
    console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
    console.log("EMAIL_SERVICE:", process.env.EMAIL_SERVICE);
    console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);

    // Test admin email
    console.log("Sending admin notification...");
    const adminResult = await sendAdminBookingNotification(testBookingData);
    console.log("Admin email result:", adminResult);

    // Test patient email
    console.log("Sending patient confirmation...");
    const patientResult = await sendPatientConfirmationEmail(testBookingData);
    console.log("Patient email result:", patientResult);

    return NextResponse.json({
      success: true,
      adminResult,
      patientResult,
      environment: {
        hasResendKey: !!process.env.RESEND_API_KEY,
        emailService: process.env.EMAIL_SERVICE,
        adminEmail: process.env.ADMIN_EMAIL,
      },
    });
  } catch (error) {
    console.error("Email test failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
