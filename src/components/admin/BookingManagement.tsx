"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
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
  message: string;
  sessionType?: string;
  sessionDuration?: number;
  emergencyContact?: string;
  medicalHistory?: string;
  currentMedications?: string;
  previousPhysiotherapy?: string;
  confirmationNumber: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

interface BookingManagementProps {
  refreshInterval?: number;
}

const BookingManagement: React.FC<BookingManagementProps> = ({
  refreshInterval = 30000, // 30 seconds default
}) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [totalBookings, setTotalBookings] = useState(0);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
  };

  const statusIcons = {
    pending: <AlertCircle className="w-4 h-4" />,
    confirmed: <CheckCircle className="w-4 h-4" />,
    cancelled: <XCircle className="w-4 h-4" />,
    completed: <CheckCircle className="w-4 h-4" />,
  };

  const fetchBookings = async () => {
    try {
      setError("");
      const response = await fetch("/api/admin/bookings");

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data.bookings || []);
      setTotalBookings(data.totalBookings || 0);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update booking");
      }

      const data = await response.json();

      // Update the booking in the local state
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );

      // Close details modal if open
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking({ ...selectedBooking, status: newStatus });
      }
    } catch (err) {
      console.error("Error updating booking:", err);
      setError("Failed to update booking status.");
    }
  };

  useEffect(() => {
    fetchBookings();

    // Set up auto-refresh
    const interval = setInterval(fetchBookings, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  useEffect(() => {
    // Filter bookings based on selected status
    if (selectedStatus === "all") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(
        bookings.filter((booking) => booking.status === selectedStatus)
      );
    }
  }, [bookings, selectedStatus]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusCount = (status: string) => {
    return bookings.filter((booking) => booking.status === status).length;
  };

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-lg text-gray-900">
              {booking.name}
            </h3>
            <span
              className={`px-2 py-1 text-xs rounded-full border ${
                statusColors[booking.status as keyof typeof statusColors]
              }`}
            >
              <span className="flex items-center gap-1">
                {statusIcons[booking.status as keyof typeof statusIcons]}
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </span>
            </span>
          </div>
          <p className="text-sm text-gray-600">#{booking.confirmationNumber}</p>
        </div>
        <button
          onClick={() => {
            setSelectedBooking(booking);
            setShowDetails(true);
          }}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(booking.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{formatTime(booking.time)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="w-4 h-4" />
          <span>{booking.email}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{booking.phone}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-700 mb-1">Service:</p>
        <p className="text-sm text-gray-600">{booking.service}</p>
      </div>

      {booking.status === "pending" && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => updateBookingStatus(booking.id, "confirmed")}
            className="flex-1 px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={() => updateBookingStatus(booking.id, "cancelled")}
            className="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </motion.div>
  );

  const BookingDetailsModal = () => {
    if (!selectedBooking) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Booking Details
              </h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Patient Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Patient Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="text-gray-900">{selectedBooking.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="text-gray-900">{selectedBooking.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <p className="text-gray-900">{selectedBooking.phone}</p>
                  </div>
                  {selectedBooking.emergencyContact && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Emergency Contact
                      </label>
                      <p className="text-gray-900">
                        {selectedBooking.emergencyContact}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Appointment Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Appointment Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Service
                    </label>
                    <p className="text-gray-900">{selectedBooking.service}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <p className="text-gray-900">
                      {formatDate(selectedBooking.date)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Time
                    </label>
                    <p className="text-gray-900">
                      {formatTime(selectedBooking.time)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border ${
                        statusColors[
                          selectedBooking.status as keyof typeof statusColors
                        ]
                      }`}
                    >
                      {
                        statusIcons[
                          selectedBooking.status as keyof typeof statusIcons
                        ]
                      }
                      {selectedBooking.status.charAt(0).toUpperCase() +
                        selectedBooking.status.slice(1)}
                    </span>
                  </div>
                  {selectedBooking.sessionType && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Session Type
                      </label>
                      <p className="text-gray-900">
                        {selectedBooking.sessionType}
                      </p>
                    </div>
                  )}
                  {selectedBooking.sessionDuration && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Duration
                      </label>
                      <p className="text-gray-900">
                        {selectedBooking.sessionDuration} minutes
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Message
                </h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {selectedBooking.message}
                </p>
              </div>

              {/* Medical Information */}
              {(selectedBooking.medicalHistory ||
                selectedBooking.currentMedications ||
                selectedBooking.previousPhysiotherapy) && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Medical Information
                  </h3>
                  <div className="space-y-3">
                    {selectedBooking.medicalHistory && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Medical History
                        </label>
                        <p className="text-gray-700 bg-gray-50 p-2 rounded">
                          {selectedBooking.medicalHistory}
                        </p>
                      </div>
                    )}
                    {selectedBooking.currentMedications && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Current Medications
                        </label>
                        <p className="text-gray-700 bg-gray-50 p-2 rounded">
                          {selectedBooking.currentMedications}
                        </p>
                      </div>
                    )}
                    {selectedBooking.previousPhysiotherapy && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Previous Physiotherapy
                        </label>
                        <p className="text-gray-700 bg-gray-50 p-2 rounded">
                          {selectedBooking.previousPhysiotherapy}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Status Update Actions */}
              {selectedBooking.status === "pending" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Actions
                  </h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        updateBookingStatus(selectedBooking.id, "confirmed")
                      }
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Confirm Booking
                    </button>
                    <button
                      onClick={() =>
                        updateBookingStatus(selectedBooking.id, "cancelled")
                      }
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              )}
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
          text="Loading patient bookings..."
          className="h-64"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <ErrorState
          title="Failed to load bookings"
          message={error}
          onRetry={() => {
            setError("");
            fetchBookings();
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
          <h2 className="text-2xl font-bold text-gray-900">
            Booking Management
          </h2>
          <p className="text-gray-600">
            Manage and track appointment bookings ({totalBookings} total)
          </p>
        </div>
        <button
          onClick={fetchBookings}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF3133] text-white rounded-lg hover:bg-[#e62a2c] transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Status Filter and Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <button
          onClick={() => setSelectedStatus("all")}
          className={`p-4 rounded-lg border text-center transition-colors ${
            selectedStatus === "all"
              ? "border-[#FF3133] bg-[#FF3133] text-white"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <div className="text-2xl font-bold">{totalBookings}</div>
          <div className="text-sm">All Bookings</div>
        </button>

        <button
          onClick={() => setSelectedStatus("pending")}
          className={`p-4 rounded-lg border text-center transition-colors ${
            selectedStatus === "pending"
              ? "border-yellow-500 bg-yellow-500 text-white"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <div className="text-2xl font-bold text-yellow-600">
            {getStatusCount("pending")}
          </div>
          <div className="text-sm">Pending</div>
        </button>

        <button
          onClick={() => setSelectedStatus("confirmed")}
          className={`p-4 rounded-lg border text-center transition-colors ${
            selectedStatus === "confirmed"
              ? "border-green-500 bg-green-500 text-white"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <div className="text-2xl font-bold text-green-600">
            {getStatusCount("confirmed")}
          </div>
          <div className="text-sm">Confirmed</div>
        </button>

        <button
          onClick={() => setSelectedStatus("cancelled")}
          className={`p-4 rounded-lg border text-center transition-colors ${
            selectedStatus === "cancelled"
              ? "border-red-500 bg-red-500 text-white"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <div className="text-2xl font-bold text-red-600">
            {getStatusCount("cancelled")}
          </div>
          <div className="text-sm">Cancelled</div>
        </button>

        <button
          onClick={() => setSelectedStatus("completed")}
          className={`p-4 rounded-lg border text-center transition-colors ${
            selectedStatus === "completed"
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <div className="text-2xl font-bold text-blue-600">
            {getStatusCount("completed")}
          </div>
          <div className="text-sm">Completed</div>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
            <Calendar className="w-12 h-12 mb-4" />
            <h3 className="text-lg font-medium mb-2">No bookings found</h3>
            <p className="text-center">
              {selectedStatus === "all"
                ? "No bookings have been made yet."
                : `No ${selectedStatus} bookings found.`}
            </p>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {showDetails && <BookingDetailsModal />}
    </div>
  );
};

export default BookingManagement;
