"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
  Stethoscope,
  ArrowRight,
  ChevronLeft,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { BookingProvider, useBooking } from "../../src/contexts/BookingContext";
import ServiceTypeSelection from "../../src/components/booking/ServiceTypeSelection";
import SessionTypeSelection, {
  SessionType,
} from "../../src/components/booking/SessionTypeSelectionNew";
import StepIndicator from "../../src/components/booking/StepIndicator";
import TimeSlotSelector from "../../src/components/booking/TimeSlotSelector";
import LoadingSpinner from "../../src/components/ui/LoadingSpinner";
import ErrorState from "../../src/components/ui/ErrorState";
import ProgressStepper from "../../src/components/ui/ProgressStepper";
import { useToast } from "../../src/contexts/ToastContext";
import HomeVisitBookingForm from "../../src/components/booking/HomeVisitBookingForm";
import Footer from "@/components/shared/Footer";

// Main booking page component
const BookingPage = () => {
  const { bookingData, updateBookingData, currentStep, setCurrentStep } =
    useBooking();
  const { showSuccess, showError, showWarning } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [bookingResponse, setBookingResponse] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showHomeVisitForm, setShowHomeVisitForm] = useState(false);

  const services = [
    "Comprehensive Assessment",
    "Manual Therapy",
    "Electrotherapy",
    "Post-surgical Rehabilitation",
    "Kinesotaping",
    "Sports Massage",
    "Home Physiotherapy Care",
    "Sports Injury Rehabilitation",
    "Chronic Pain Management",
    "Mobility Training",
  ];

  const stepTitles = [
    "Service Selection",
    "Session Type",
    "Personal Info",
    "Appointment Details",
    "Medical Info",
    "Review & Confirm",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    updateBookingData({ [name]: value });

    // Clear form error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = () => {
    const errors: Record<string, string> = {};

    switch (currentStep) {
      case 0: // Service Selection
        if (!bookingData.serviceCategory) {
          errors.serviceCategory = "Please select a service type";
        }
        if (
          bookingData.serviceCategory &&
          bookingData.serviceCategory !== "home" &&
          !bookingData.service
        ) {
          errors.service = "Please select a specific service";
        }
        break;
      case 1: // Session Type
        if (!bookingData.sessionType) {
          errors.sessionType = "Please select a session type";
        }
        break;
      case 2: // Personal Info
        if (!bookingData.name.trim()) {
          errors.name = "Full name is required";
        }
        if (!bookingData.email.trim()) {
          errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(bookingData.email)) {
          errors.email = "Please enter a valid email address";
        }
        if (!bookingData.phone.trim()) {
          errors.phone = "Phone number is required";
        }
        break;
      case 3: // Appointment Details
        if (!bookingData.date) {
          errors.date = "Please select a date";
        }
        if (!bookingData.time) {
          errors.time = "Please select a time slot";
        }
        break;
      case 4: // Medical Info (optional apart from message already required in form)
        break;
      case 5: // Review - Final validation
        const allRequiredFields = {
          serviceCategory: "Service type",
          sessionType: "Session type",
          name: "Full name",
          email: "Email address",
          phone: "Phone number",
          date: "Date",
          time: "Time",
        } as const;
        Object.entries(allRequiredFields).forEach(([field, label]) => {
          // @ts-ignore
          if (!bookingData[field]) {
            errors[field] = `${label} is required`;
          }
        });
        // Check if service is required for non-home services
        if (
          bookingData.serviceCategory &&
          bookingData.serviceCategory !== "home" &&
          !bookingData.service
        ) {
          errors.service = "Service is required";
        }
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSessionSelect = (session: SessionType) => {
    console.log("Session selected:", session);
    updateBookingData({ sessionType: session });
  };

  const handleTimeSelect = (time: string) => {
    updateBookingData({ time });
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 0:
        return (
          !!bookingData.serviceCategory &&
          (bookingData.serviceCategory === "home" || !!bookingData.service)
        );
      case 1:
        return bookingData.sessionType !== null;
      case 2:
        return bookingData.name && bookingData.email && bookingData.phone;
      case 3:
        return bookingData.date && bookingData.time;
      case 4:
        return true; // medical info optional
      case 5:
        return true; // review step
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      showWarning(
        "Please fill in all required fields",
        "Check the highlighted fields and try again."
      );
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setFormErrors({}); // Clear errors when going back
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted! Current step:", currentStep);
    console.log("Booking data:", bookingData);

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Prepare booking data
      const bookingPayload = {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        serviceCategory: bookingData.serviceCategory,
        service:
          bookingData.service ||
          (bookingData.serviceCategory === "home"
            ? "Home Visit"
            : "General Consultation"),
        date: bookingData.date,
        time: bookingData.time,
        sessionType: bookingData.sessionType?.id || null,
        sessionDuration: bookingData.sessionType?.duration || null,
        message: bookingData.message,
        emergencyContact: bookingData.emergencyContact,
        medicalHistory: bookingData.medicalHistory,
        currentMedications: bookingData.currentMedications,
        previousPhysiotherapy: bookingData.previousPhysiotherapy,
      };

      const response = await fetch("/api/bookings/public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setBookingResponse(data);
        setErrorMessage("");

        showSuccess(
          "Booking confirmed successfully!",
          `Your appointment for ${bookingData.service} on ${bookingData.date} at ${bookingData.time} has been booked.`
        );

        // Reset form after successful submission
        setTimeout(() => {
          window.location.href = "/";
        }, 5000);
      } else {
        console.error("Booking submission failed:", data);
        setSubmitStatus("error");
        const errorMsg =
          data.error || "Failed to submit booking. Please try again.";
        setErrorMessage(errorMsg);

        // Show specific error message if time slot is no longer available
        if (response.status === 409) {
          showError(
            "Time slot no longer available",
            "This time slot has been taken by another patient. The page will refresh to show updated availability."
          );
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          showError("Booking failed", errorMsg);
        }
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      setSubmitStatus("error");
      const errorMsg =
        "Network error. Please check your connection and try again.";
      setErrorMessage(errorMsg);
      showError("Connection error", errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  // Handle service category selection with home visit check
  const handleServiceTypeSelect = (serviceKey: string) => {
    updateBookingData({ serviceCategory: serviceKey as any });

    if (serviceKey === "home") {
      setShowHomeVisitForm(true);
    } else {
      setShowHomeVisitForm(false);
    }
  };

  // Handle specific service selection
  const handleSpecificServiceSelect = (service: string) => {
    updateBookingData({ service });
  };

  const handleBackFromHomeVisit = () => {
    setShowHomeVisitForm(false);
    updateBookingData({ serviceCategory: "" });
  };

  // If home visit form should be shown, render it instead
  if (showHomeVisitForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <Link
                href="/"
                className="flex items-center gap-3 text-[#0E2127] hover:text-[#FF3133] transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span className="font-medium">Back to Home</span>
              </Link>

              <div className="sm:text-right">
                <h3 className="text-lg sm:text-xl font-axiforma text-[#0E2127] mb-1">
                  Book Home Visit
                </h3>
                <p className="text-gray-600 text-sm font-uber">
                  We'll arrange a convenient time for your home visit
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <HomeVisitBookingForm onBack={handleBackFromHomeVisit} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ServiceTypeSelection
            selectedService={bookingData.serviceCategory}
            selectedSpecificService={bookingData.service}
            onServiceTypeSelect={handleServiceTypeSelect}
            onSpecificServiceSelect={handleSpecificServiceSelect}
          />
        );
      case 1:
        return (
          <SessionTypeSelection
            selectedSession={bookingData.sessionType}
            onSessionSelect={handleSessionSelect}
            serviceCategory={bookingData.serviceCategory as any}
          />
        );
      case 2:
        // Personal Information (was case 1)
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FF3133]/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[#FF3133]" />
              </div>
              <h3 className="text-base font-axiforma text-[#0E2127]">
                Personal Information
              </h3>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-6">
                <div>
                  <label className="block text-[#0E2127] font-medium mb-3 text-sm">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={bookingData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm ${
                      formErrors.name
                        ? "border-red-300 focus:ring-red-500 bg-red-50"
                        : "border-gray-300 focus:ring-[#FF3133] hover:border-gray-400"
                    }`}
                    placeholder="Your full name"
                  />
                  {formErrors.name && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-uber">
                      <AlertCircle className="w-4 h-4" />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#0E2127] font-medium mb-3 text-sm">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm ${
                      formErrors.phone
                        ? "border-red-300 focus:ring-red-500 bg-red-50"
                        : "border-gray-300 focus:ring-[#FF3133] hover:border-gray-400"
                    }`}
                    placeholder="+44 7XXX XXXXXX"
                  />
                  {formErrors.phone && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-uber">
                      <AlertCircle className="w-4 h-4" />
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[#0E2127] font-medium mb-3 text-sm">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm ${
                    formErrors.email
                      ? "border-red-300 focus:ring-red-500 bg-red-50"
                      : "border-gray-300 focus:ring-[#FF3133] hover:border-gray-400"
                  }`}
                  placeholder="your.email@example.com"
                />
                {formErrors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1 font-uber">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FF3133]/10 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#FF3133]" />
              </div>
              <h3 className="text-base font-axiforma text-[#0E2127]">
                Appointment Details
              </h3>
            </div>

            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-[#0E2127] font-medium mb-3 text-sm">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleInputChange}
                    min={today}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent transition-all hover:border-gray-400 text-sm"
                  />
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <TimeSlotSelector
                  selectedDate={bookingData.date}
                  selectedTime={bookingData.time}
                  onTimeSelect={handleTimeSelect}
                  sessionDuration={bookingData.sessionType?.duration || 30}
                />
              </div>

              {bookingData.sessionType && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800 font-uber">
                    <span className="font-semibold">Selected:</span>{" "}
                    {bookingData.sessionType.name} (
                    {bookingData.sessionType.duration} minutes)
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-base font-axiforma text-[#0E2127]">
                Booking Confirmation
              </h3>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
              <div className="text-center mb-6">
                <h4 className="text-lg font-axiforma text-[#0E2127] mb-2">
                  Please review your booking details
                </h4>
                <p className="text-gray-600 text-sm font-uber">
                  Make sure all information is correct before submitting
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Session Details */}
                <div className="space-y-4">
                  <h5 className="font-semibold text-[#0E2127] text-sm uppercase tracking-wide border-b border-gray-200 pb-2">
                    Session Details
                  </h5>
                  {bookingData.sessionType && (
                    <div className="flex justify-between items-start py-2">
                      <span className="text-gray-600 text-sm">
                        Session Type:
                      </span>
                      <span className="font-medium text-sm text-right">
                        {bookingData.sessionType.name}
                      </span>
                    </div>
                  )}
                  {bookingData.sessionType && (
                    <div className="flex justify-between items-start py-2">
                      <span className="text-gray-600 text-sm">Duration:</span>
                      <span className="font-medium text-sm">
                        {bookingData.sessionType.duration} minutes
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-start py-2">
                    <span className="text-gray-600 text-sm">Service:</span>
                    <span className="font-medium text-sm text-right">
                      {bookingData.service ||
                        (bookingData.serviceCategory === "home"
                          ? "Home Visit"
                          : "Not specified")}
                    </span>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-gray-600 text-sm">Date:</span>
                    <span className="font-medium text-sm text-right">
                      {new Date(bookingData.date).toLocaleDateString("en-GB", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-gray-600 text-sm">Time:</span>
                    <span className="font-medium text-sm">
                      {bookingData.time}
                    </span>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="space-y-4">
                  <h5 className="font-semibold text-[#0E2127] text-sm uppercase tracking-wide border-b border-gray-200 pb-2">
                    Personal Details
                  </h5>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-gray-600 text-sm">Name:</span>
                    <span className="font-medium text-sm text-right">
                      {bookingData.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-gray-600 text-sm">Email:</span>
                    <span className="font-medium text-sm text-right break-all">
                      {bookingData.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-gray-600 text-sm">Phone:</span>
                    <span className="font-medium text-sm">
                      {bookingData.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              {bookingData.message && (
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h5 className="font-semibold text-[#0E2127] text-sm uppercase tracking-wide">
                    Medical Information
                  </h5>
                  <div>
                    <span className="text-gray-600 text-sm block mb-2">
                      Condition/Reason for visit:
                    </span>
                    <p className="text-sm bg-white p-3 rounded border text-gray-700 font-uber">
                      {bookingData.message}
                    </p>
                  </div>
                  {bookingData.medicalHistory && (
                    <div>
                      <span className="text-gray-600 text-sm block mb-2">
                        Medical History:
                      </span>
                      <p className="text-sm bg-white p-3 rounded border text-gray-700 font-uber">
                        {bookingData.medicalHistory}
                      </p>
                    </div>
                  )}
                  {bookingData.currentMedications && (
                    <div>
                      <span className="text-gray-600 text-sm block mb-2">
                        Current Medications:
                      </span>
                      <p className="text-sm bg-white p-3 rounded border text-gray-700 font-uber">
                        {bookingData.currentMedications}
                      </p>
                    </div>
                  )}
                  {bookingData.previousPhysiotherapy && (
                    <div>
                      <span className="text-gray-600 text-sm block mb-2">
                        Previous Physiotherapy:
                      </span>
                      <p className="text-sm bg-white p-3 rounded border text-gray-700 font-uber">
                        {bookingData.previousPhysiotherapy}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h6 className="font-semibold text-blue-800 mb-3 text-sm">
                    Important Notice
                  </h6>
                  <ul className="text-sm text-blue-700 space-y-2 list-disc list-inside">
                    <li>
                      We'll contact you within 24 hours to confirm your
                      appointment
                    </li>
                    <li>Please arrive 10 minutes early for your session</li>
                    <li>Bring comfortable clothing suitable for movement</li>
                    <li>
                      If you need to cancel, please call us at least 24 hours in
                      advance
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 text-[#0E2127] hover:text-[#FF3133] transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Home</span>
            </Link>

            <div className="sm:text-right">
              <h3 className="text-lg sm:text-xl font-axiforma text-[#0E2127] mb-1">
                Book Appointment
              </h3>
              <p className="text-gray-600 text-sm font-uber">
                Schedule your physiotherapy session
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {submitStatus === "success" && bookingResponse && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border-l-4 border-green-400 rounded-r-lg p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Booking Submitted Successfully!
                </h3>
                <p className="text-green-700 text-sm mb-4 font-uber">
                  {bookingResponse.message}
                </p>
                {bookingResponse.booking && (
                  <div className="bg-green-100 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-green-800 font-uber">
                      <span className="font-semibold">
                        Confirmation Number:
                      </span>{" "}
                      {bookingResponse.booking.confirmationNumber}
                    </p>
                    <p className="text-sm text-green-800 font-uber">
                      <span className="font-semibold">Date & Time:</span>{" "}
                      {bookingResponse.booking.date} at{" "}
                      {bookingResponse.booking.time}
                    </p>
                    {bookingResponse.booking.sessionType && (
                      <p className="text-sm text-green-800 font-uber">
                        <span className="font-semibold">Session:</span>{" "}
                        {bookingResponse.booking.sessionType} session (
                        {bookingResponse.booking.sessionDuration} minutes)
                      </p>
                    )}
                  </div>
                )}
                <p className="text-sm text-green-600 mt-3 font-uber">
                  Redirecting to home page in 5 seconds...
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-l-4 border-red-400 rounded-r-lg p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Booking Submission Failed
                </h3>
                <p className="text-red-700 text-sm font-uber">
                  {errorMessage ||
                    "Please try again or call us directly at +44 7460 091561"}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Progress Stepper - Clean and Separated */}
        <div className="mb-6 pb-6">
          <ProgressStepper steps={stepTitles} currentStep={currentStep} />
        </div>

        <div className="bg-white border  border-gray-200 rounded-xl overflow-hidden">
          {/* Form Container */}
          <div className="p-4 sm:p-6 lg:p-8">
            {submitStatus !== "success" ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step Content */}
                <div className="min-h-[300px]">{renderStepContent()}</div>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      currentStep === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!canProceedToNextStep()}
                      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-medium transition-all ${
                        canProceedToNextStep()
                          ? "bg-[#FF3133] text-white hover:bg-[#e62a2c] border border-[#FF3133]"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-300"
                      }`}
                    >
                      {currentStep === 4 ? "Review Booking" : "Next"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !canProceedToNextStep()}
                      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-medium transition-all ${
                        isSubmitting || !canProceedToNextStep()
                          ? "bg-gray-400 cursor-not-allowed border border-gray-400"
                          : "bg-[#FF3133] hover:bg-[#e62a2c] text-white border border-[#FF3133]"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        "Submit Booking"
                      )}
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-base font-axiforma text-[#0E2127] mb-2">
                  Booking Completed Successfully!
                </h3>
                <p className="text-gray-600 text-sm font-uber mb-6">
                  Your appointment has been submitted and we'll contact you
                  within 24 hours to confirm.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF3133] text-white rounded-lg hover:bg-[#e62a2c] transition-colors font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Return to Home
                </Link>
              </div>
            )}

            {/* Footer Notice - Only show when form is visible */}
            {submitStatus !== "success" && (
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-600 font-uber leading-relaxed">
                  * Required fields. We'll contact you within 24 hours to
                  confirm your appointment.
                  <br />
                  For urgent matters, please call us directly at{" "}
                  <a
                    href="tel:+447460091561"
                    className="text-[#FF3133] hover:underline font-medium"
                  >
                    +44 7460 091561
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper component to provide context
const BookingPageWrapper = () => {
  return (
    <BookingProvider>
      <BookingPage />
      <Footer />
    </BookingProvider>
  );
};

export default BookingPageWrapper;
