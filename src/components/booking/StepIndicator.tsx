"use client";

import { motion } from "framer-motion";
import {
  Check,
  Clock,
  User,
  Calendar as CalendarIcon,
  Stethoscope,
} from "lucide-react";

interface BookingStep {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const steps: BookingStep[] = [
  {
    id: 0,
    title: "Session Type",
    icon: Clock,
    description: "Choose your session type and duration",
  },
  {
    id: 1,
    title: "Personal Details",
    icon: User,
    description: "Your contact information",
  },
  {
    id: 2,
    title: "Appointment",
    icon: CalendarIcon,
    description: "Select date, time, and service",
  },
  {
    id: 3,
    title: "Medical Info",
    icon: Stethoscope,
    description: "Health history and requirements",
  },
];

interface StepIndicatorProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isClickable = index <= currentStep && onStepClick;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              {/* Step Circle */}
              <motion.button
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                whileHover={isClickable ? { scale: 1.05 } : {}}
                whileTap={isClickable ? { scale: 0.95 } : {}}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-[#FF3133] text-white shadow-lg"
                    : isActive
                    ? "bg-[#FF3133] text-white shadow-lg ring-4 ring-[#FF3133]/20"
                    : "bg-gray-200 text-gray-500"
                } ${
                  isClickable
                    ? "cursor-pointer hover:shadow-md"
                    : "cursor-default"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}

                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#FF3133]"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: 1.3, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.button>

              {/* Step Info */}
              <div className="text-center">
                <h4
                  className={`text-xs font-medium mb-1 ${
                    isActive || isCompleted ? "text-[#0E2127]" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </h4>
                <p className="text-xs text-gray-500 max-w-20 leading-tight hidden sm:block">
                  {step.description}
                </p>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-5 left-1/2 w-full h-0.5 hidden sm:block">
                  <div
                    className={`h-full transition-colors duration-300 ${
                      index < currentStep ? "bg-[#FF3133]" : "bg-gray-200"
                    }`}
                    style={{
                      marginLeft: "1.25rem",
                      width: "calc(100% - 2.5rem)",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Step Info */}
      <div className="sm:hidden text-center">
        <h3 className="text-lg font-semibold text-[#0E2127] mb-1">
          {steps[currentStep]?.title}
        </h3>
        <p className="text-sm text-gray-600">
          {steps[currentStep]?.description}
        </p>
      </div>
    </div>
  );
};

export default StepIndicator;
