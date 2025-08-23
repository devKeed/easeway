"use client";

import { motion } from "framer-motion";
import { Building2, Home, Waves, Check, Stethoscope } from "lucide-react";

export interface ServiceTypeOption {
  key: string;
  label: string;
  description: string;
  icon: any; // lucide icon component
}

interface ServiceTypeSelectionProps {
  selectedService: string;
  selectedSpecificService: string;
  onServiceTypeSelect: (serviceKey: string) => void;
  onSpecificServiceSelect: (service: string) => void;
}

const serviceTypes: ServiceTypeOption[] = [
  {
    key: "clinic",
    label: "Clinic Booking",
    description: "In-clinic physiotherapy assessment & treatment",
    icon: Building2,
  },
  {
    key: "home",
    label: "Home Visit",
    description: "Physiotherapy delivered in the comfort of your home",
    icon: Home,
  },
  {
    key: "sports",
    label: "Sports Massage",
    description: "Performance & recovery focused soft tissue therapy",
    icon: Waves,
  },
];

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

const ServiceTypeSelection: React.FC<ServiceTypeSelectionProps> = ({
  selectedService,
  selectedSpecificService,
  onServiceTypeSelect,
  onSpecificServiceSelect,
}) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#FF3133]/10 rounded-full flex items-center justify-center">
          <Building2 className="w-5 h-5 text-[#FF3133]" />
        </div>
        <h3 className="text-xl sm:text-2xl font-axiforma text-[#0E2127]">
          Select Service Type & Service
        </h3>
      </div>

      {/* Service Type Selection */}
      <div>
        <h4 className="text-lg font-semibold text-[#0E2127] mb-3">
          1. Choose Service Type
        </h4>
        <p className="text-sm text-gray-600 mb-4 font-uber">
          Choose the type of service you are booking. This will determine
          pricing for new & follow-up sessions.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {serviceTypes.map((service) => {
            const isSelected = selectedService === service.key;
            const Icon = service.icon;
            return (
              <motion.button
                key={service.key}
                type="button"
                onClick={() => onServiceTypeSelect(service.key)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-5 rounded-lg border-2 transition-all duration-200 text-left flex flex-col h-full ${
                  isSelected
                    ? "border-[#FF3133] bg-[#FF3133]/5"
                    : "border-gray-200 bg-white hover:border-[#FF3133]/50"
                }`}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 bg-[#FF3133] rounded-full flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}

                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                    isSelected ? "bg-[#FF3133]" : "bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isSelected ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>

                <h4
                  className={`font-semibold mb-2 text-base ${
                    isSelected ? "text-[#FF3133]" : "text-[#0E2127]"
                  }`}
                >
                  {service.label}
                </h4>
                <p className="text-sm text-gray-600 font-uber leading-relaxed flex-grow">
                  {service.description}
                </p>

                {isSelected && (
                  <div className="mt-4 text-xs text-[#FF3133] font-axiforma">
                    Selected
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Specific Service Selection - Only show if service type is selected */}
      {selectedService && selectedService !== "home" && (
        <div>
          <h4 className="text-lg font-semibold text-[#0E2127] mb-3">
            2. Choose Specific Service
          </h4>
          <p className="text-sm text-gray-600 mb-4 font-uber">
            Select the specific service you need for your appointment.
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const isSelected = selectedSpecificService === service;
              return (
                <motion.button
                  key={index}
                  type="button"
                  onClick={() => onSpecificServiceSelect(service)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`relative p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? "border-[#FF3133] bg-[#FF3133]/5"
                      : "border-gray-200 bg-white hover:border-[#FF3133]/50"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-5 h-5 bg-[#FF3133] rounded-full flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  )}

                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? "bg-[#FF3133]" : "bg-gray-100"
                      }`}
                    >
                      <Stethoscope
                        className={`w-4 h-4 ${
                          isSelected ? "text-white" : "text-gray-600"
                        }`}
                      />
                    </div>
                    <span
                      className={`font-medium text-sm ${
                        isSelected ? "text-[#FF3133]" : "text-[#0E2127]"
                      }`}
                    >
                      {service}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTypeSelection;
