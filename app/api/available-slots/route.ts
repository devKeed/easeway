import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

interface BlockedPeriod {
  start: string;
  end: string;
  reason: string;
}

// Helper function to convert time string to minutes
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// Helper function to convert minutes to time string
function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
}

// Helper function to check if a time slot conflicts with blocked periods
function isTimeSlotBlocked(
  slotStart: number,
  slotEnd: number,
  blockedPeriods: BlockedPeriod[]
): boolean {
  for (const blocked of blockedPeriods) {
    const blockedStart = timeToMinutes(blocked.start);
    const blockedEnd = timeToMinutes(blocked.end);

    // Check if slot overlaps with blocked period
    if (slotStart < blockedEnd && slotEnd > blockedStart) {
      return true;
    }
  }
  return false;
}

// GET - Fetch available time slots for a specific date (public endpoint)
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

    // Validate date format
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    // Don't allow booking for past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return NextResponse.json({
        availableSlots: [],
        message: "Cannot book appointments for past dates",
      });
    }

    const dayOfWeek = selectedDate.getDay();

    // Get clinic settings
    const settings = await prisma.clinicSettings.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!settings) {
      return NextResponse.json({
        availableSlots: [],
        message:
          "Clinic settings not configured. Please contact the clinic directly.",
      });
    }

    // Check if clinic is active
    if (!settings.isActive) {
      return NextResponse.json({
        availableSlots: [],
        message:
          "Clinic is currently closed for online bookings. Please call +44 7460 091561.",
      });
    }

    // Check if the selected day is a working day
    const workingDays = Array.isArray(settings.workingDays)
      ? settings.workingDays
      : JSON.parse(settings.workingDays as string);

    if (!workingDays.includes(dayOfWeek)) {
      const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return NextResponse.json({
        availableSlots: [],
        message: `Clinic is closed on ${dayNames[dayOfWeek]}s`,
      });
    }

    // Calculate time slots
    const openingMinutes = timeToMinutes(settings.openingTime);
    const closingMinutes = timeToMinutes(settings.closingTime);
    const slotDuration = settings.timeSlotDuration;

    const availableSlots: string[] = [];
    const blockedPeriods = Array.isArray(settings.blockedPeriods)
      ? (settings.blockedPeriods as BlockedPeriod[])
      : JSON.parse((settings.blockedPeriods as string) || "[]");

    // Generate time slots
    for (
      let currentMinutes = openingMinutes;
      currentMinutes + slotDuration <= closingMinutes;
      currentMinutes += slotDuration
    ) {
      const slotStart = currentMinutes;
      const slotEnd = currentMinutes + slotDuration;

      // Check break period
      let isInBreakTime = false;
      if (settings.breakStart && settings.breakEnd) {
        const breakStart = timeToMinutes(settings.breakStart);
        const breakEnd = timeToMinutes(settings.breakEnd);

        if (slotStart < breakEnd && slotEnd > breakStart) {
          isInBreakTime = true;
        }
      }

      // Check blocked periods from settings
      const isBlocked = isTimeSlotBlocked(slotStart, slotEnd, blockedPeriods);

      // Check database-level blocked slots for this specific date and time
      const blockedSlot = await prisma.blockedSlot.findFirst({
        where: {
          date: date,
          time: minutesToTime(slotStart),
        },
      });

      // Check existing bookings for this date and time slot
      const existingBooking = await prisma.booking.findFirst({
        where: {
          date: date,
          time: minutesToTime(slotStart),
          status: {
            in: ["pending", "confirmed"],
          },
        },
      });

      // Add slot if it's available
      if (!isInBreakTime && !isBlocked && !blockedSlot && !existingBooking) {
        availableSlots.push(minutesToTime(slotStart));
      }
    }

    return NextResponse.json({
      availableSlots,
      clinicInfo: {
        openingTime: settings.openingTime,
        closingTime: settings.closingTime,
        isOpen: true,
      },
    });
  } catch (error) {
    console.error("Error fetching available time slots:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
