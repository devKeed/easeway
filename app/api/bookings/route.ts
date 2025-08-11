import { NextRequest, NextResponse } from"next/server";
import { getServerSession } from"next-auth";
import { authOptions } from"../../../lib/auth";
import { prisma } from"../../../lib/prisma";
import {
 sendAdminBookingNotification,
 sendPatientConfirmationEmail,
} from"../../../lib/email";

export async function POST(request: NextRequest) {
 try {
 const session = await getServerSession(authOptions);

 if (!session) {
 return NextResponse.json(
 { error:"Authentication required" },
 { status: 401 }
 );
 }

 const body = await request.json();
 const {
 name,
 email,
 phone,
 service,
 date,
 time,
 sessionType,
 sessionDuration,
 message,
 emergencyContact,
 medicalHistory,
 currentMedications,
 previousPhysiotherapy,
 } = body;

 // Validate required fields
 if (!name || !email || !phone || !service || !date || !time || !message) {
 return NextResponse.json(
 { error:"Missing required fields" },
 { status: 400 }
 );
 }

 // Validate session type if provided
 if (sessionType && !["new","followup"].includes(sessionType)) {
 return NextResponse.json(
 { error:"Invalid session type. Must be 'new' or 'followup'" },
 { status: 400 }
 );
 }

 // Check if the time slot is still available
 const existingBooking = await prisma.booking.findFirst({
 where: {
 date,
 time,
 status: {
 in: ["pending","confirmed"],
 },
 },
 });

 if (existingBooking) {
 return NextResponse.json(
 {
 error:
">This time slot is no longer available. Please select a different time.",
 },
 { status: 409 } // Conflict
 );
 }

 // Create booking in database
 const booking = await prisma.booking.create({
 data: {
 userId: session.user.id,
 name,
 email,
 phone,
 service,
 date,
 time,
 sessionType: sessionType || null,
 sessionDuration: sessionDuration || null,
 message,
 emergencyContact: emergencyContact || null,
 medicalHistory: medicalHistory || null,
 currentMedications: currentMedications || null,
 previousPhysiotherapy: previousPhysiotherapy || null,
 status:"pending",
 },
 });

 const confirmationNumber = booking.id.slice(-8).toUpperCase();

 // Prepare notification data
 const notificationData = {
 bookingId: booking.id,
 name,
 email,
 phone,
 service,
 date,
 time,
 sessionType,
 sessionDuration,
 message,
 emergencyContact,
 medicalHistory,
 currentMedications,
 previousPhysiotherapy,
 confirmationNumber,
 };

 // Send email notifications (don't block the response if email fails)
 try {
 // Send admin notification
 await sendAdminBookingNotification(notificationData);

 // Send patient confirmation
 await sendPatientConfirmationEmail(notificationData);
 } catch (emailError) {
 console.error("Email notification failed:", emailError);
 // Continue with the response even if email fails
 }

 return NextResponse.json({
 success: true,
 message:
">Booking created successfully! We'll contact you within 24 hours to confirm your appointment.",
 booking: {
 id: booking.id,
 status: booking.status,
 date: booking.date,
 time: booking.time,
 sessionType: booking.sessionType,
 sessionDuration: booking.sessionDuration,
 service: booking.service,
 confirmationNumber,
 },
 });
 } catch (error) {
 console.error("Error creating booking:", error);
 return NextResponse.json(
 { error:"Internal server error" },
 { status: 500 }
 );
 }
}

export async function GET(request: NextRequest) {
 try {
 const session = await getServerSession(authOptions);

 if (!session) {
 return NextResponse.json(
 { error:"Authentication required" },
 { status: 401 }
 );
 }

 // Get user's bookings
 const bookings = await prisma.booking.findMany({
 where: {
 userId: session.user.id,
 },
 orderBy: {
 createdAt:"desc",
 },
 });

 return NextResponse.json({ bookings });
 } catch (error) {
 console.error("Error fetching bookings:", error);
 return NextResponse.json(
 { error:"Internal server error" },
 { status: 500 }
 );
 }
}
