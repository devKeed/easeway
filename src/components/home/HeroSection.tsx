import React from "react";
import { motion } from "framer-motion";
import { Building2, Home, Zap, Target } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(/images/image.png)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E2127]/85 via-[#0E2127]/70 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-[#FF3133]/10 border border-[#FF3133]/20 rounded-full mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-[#FF3133] text-sm font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Professional Physiotherapy
                Care
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Overcome pain,{" "}
              <span className="text-[#FF3133]">regain mobility</span> and live
              life to the fullest...{" "}
              <span className="text-[#FF3133] font-light italic">easily!</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Professional physiotherapy services in Whittlesey, Peterborough.
              Personalized treatment plans for pain relief, injury recovery, and
              optimal mobility.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <button
                onClick={() =>
                  document
                    .getElementById("book-appointment")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-[#FF3133] hover:bg-[#e62a2c] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Book Appointment
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
              >
                Our Services
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Feature Cards */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-[#FF3133] rounded-xl flex items-center justify-center mb-4">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Home Visits</h3>
                <p className="text-gray-300 text-sm">
                  Exclusive to Whittlesey residents
                </p>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-[#FF3133] rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">
                  Modern Technology
                </h3>
                <p className="text-gray-300 text-sm">Advanced electrotherapy</p>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 col-span-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#FF3133] rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Personalized Care
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Tailored treatment plans for your specific needs
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
