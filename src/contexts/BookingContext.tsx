"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface SessionType {
  id: "new" | "followup";
  name: string;
  duration: number;
  description: string;
  price?: string;
}

export interface BookingFormData {
  // Session details
  sessionType: SessionType | null;

  // Personal information
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;

  // Appointment details
  service: string;
  date: string;
  time: string;

  // Medical information
  message: string;
  medicalHistory: string;
  currentMedications: string;
  previousPhysiotherapy: string;

  // Additional preferences
  preferredTherapist?: string;
  specialRequirements?: string;
}

interface BookingContextType {
  bookingData: BookingFormData;
  updateBookingData: (data: Partial<BookingFormData>) => void;
  resetBookingData: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isComplete: boolean;
  setIsComplete: (complete: boolean) => void;
}

const initialBookingData: BookingFormData = {
  sessionType: null,
  name: "",
  email: "",
  phone: "",
  emergencyContact: "",
  service: "",
  date: "",
  time: "",
  message: "",
  medicalHistory: "",
  currentMedications: "",
  previousPhysiotherapy: "",
  preferredTherapist: "",
  specialRequirements: "",
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({
  children,
}) => {
  const [bookingData, setBookingData] =
    useState<BookingFormData>(initialBookingData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const updateBookingData = (data: Partial<BookingFormData>) => {
    setBookingData((prev) => {
      // If date is being changed, clear the selected time
      if (data.date !== undefined && data.date !== prev.date) {
        return {
          ...prev,
          ...data,
          time: "", // Clear time when date changes
        };
      }

      return {
        ...prev,
        ...data,
      };
    });
  };

  const resetBookingData = () => {
    setBookingData(initialBookingData);
    setCurrentStep(0);
    setIsComplete(false);
  };

  const value: BookingContextType = {
    bookingData,
    updateBookingData,
    resetBookingData,
    currentStep,
    setCurrentStep,
    isComplete,
    setIsComplete,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
