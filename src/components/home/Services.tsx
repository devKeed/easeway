"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import {
  Search,
  Hand,
  Zap,
  Building2,
  Scissors,
  Waves,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MyFillButton } from "../reusables/Button";

const Services = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };
  const services = [
    {
      icon: Search,
      title: "Comprehensive Musculoskeletal Assessment and Diagnosis",
      description:
        "Thorough evaluation to identify the root cause of your pain and mobility issues with detailed musculoskeletal assessment.",
      image: "/images/fx5.jpg",
    },
    {
      icon: Hand,
      title: "Manual Therapy",
      description:
        "Hands-on treatment techniques to improve joint mobility and reduce pain.",
      image: "/images/fx13.jpg",
    },
    {
      icon: Zap,
      title: "Electrotherapy",
      description:
        "Advanced electrical stimulation techniques for pain relief and tissue healing.",
      image: "/images/fx10.jpg",
    },
    {
      icon: Building2,
      title: "Post-surgical Rehabilitation",
      description:
        "Specialized recovery programs to help you regain strength and function after surgery.",
      image: "/images/fx16.jpg",
    },
    {
      icon: Scissors,
      title: "Kinesotaping",
      description:
        "Therapeutic taping techniques to support muscles and joints during healing.",
      image: "/images/fx7.jpg",
    },
    {
      icon: Waves,
      title: "Sports Massage",
      description:
        "Targeted massage therapy for athletes and active individuals.",
      image: "/images/fx17.jpg",
    },
    {
      icon: Home,
      title: "Home Physiotherapy (Exclusive in Whittlesey)",
      description:
        "The only provider of this service in Whittlesey - professional care in the comfort of your home.",
      highlight: true,
      image: "/images/fx20.jpg",
    },
  ];

  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_70%)]" />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 px-6">
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-[#FF3133]/5 border border-[#FF3133]/10 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Building2 className="w-4 h-4 mr-2 text-[#FF3133]" />
            <span className="text-[#FF3133] text-sm font-medium">
              Our Services
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-8 mt-4 tracking-tight max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Professional Physiotherapy Services
          </motion.h2>

          <motion.p
            className="text-sm text-gray-600 mx-auto leading-relaxed font-light max-w-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Comprehensive physiotherapy treatments designed to help you overcome
            pain, regain mobility, and return to your active lifestyle with
            confidence.
          </motion.p>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute left-6 right-6 top-1/3 -translate-y-1/2 flex justify-between items-center pointer-events-none z-20">
          <button
            onClick={scrollLeft}
            className="w-12 h-12 bg-[#FF3133]/40 backdrop-blur-md border border-[#FF3133]/30 rounded-2xl flex items-center justify-center hover:bg-[#FF3133]/60 transition-all duration-300 pointer-events-auto group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
          </button>
          <button
            onClick={scrollRight}
            className="w-12 h-12 bg-[#FF3133]/40 backdrop-blur-md border border-[#FF3133]/30 rounded-2xl flex items-center justify-center hover:bg-[#FF3133]/60 transition-all duration-300 pointer-events-auto group"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
          </button>
        </div>

        {/* Horizontal Scrollable Services */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-8 pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative bg-white/30 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden transition-all duration-500 hover:bg-white/50 hover:backdrop-blur-lg flex-shrink-0 w-80 ring-1 ring-gray-300/50"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
            >
              {service.highlight && (
                <div className="absolute top-6 right-6 z-10">
                  <span className="bg-gray-900/80 text-white text-xs font-medium px-4 py-2 rounded-full">
                    Exclusive
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                {/* Icon */}
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white/40 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-gray-800" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed font-light">
                  {service.description}
                </p>
              </div>

              {/* Subtle hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <MyFillButton
            text="Book Your Consultation"
            link="https://qr-codes.io/wZKD7d"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
