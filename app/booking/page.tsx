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
import SessionTypeSelection, {
  SessionType,
} from "../../src/components/booking/SessionTypeSelection";
import StepIndicator from "../../src/components/booking/StepIndicator";
import TimeSlotSelector from "../../src/components/booking/TimeSlotSelector";
import LoadingSpinner from "../../src/components/ui/LoadingSpinner";
import ErrorState from "../../src/components/ui/ErrorState";
import ProgressStepper from "../../src/components/ui/ProgressStepper";
import { useToast } from "../../src/contexts/ToastContext";

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
    "Session Type",
    "Personal Info",
    "Select Date",
    "Select Time",
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
      case 0: // Session Type
        if (!bookingData.sessionType) {
          errors.sessionType = "Please select a session type";
        }
        break;

      case 1: // Personal Info
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
        if (!bookingData.service) {
          errors.service = "Please select a service";
        }
        break;

      case 2: // Date
        if (!bookingData.date) {
          errors.date = "Please select a date";
        }
        break;

      case 3: // Time
        if (!bookingData.time) {
          errors.time = "Please select a time slot";
        }
        break;

      case 4: // Medical Info - Optional fields, no validation
        break;

      case 5: // Review - Final validation
        const allRequiredFields = {
          sessionType: "Session type",
          name: "Full name",
          email: "Email address",
          phone: "Phone number",
          service: "Service",
          date: "Date",
          time: "Time",
        };

        Object.entries(allRequiredFields).forEach(([field, label]) => {
          if (!bookingData[field as keyof typeof bookingData]) {
            errors[field] = `${label} is required`;
          }
        });
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSessionSelect = (session: SessionType) => {
    updateBookingData({ sessionType: session });
  };

  const handleTimeSelect = (time: string) => {
    updateBookingData({ time });
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 0:
        return bookingData.sessionType !== null;
      case 1:
        return bookingData.name && bookingData.email && bookingData.phone;
      case 2:
        return bookingData.service && bookingData.date && bookingData.time;
      case 3:
        return bookingData.message;
      case 4:
        return true; // Confirmation step - always allow submission
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
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Prepare booking data
      const bookingPayload = {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        service: bookingData.service,
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <SessionTypeSelection
            selectedSession={bookingData.sessionType}
            onSessionSelect={handleSessionSelect}
          />
        );

      case 1:
        return (
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-h5-mobile md:text-h4-small font-axiforma text-[#0E2127] mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h3>{" "}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#0E2127] font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={bookingData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    formErrors.name
                      ? "border-red-300 focus:ring-red-500 bg-red-50"
                      : "border-gray-300 focus:ring-[#FF3133]"
                  }`}
                  placeholder="Your full name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-body text-red-600 flex items-center gap-1 text-body font-uber">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[#0E2127] font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                  required
                  className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    formErrors.phone
                      ? "border-red-300 focus:ring-red-500 bg-red-50"
                      : "border-gray-300 focus:ring-[#FF3133]"
                  }`}
                  placeholder="+44 7XXX XXXXXX"
                />
                {formErrors.phone && (
                  <p className="mt-1 text-body text-red-600 flex items-center gap-1 text-body font-uber">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.phone}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-[#0E2127] font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    formErrors.email
                      ? "border-red-300 focus:ring-red-500 bg-red-50"
                      : "border-gray-300 focus:ring-[#FF3133]"
                  }`}
                  placeholder="your.email@example.com"
                />
                {formErrors.email && (
                  <p className="mt-1 text-body text-red-600 flex items-center gap-1 text-body font-uber">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-[#0E2127] font-medium mb-2">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={bookingData.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent transition-all"
                  placeholder="Emergency contact name and phone number"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-h4-mobile md:text-h3-desktop font-axiforma text-[#0E2127] mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Appointment Details
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[#0E2127] font-medium mb-2">
                  Service Required *
                </label>
                <select
                  name="service"
                  value={bookingData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent transition-all"
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#0E2127] font-medium mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleInputChange}
                  min={today}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="mt-6">
              <TimeSlotSelector
                selectedDate={bookingData.date}
                selectedTime={bookingData.time}
                onTimeSelect={handleTimeSelect}
                sessionDuration={bookingData.sessionType?.duration || 30}
              />
            </div>

            {bookingData.sessionType && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-body text-blue-800 text-body font-uber">
                  <strong>Selected:</strong> {bookingData.sessionType.name} (
                  {bookingData.sessionType.duration} minutes)
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-h4-mobile md:text-h3-desktop font-axiforma text-[#0E2127] mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              Medical Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[#0E2127] font-medium mb-2">
                  Current Medical Condition / Reason for Visit *
                </label>
                <textarea
                  name="message"
                  value={bookingData.message}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent transition-all"
                  placeholder="Please describe your current condition, symptoms, or reason for seeking physiotherapy..."
                />
              </div>

              <div>
                <label className="block text-[#0E2127] font-medium mb-2">
                  Medical History
                </label>
                <textarea
                  name="medicalHistory"
                  value={bookingData.medicalHistory}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent transition-all"
                  placeholder="Any relevant medical history, surgeries, chronic conditions..."
                />
              </div>

              <div>
                <label className="block text-[#0E2127] font-medium mb-2">
                  Current Medications
                </label>
                <textarea
                  name="currentMedications"
                  value={bookingData.currentMedications}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent transition-all"
                  placeholder="List any medications you are currently taking..."
                />
              </div>

              <div>
                <label className="block text-[#0E2127] font-medium mb-2">
                  Previous Physiotherapy Experience
                </label>
                <textarea
                  name="previousPhysiotherapy"
                  value={bookingData.previousPhysiotherapy}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent transition-all"
                  placeholder="Have you had physiotherapy before? What treatments worked or didn't work?"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-h4-mobile md:text-h3-desktop font-axiforma text-[#0E2127] mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Booking Confirmation
            </h3>

            <div className="bg-white rounded-lg p-6 space-y-6">
              <div className="text-center mb-6">
                <h4 className="text-h5-mobile md:text-h4-desktop font-axiforma text-[#0E2127] mb-2">
                  Please review your booking details
                </h4>
                <p className="text-gray-600 text-body font-uber">
                  Make sure all information is correct before submitting
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Session Details */}
                <div className="space-y-3">
                  <h5 className="font-semibold text-[#0E2127] border-b pb-1">
                    Session Details
                  </h5>
                  {bookingData.sessionType && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Session Type:</span>
                      <span className="font-medium">
                        {bookingData.sessionType.name}
                      </span>
                    </div>
                  )}
                  {bookingData.sessionType && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">
                        {bookingData.sessionType.duration} minutes
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{bookingData.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {new Date(bookingData.date).toLocaleDateString("en-GB", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{bookingData.time}</span>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="space-y-3">
                  <h5 className="font-semibold text-[#0E2127] border-b pb-1">
                    Personal Details
                  </h5>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{bookingData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{bookingData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{bookingData.phone}</span>
                  </div>
                  {bookingData.emergencyContact && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Emergency Contact:</span>
                      <span className="font-medium text-sm">
                        {bookingData.emergencyContact}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Medical Information */}
              {bookingData.message && (
                <div className="space-y-3">
                  <h5 className="font-semibold text-[#0E2127] border-b pb-1">
                    Medical Information
                  </h5>
                  <div>
                    <span className="text-gray-600 text-sm">
                      Condition/Reason for visit:
                    </span>
                    <p className="text-body mt-1 p-2 bg-gray-50 rounded text-body font-uber">
                      {bookingData.message}
                    </p>
                  </div>
                  {bookingData.medicalHistory && (
                    <div>
                      <span className="text-gray-600 text-sm">
                        Medical History:
                      </span>
                      <p className="text-body mt-1 p-2 bg-gray-50 rounded text-body font-uber">
                        {bookingData.medicalHistory}
                      </p>
                    </div>
                  )}
                  {bookingData.currentMedications && (
                    <div>
                      <span className="text-gray-600 text-sm">
                        Current Medications:
                      </span>
                      <p className="text-body mt-1 p-2 bg-gray-50 rounded text-body font-uber">
                        {bookingData.currentMedications}
                      </p>
                    </div>
                  )}
                  {bookingData.previousPhysiotherapy && (
                    <div>
                      <span className="text-gray-600 text-sm">
                        Previous Physiotherapy:
                      </span>
                      <p className="text-body mt-1 p-2 bg-gray-50 rounded text-body font-uber">
                        {bookingData.previousPhysiotherapy}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="border-t pt-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h6 className="font-semibold text-blue-800 mb-2">
                    Important Notice
                  </h6>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>
                      • We'll contact you within 24 hours to confirm your
                      appointment
                    </li>
                    <li>• Please arrive 10 minutes early for your session</li>
                    <li>• Bring comfortable clothing suitable for movement</li>
                    <li>
                      • If you need to cancel, please call us at least 24 hours
                      in advance
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
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 text-[#0E2127] hover:text-[#FF3133] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>

            <div className="text-right">
              <h1 className="text-h4-mobile md:text-h3-small font-axiforma text-[#0E2127]">
                Book Appointment
              </h1>
              <p className="text-gray-600 text-body font-uber">
                Schedule your physiotherapy session
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
        {submitStatus === "success" && bookingResponse && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-body-lg">✓</span>
              </div>
              <div className="flex-1">
                <h3 className="text-green-800 font-semibold">
                  Booking Submitted Successfully!
                </h3>
                <p className="text-green-700 text-body font-uber">
                  {bookingResponse.message}
                </p>
                {bookingResponse.booking && (
                  <div className="mt-3 p-3 bg-green-100 rounded-lg">
                    <p className="text-body text-green-800 text-body font-uber">
                      <strong>Confirmation Number:</strong>
                      {""}
                      {bookingResponse.booking.confirmationNumber}
                    </p>
                    <p className="text-body text-green-800 text-body font-uber">
                      <strong>Date & Time:</strong>
                      {""}
                      {bookingResponse.booking.date} at{""}
                      {bookingResponse.booking.time}
                    </p>
                    {bookingResponse.booking.sessionType && (
                      <p className="text-body text-green-800 text-body font-uber">
                        <strong>Session:</strong>
                        {""}
                        {bookingResponse.booking.sessionType} session (
                        {bookingResponse.booking.sessionDuration} minutes)
                      </p>
                    )}
                  </div>
                )}
                <p className="text-body text-green-600 mt-2 text-body font-uber">
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
            className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-body-lg">✗</span>
              </div>
              <div className="flex-1">
                <h3 className="text-red-800 font-semibold">
                  Booking Submission Failed
                </h3>
                <p className="text-red-700 text-body font-uber">
                  {errorMessage ||
                    "Please try again or call us directly at +44 7460 091561"}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {/* Progress Stepper */}
          <div className="mb-8">
            <ProgressStepper steps={stepTitles} currentStep={currentStep} />
          </div>

          {/* Step Indicator (For backward compatibility) */}
          <StepIndicator
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step Content */}
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  currentStep === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceedToNextStep()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    canProceedToNextStep()
                      ? "bg-[#FF3133] text-white hover:bg-[#e62a2c]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {currentStep === 3 ? "Review Booking" : "Next"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !canProceedToNextStep()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    isSubmitting || !canProceedToNextStep()
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#FF3133] hover:bg-[#e62a2c] text-white"
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

          <p className="text-body text-gray-600 text-center mt-6 text-body font-uber">
            * Required fields. We'll contact you within 24 hours to confirm your
            appointment.
            <br />
            For urgent matters, please call us directly at{""}
            <a
              href="tel:+447460091561"
              className="text-[#FF3133] hover:underline font-medium"
            >
              +44 7460 091561
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Wrapper component to provide context
const BookingPageWrapper = () => {
  return (
    <BookingProvider>
      <BookingPage />
    </BookingProvider>
  );
};

export default BookingPageWrapper;
