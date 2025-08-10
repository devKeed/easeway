"use client";

import { motion } from "framer-motion";
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
} from "lucide-react";
import Link from "next/link";
import { BookingProvider, useBooking } from "../../src/contexts/BookingContext";
import SessionTypeSelection, {
  SessionType,
} from "../../src/components/booking/SessionTypeSelection";
import StepIndicator from "../../src/components/booking/StepIndicator";

// Main booking page component
const BookingPage = () => {
  const { bookingData, updateBookingData, currentStep, setCurrentStep } =
    useBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

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

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    updateBookingData({
      [e.target.name]: e.target.value,
    });
  };

  const handleSessionSelect = (session: SessionType) => {
    updateBookingData({ sessionType: session });
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
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceedToNextStep() && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
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
            <h3 className="text-xl font-semibold text-[#0E2127] mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h3>

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
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent transition-all"
                  placeholder="Your full name"
                />
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
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent transition-all"
                  placeholder="+44 7XXX XXXXXX"
                />
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
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
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
            <h3 className="text-xl font-semibold text-[#0E2127] mb-4 flex items-center gap-2">
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

              <div>
                <label className="block text-[#0E2127] font-medium mb-2">
                  Preferred Time *
                </label>
                <select
                  name="time"
                  value={bookingData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent transition-all"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {bookingData.sessionType && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
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
            <h3 className="text-xl font-semibold text-[#0E2127] mb-4 flex items-center gap-2">
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

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDF2F6] to-white">
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
              <h1 className="text-2xl font-bold text-[#0E2127]">
                Book Appointment
              </h1>
              <p className="text-gray-600">
                Schedule your physiotherapy session
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">✓</span>
              </div>
              <div>
                <h3 className="text-green-800 font-semibold">
                  Booking Request Submitted!
                </h3>
                <p className="text-green-700">
                  We'll contact you within 24 hours to confirm your appointment.
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
                <span className="text-red-600 text-xl">✗</span>
              </div>
              <div>
                <h3 className="text-red-800 font-semibold">
                  Submission Failed
                </h3>
                <p className="text-red-700">
                  Please try again or call us directly at +44 7460 091561
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
          {/* Step Indicator */}
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

              {currentStep < 3 ? (
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
                  Next
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

          <p className="text-sm text-gray-600 text-center mt-6">
            * Required fields. We'll contact you within 24 hours to confirm your
            appointment.
            <br />
            For urgent matters, please call us directly at{" "}
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
