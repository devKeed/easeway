"use client";

import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-3 sm:px-4 py-2 bg-[#FF3133]/5 border border-[#FF3133]/10 rounded-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-[#FF3133] text-body-xs sm:text-body-sm font-medium">
                🩺 About Us
              </span>
            </motion.div>

            <div>
              <motion.h2
                className="text-h3-mobile sm:text-h2-small font-axiforma text-[#0E2127] leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                About Easeway Medicare Physiotherapy Clinic
              </motion.h2>

              <p className="text-body text-gray-600 leading-relaxed mt-3 sm:mt-4 font-uber">
                At Easeway Medicare Physiotherapy Clinic, we believe that
                everyone deserves to live without pain and move freely. Our
                dedicated team is committed to providing personalized,
                evidence-based treatment that addresses the root cause of your
                condition.
              </p>
            </div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-2 sm:p-3 rounded-xl text-center border border-gray-100">
                <div className="text-body-lg sm:text-h3-mobile md:text-h2-desktop font-axiforma text-[#FF3133] mb-1 sm:mb-2">
                  500+
                </div>
                <div className="text-xs sm:text-body text-gray-600 font-uber font-medium">
                  Patients Treated
                </div>
              </div>
              <div className="bg-white p-2 sm:p-3 rounded-xl text-center border border-gray-100">
                <div className="text-body-lg sm:text-h3-mobile md:text-h2-desktop font-axiforma text-[#FF3133] mb-1 sm:mb-2">
                  10+
                </div>
                <div className="text-xs sm:text-body text-gray-600 font-uber font-medium">
                  Years Experience
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-2 sm:gap-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {[
                "Qualified Professionals",
                "Modern Equipment",
                "Personalized Care",
                "Proven Results",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center space-x-2 bg-[#0E2127]/10 px-3 sm:px-4 py-2 rounded-full border border-gray-100"
                >
                  <div className="w-1 h-1 bg-[#FF3133] rounded-full"></div>
                  <span className="text-xs sm:text-base font-medium text-[#0E2127]">
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Large image top-left */}
              <motion.div
                className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl row-span-2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/images/fx3.jpg"
                  alt="Professional physiotherapy treatment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E2127]/20 to-transparent" />
              </motion.div>

              {/* Small image top-right */}
              <motion.div
                className="relative rounded-xl sm:rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/images/fx1.jpg"
                  alt="Modern physiotherapy equipment"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E2127]/20 to-transparent" />
              </motion.div>

              {/* Small image bottom-right */}
              <motion.div className="relative rounded-2xl overflow-hidden">
                <motion.img
                  src="/images/fx8.jpg"
                  alt="Patient recovery success"
                  className="w-full h-32 object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                ></motion.img>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E2127]/20 to-transparent" />
              </motion.div>
            </div>

            {/* Floating element */}
            <motion.div className="absolute -top-4 -right-4 bg-[#FF3133] text-white p-4 rounded-2xl shadow-2xl">
              <div className="text-center">
                <div className="text-h3-mobile md:text-h2-desktop font-axiforma">
                  98%
                </div>
                <div className="text-body-xs font-axiforma">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
