"use client";

import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  Users,
  Ban,
  Check,
  X,
  AlertCircle,
  Plus,
  Trash2,
  RefreshCw,
  Eye,
  Filter,
} from "lucide-react";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorState from "../ui/ErrorState";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: string;
  sessionType?: string;
  sessionDuration?: number;
  confirmationNumber: string;
}

interface BlockedSlot {
  id?: string;
  date: string;
  time: string;
  reason: string;
  createdAt?: string;
}

interface CalendarScheduleProps {
  refreshInterval?: number;
}

const CalendarSchedule: React.FC<CalendarScheduleProps> = ({
  refreshInterval = 30000,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "day">("week");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const [blockReason, setBlockReason] = useState("");
  const [showBlockModal, setShowBlockModal] = useState(false);

  // Generate time slots (9 AM to 5 PM, 30-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get days for current week
  const getWeekDays = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDays = getWeekDays(currentDate);

  const fetchBookings = async () => {
    try {
      setError("");
      const response = await fetch("/api/admin/bookings");

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings.");
    }
  };

  const fetchBlockedSlots = async () => {
    try {
      const response = await fetch("/api/admin/blocked-slots");

      if (response.ok) {
        const data = await response.json();
        setBlockedSlots(data.blockedSlots || []);
      }
    } catch (err) {
      console.error("Error fetching blocked slots:", err);
    }
  };

  const blockTimeSlot = async (date: string, time: string, reason: string) => {
    try {
      const response = await fetch("/api/admin/blocked-slots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          time,
          reason,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to block time slot");
      }

      await fetchBlockedSlots();
      setShowBlockModal(false);
      setBlockReason("");
      setSelectedSlot(null);
    } catch (err) {
      console.error("Error blocking time slot:", err);
      setError("Failed to block time slot.");
    }
  };

  const unblockTimeSlot = async (date: string, time: string) => {
    try {
      const response = await fetch("/api/admin/blocked-slots", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          time,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to unblock time slot");
      }

      await fetchBlockedSlots();
    } catch (err) {
      console.error("Error unblocking time slot:", err);
      setError("Failed to unblock time slot.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchBookings(), fetchBlockedSlots()]);
      setLoading(false);
    };

    loadData();

    // Set up auto-refresh
    const interval = setInterval(() => {
      fetchBookings();
      fetchBlockedSlots();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const isSlotBooked = (date: string, time: string) => {
    return bookings.some(
      (booking) => booking.date === date && booking.time === time
    );
  };

  const isSlotBlocked = (date: string, time: string) => {
    return blockedSlots.some(
      (slot) => slot.date === date && slot.time === time
    );
  };

  const getBookingForSlot = (date: string, time: string) => {
    return bookings.find(
      (booking) => booking.date === date && booking.time === time
    );
  };

  const getBlockedSlotInfo = (date: string, time: string) => {
    return blockedSlots.find(
      (slot) => slot.date === date && slot.time === time
    );
  };

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    setCurrentDate(newDate);
  };

  const navigateDay = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  const handleSlotClick = (date: string, time: string) => {
    const booking = getBookingForSlot(date, time);
    const blocked = isSlotBlocked(date, time);

    if (booking) {
      // Show booking details - could open a modal or navigate
      console.log("Show booking details:", booking);
      return;
    }

    if (blocked) {
      // Unblock the slot
      unblockTimeSlot(date, time);
    } else {
      // Block the slot
      setSelectedSlot({ date, time });
      setShowBlockModal(true);
    }
  };

  const getSlotColor = (date: string, time: string) => {
    const booking = getBookingForSlot(date, time);
    const blocked = isSlotBlocked(date, time);

    if (booking) {
      switch (booking.status) {
        case "confirmed":
          return "bg-green-100 border-green-300 text-green-800";
        case "pending":
          return "bg-yellow-100 border-yellow-300 text-yellow-800";
        case "cancelled":
          return "bg-red-100 border-red-300 text-red-800";
        default:
          return "bg-blue-100 border-blue-300 text-blue-800";
      }
    }

    if (blocked) {
      return "bg-gray-200 border-gray-400 text-gray-600";
    }

    return "bg-white border-gray-200 text-gray-700 hover:bg-gray-50";
  };

  const TimeSlot = ({ date, time }: { date: string; time: string }) => {
    const booking = getBookingForSlot(date, time);
    const blocked = getBlockedSlotInfo(date, time);
    const isToday = formatDate(new Date()) === date;
    const isPast = new Date(`${date}T${time}`) < new Date();

    return (
      <div
        onClick={() => !isPast && handleSlotClick(date, time)}
        className={`
 p-2 border rounded text-base cursor-pointer transition-all min-h-[60px] relative
 ${getSlotColor(date, time)}
 ${isPast ? "opacity-50 cursor-not-allowed" : ""}
 ${isToday ? "ring-2 ring-blue-300" : ""}
 `}
      >
        <div className="font-medium">{time}</div>
        {booking && (
          <div className="mt-1">
            <div className="font-semibold truncate">{booking.name}</div>
            <div className="text-base opacity-75">{booking.service}</div>
            <div className="text-base">#{booking.confirmationNumber}</div>
          </div>
        )}
        {blocked && (
          <div className="mt-1">
            <div className="flex items-center gap-1">
              <Ban className="w-3 h-3" />
              <span className="font-medium">Blocked</span>
            </div>
            <div className="text-base opacity-75">{blocked.reason}</div>
          </div>
        )}
        {!booking && !blocked && !isPast && (
          <div className="text-gray-400 text-base">Click to block</div>
        )}
      </div>
    );
  };

  const WeekView = () => (
    <div className="grid grid-cols-8 gap-2">
      {/* Time column header */}
      <div className="font-medium text-gray-700 p-2">Time</div>

      {/* Day headers */}
      {weekDays.map((day) => (
        <div key={day.toISOString()} className="text-center p-2">
          <div className="font-medium text-gray-900">
            {formatDateDisplay(day)}
          </div>
          <div className="text-base text-gray-500">{formatDate(day)}</div>
        </div>
      ))}

      {/* Time slots */}
      {timeSlots.map((time) => (
        <React.Fragment key={time}>
          {/* Time label */}
          <div className="p-2 text-body-sm font-axiforma text-gray-700 border-r">
            {time}
          </div>

          {/* Day slots */}
          {weekDays.map((day) => (
            <TimeSlot
              key={`${formatDate(day)}-${time}`}
              date={formatDate(day)}
              time={time}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );

  const DayView = () => (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-h5-mobile md:text-h4-desktop font-axiforma text-gray-900">
          {currentDate.toLocaleDateString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>
      </div>

      <div className="space-y-2">
        {timeSlots.map((time) => (
          <TimeSlot key={time} date={formatDate(currentDate)} time={time} />
        ))}
      </div>
    </div>
  );

  const BlockModal = () => {
    if (!showBlockModal || !selectedSlot) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-xl max-w-md w-full"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-h5-mobile md:text-h4-desktop font-axiforma text-gray-900">
                Block Time Slot
              </h3>
              <button
                onClick={() => setShowBlockModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-gray-600 text-body font-uber">
                Block {selectedSlot.time} on {selectedSlot.date}?
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-body-sm font-axiforma text-gray-700 mb-2">
                Reason for blocking
              </label>
              <textarea
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="e.g., Staff meeting, Equipment maintenance, Holiday"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowBlockModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  blockTimeSlot(
                    selectedSlot.date,
                    selectedSlot.time,
                    blockReason
                  )
                }
                disabled={!blockReason.trim()}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Block Slot
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <LoadingSpinner
          size="lg"
          text="Loading schedule and booking data..."
          className="h-64"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <ErrorState
          title="Failed to load schedule"
          message={error}
          onRetry={() => {
            setError("");
            setLoading(true);
            Promise.all([fetchBookings(), fetchBlockedSlots()]).finally(() => {
              setLoading(false);
            });
          }}
          showRetry={true}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-h3-mobile md:text-h2-desktop font-axiforma text-gray-900">
            Schedule Management
          </h2>
          <p className="text-gray-600 text-body font-uber">
            View bookings and manage time slot availability
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => setViewMode("week")}
              className={`px-4 py-2 text-body-sm font-axiforma transition-colors ${
                viewMode === "week"
                  ? "bg-[#FF3133] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode("day")}
              className={`px-4 py-2 text-body-sm font-axiforma transition-colors ${
                viewMode === "day"
                  ? "bg-[#FF3133] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Day
            </button>
          </div>
          <button
            onClick={() => {
              fetchBookings();
              fetchBlockedSlots();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF3133] text-white rounded-lg hover:bg-[#e62a2c] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <button
          onClick={() =>
            viewMode === "week" ? navigateWeek("prev") : navigateDay("prev")
          }
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous {viewMode === "week" ? "Week" : "Day"}
        </button>

        <div className="text-center">
          <h3 className="text-h5-mobile md:text-h4-desktop font-axiforma text-gray-900">
            {viewMode === "week"
              ? `Week of ${formatDateDisplay(weekDays[0])}`
              : formatDateDisplay(currentDate)}
          </h3>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="text-base text-[#FF3133] hover:underline"
          >
            Go to Today
          </button>
        </div>

        <button
          onClick={() =>
            viewMode === "week" ? navigateWeek("next") : navigateDay("next")
          }
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Next {viewMode === "week" ? "Week" : "Day"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span className="text-base text-gray-700">Confirmed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
          <span className="text-base text-gray-700">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 border border-gray-400 rounded"></div>
          <span className="text-base text-gray-700">Blocked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
          <span className="text-base text-gray-700">Available</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-body font-uber">{error}</p>
        </div>
      )}

      {/* Calendar View */}
      <div className="bg-white rounded-lg shadow-sm p-6 overflow-x-auto">
        {viewMode === "week" ? <WeekView /> : <DayView />}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <CalendarIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">How to use:</h4>
            <ul className="text-base text-blue-700 space-y-1">
              <li>• Click on an empty time slot to block it</li>
              <li>• Click on a blocked slot to unblock it</li>
              <li>• Booked slots show patient information</li>
              <li>• Blocked slots are grayed out for users</li>
              <li>• Past time slots cannot be modified</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Block Modal */}
      <BlockModal />
    </div>
  );
};

export default CalendarSchedule;
