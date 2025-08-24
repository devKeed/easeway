import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// GET - Fetch time slot details for debugging (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    // Get clinic settings
    const settings = await prisma.clinicSettings.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!settings) {
      return NextResponse.json(
        { error: "Clinic settings not configured" },
        { status: 404 }
      );
    }

    // Get existing bookings for the date
    const bookings = await prisma.booking.findMany({
      where: {
        date: date,
        status: {
          in: ["pending", "confirmed"],
        },
      },
      select: {
        time: true,
        status: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    // Parse the date to get day of week
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();

    const workingDays = Array.isArray(settings.workingDays)
      ? settings.workingDays
      : JSON.parse(settings.workingDays as string);

    const blockedPeriods = Array.isArray(settings.blockedPeriods)
      ? settings.blockedPeriods
      : JSON.parse((settings.blockedPeriods as string) || "[]");

    return NextResponse.json({
      date,
      dayOfWeek,
      isWorkingDay: workingDays.includes(dayOfWeek),
      settings: {
        openingTime: settings.openingTime,
        closingTime: settings.closingTime,
        breakStart: settings.breakStart,
        breakEnd: settings.breakEnd,
        timeSlotDuration: settings.timeSlotDuration,
        isActive: settings.isActive,
        workingDays,
        blockedPeriods,
      },
      bookings: bookings.map((booking) => ({
        time: booking.time,
        status: booking.status,
        clientName: booking.user.name,
      })),
      totalBookings: bookings.length,
    });
  } catch (error) {
    console.error("Error fetching time slot details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
