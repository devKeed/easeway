"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ProgressStepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({
  steps,
  currentStep,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Stepper */}
      <div className="hidden md:block">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              const isUpcoming = index > currentStep;

              return (
                <li
                  key={step}
                  className={`relative ${
                    index !== steps.length - 1 ? "pr-8 sm:pr-20" : ""
                  } ${index !== 0 ? "pl-8 sm:pl-20" : ""}`}
                >
                  {/* Line */}
                  {index !== steps.length - 1 && (
                    <div
                      className="absolute top-4 right-0 w-8 sm:w-20 h-0.5 transition-colors duration-300"
                      style={{
                        backgroundColor: isCompleted ? "#065f46" : "#e5e7eb",
                      }}
                    />
                  )}

                  {/* Step Circle */}
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      initial={false}
                      animate={{
                        backgroundColor: isCompleted
                          ? "#065f46"
                          : isCurrent
                          ? "#065f46"
                          : "#e5e7eb",
                        scale: isCurrent ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        isCompleted || isCurrent
                          ? "border-[#065f46]"
                          : "border-gray-300"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <span
                          className={`text-sm font-medium ${
                            isCurrent ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {index + 1}
                        </span>
                      )}
                    </motion.div>

                    {/* Step Label */}
                    <div className="absolute top-10 w-32 text-center">
                      <span
                        className={`text-xs font-medium ${
                          isCompleted || isCurrent
                            ? "text-[#065f46]"
                            : "text-gray-500"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* Mobile Stepper */}
      <div className="md:hidden">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-[#065f46] h-2 rounded-full"
            />
          </div>

          {/* Current Step Label */}
          <div className="mt-2">
            <span className="text-sm font-medium text-[#065f46]">
              {steps[currentStep]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper;
