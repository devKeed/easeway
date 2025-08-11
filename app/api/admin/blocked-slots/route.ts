import { NextRequest, NextResponse } from"next/server";
import { getServerSession } from"next-auth";
import { authOptions } from"../../../../lib/auth";
import { prisma } from"../../../../lib/prisma";

export async function GET(request: NextRequest) {
 try {
 const session = await getServerSession(authOptions);

 if (!session) {
 return NextResponse.json(
 { error:"Authentication required" },
 { status: 401 }
 );
 }

 if (session.user.role !=="admin") {
 return NextResponse.json(
 { error:"Admin access required" },
 { status: 403 }
 );
 }

 // Get URL search parameters
 const url = new URL(request.url);
 const date = url.searchParams.get("date");

 // Build where clause
 const where: any = {};
 if (date) {
 where.date = date;
 }

 // Get blocked slots
 const blockedSlots = await prisma.blockedSlot.findMany({
 where,
 orderBy: [{ date:"asc" }, { time:"asc" }],
 });

 return NextResponse.json({
 blockedSlots,
 total: blockedSlots.length,
 });
 } catch (error) {
 console.error("Error fetching blocked slots:", error);
 return NextResponse.json(
 { error:"Internal server error" },
 { status: 500 }
 );
 }
}

export async function POST(request: NextRequest) {
 try {
 const session = await getServerSession(authOptions);

 if (!session) {
 return NextResponse.json(
 { error:"Authentication required" },
 { status: 401 }
 );
 }

 if (session.user.role !=="admin") {
 return NextResponse.json(
 { error:"Admin access required" },
 { status: 403 }
 );
 }

 const body = await request.json();
 const { date, time, reason } = body;

 if (!date || !time || !reason) {
 return NextResponse.json(
 { error:"Date, time, and reason are required" },
 { status: 400 }
 );
 }

 // Validate date format (YYYY-MM-DD)
 if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
 return NextResponse.json(
 { error:"Invalid date format. Use YYYY-MM-DD" },
 { status: 400 }
 );
 }

 // Validate time format (HH:MM)
 if (!/^\d{2}:\d{2}$/.test(time)) {
 return NextResponse.json(
 { error:"Invalid time format. Use HH:MM" },
 { status: 400 }
 );
 }

 // Check if slot is already blocked
 const existingBlock = await prisma.blockedSlot.findFirst({
 where: {
 date,
 time,
 },
 });

 if (existingBlock) {
 return NextResponse.json(
 { error:"Time slot is already blocked" },
 { status: 409 }
 );
 }

 // Check if slot has an existing booking
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
 { error:"Cannot block a time slot that has an existing booking" },
 { status: 409 }
 );
 }

 // Create blocked slot
 const blockedSlot = await prisma.blockedSlot.create({
 data: {
 date,
 time,
 reason: reason.trim(),
 createdBy: session.user.id,
 },
 });

 return NextResponse.json({
 success: true,
 message:"Time slot blocked successfully",
 blockedSlot: {
 id: blockedSlot.id,
 date: blockedSlot.date,
 time: blockedSlot.time,
 reason: blockedSlot.reason,
 createdAt: blockedSlot.createdAt,
 },
 });
 } catch (error) {
 console.error("Error blocking time slot:", error);
 return NextResponse.json(
 { error:"Internal server error" },
 { status: 500 }
 );
 }
}

export async function DELETE(request: NextRequest) {
 try {
 const session = await getServerSession(authOptions);

 if (!session) {
 return NextResponse.json(
 { error:"Authentication required" },
 { status: 401 }
 );
 }

 if (session.user.role !=="admin") {
 return NextResponse.json(
 { error:"Admin access required" },
 { status: 403 }
 );
 }

 const body = await request.json();
 const { date, time, id } = body;

 let where: any;

 if (id) {
 where = { id };
 } else if (date && time) {
 where = { date, time };
 } else {
 return NextResponse.json(
 { error:"Either ID or date+time must be provided" },
 { status: 400 }
 );
 }

 // Find and delete the blocked slot
 const deletedSlot = await prisma.blockedSlot.deleteMany({
 where,
 });

 if (deletedSlot.count === 0) {
 return NextResponse.json(
 { error:"Blocked slot not found" },
 { status: 404 }
 );
 }

 return NextResponse.json({
 success: true,
 message:"Time slot unblocked successfully",
 deletedCount: deletedSlot.count,
 });
 } catch (error) {
 console.error("Error unblocking time slot:", error);
 return NextResponse.json(
 { error:"Internal server error" },
 { status: 500 }
 );
 }
}
