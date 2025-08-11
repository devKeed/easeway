"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 sm:px-6 py-2 bg-white/40 backdrop-blur-md border border-white/20 rounded-full mb-6 sm:mb-8">
              <span className="text-gray-700 text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" /> Get in Touch
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 sm:mb-8 tracking-tight">
              Contact Us
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light px-4">
              Ready to start your journey to recovery? Get in touch with us
              today.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-6 sm:mb-8">
                Get In Touch
              </h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/40 backdrop-blur-md border border-white/30 rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <Phone className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                      Phone
                    </h4>
                    <a
                      href="tel:+447460091561"
                      className="text-gray-600 hover:text-gray-900 transition-colors font-light text-sm sm:text-base"
                    >
                      +44 7460 091561
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/40 backdrop-blur-md border border-white/30 rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <Mail className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                      Email
                    </h4>
                    <a
                      href="mailto:easeway.physiotherapy@easewaymedicare.co.uk"
                      className="text-gray-600 hover:text-gray-900 transition-colors font-light break-all text-xs sm:text-sm"
                    >
                      easeway.physiotherapy@easewaymedicare.co.uk
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/40 backdrop-blur-md border border-white/30 rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <MapPin className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                      Location
                    </h4>
                    <p className="text-gray-600 font-light leading-relaxed text-sm sm:text-base">
                      Manor Leisure Centre
                      <br />
                      PE7 1UA, Whittlesey
                      <br />
                      Peterborough
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* QR Code Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className=" text-center"
          >
            <h3 className="text-3xl font-medium text-gray-900 mb-8">
              Online Booking
            </h3>

            <div className="max-w-sm mx-auto">
              <button
                onClick={() => (window.location.href = "/booking")}
                className="flex items-center"
              >
                <div className="text-center text-gray-800 flex gap-2 px-4 items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                  <p className=" text-sm mb-2 text-white">Book Now</p>
                </div>
              </button>

              <p className="text-gray-600 font-light mb-6">
                Click above to book your appointment online or call us directly
                for immediate assistance.
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-4 p-4 bg-white/40 backdrop-blur-sm border border-white/30 rounded-2xl">
                  <Phone className="w-5 h-5 text-gray-700" />
                  <a
                    href="tel:+447460091561"
                    className="text-gray-900 hover:text-gray-600 font-medium transition-colors"
                  >
                    +44 7460 091561
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
