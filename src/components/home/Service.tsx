"use client";

import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { MyFillButton } from "../reusables/Button";

interface Service {
  title: string;
  description: string;
}

const services: Service[] = [
  {
    title: "MANUAL THERAPY",
    description:
      ">Hands-on treatment techniques including joint mobilization, soft tissue massage, and manipulation to restore mobility and reduce pain.",
  },
  {
    title: "ELECTROTHERAPY",
    description:
      ">Advanced electrical stimulation treatments including TENS, ultrasound, and laser therapy to promote healing and pain relief.",
  },
  {
    title: "SPORTS MASSAGE",
    description:
      ">Specialized massage techniques designed for athletes and active individuals to prevent injury and enhance performance.",
  },
  {
    title: "EXERCISE THERAPY",
    description:
      ">Personalized exercise programs and rehabilitation routines to strengthen muscles and improve functional movement.",
  },
  {
    title: "HOME PHYSIOTHERAPY",
    description:
      ">Convenient in-home physiotherapy services for patients who prefer treatment in the comfort of their own home.",
  },
  {
    title: "PAIN MANAGEMENT",
    description:
      ">Comprehensive pain management strategies combining various therapeutic approaches for chronic and acute pain conditions.",
  },
  {
    title: "ACUPUNCTURE",
    description:
      ">Traditional acupuncture treatments using fine needles to stimulate specific points on the body for pain relief and healing.",
  },
];

interface ServiceItemProps {
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  title,
  description,
  isOpen,
  onToggle,
}) => {
  return (
    <li className="border-b border-gray-300 pb-3">
      <div
        className="flex items-center gap-3 my-2 cursor-pointer"
        onClick={onToggle}
      >
        {isOpen ? (
          <IoIosArrowUp className="text-gray-400" />
        ) : (
          <IoIosArrowDown className="text-gray-400" />
        )}
        <span className="text-button-sm sm:text-button font-uber md:text-lg">
          {title}
        </span>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-2 pl-6 text-base sm:text-base"
          >
            <p>{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

const LandingPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full bg-white text-black">
      <div className="mx-auto px-4 py-8 sm:py-12 md:py-20 max-w-[1500px]">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10 md:mb-20">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-center md:text-left font-thin mb-4 sm:mb-6 md:mb-8 uppercase">
              THIS IS HOW WE HELP
            </h2>
            <ul className="space-y-3 sm:space-y-4 text-base md:text-lg text-left">
              {services.map((service, index) => (
                <ServiceItem
                  key={index}
                  title={service.title}
                  description={service.description}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </ul>
            <div className="flex justify-center md:justify-start mt-6 md:mt-4">
              <MyFillButton
                text="Learn More"
                bgColor="#F2F2F2"
                link="/contact"
                color="#000000"
                hoverBgColor="#222222"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <img
              src="/images/faq.png"
              alt="Background"
              className="w-full max-w-md md:max-w-none h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
