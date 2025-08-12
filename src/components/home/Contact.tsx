"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 sm:px-6 py-2 bg-white/40 backdrop-blur-md border border-white/20 rounded-full mb-6 sm:mb-8">
              <span className="text-gray-700 text-body-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" /> Get in Touch
              </span>
            </div>
            <h2 className="text-h3-mobile md:text-h2-small font-axiforma text-gray-900 mb-6 sm:mb-8 tracking-tight">
              Contact Us
            </h2>
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
              <h3 className="text-h4-mobile md:text-h3-small font-axiforma text-gray-900 mb-6 sm:mb-8">
                Get In Touch
              </h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/40 backdrop-blur-md border border-white/30 rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <Phone className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-h6-mobile md:text-h5-desktop font-axiforma text-gray-900 mb-1">
                      Phone
                    </h4>
                    <a
                      href="tel:+447460091561"
                      className="text-body-sm md:text-body text-gray-600 hover:text-gray-900 transition-colors font-light"
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
                    <h4 className="text-h6-mobile md:text-h5-desktop font-axiforma text-gray-900 mb-1">
                      Email
                    </h4>
                    <a
                      href="mailto:easeway.physiotherapy@easewaymedicare.co.uk"
                      className="text-body-xs md:text-body-sm text-gray-600 hover:text-gray-900 transition-colors font-light break-all"
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
                    <h4 className="text-h6-mobile md:text-h5-desktop font-axiforma text-gray-900 mb-1">
                      Location
                    </h4>
                    <p className="text-body text-gray-600 font-light leading-relaxed font-uber">
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
            className="text-center flex flex-col items-center space-y-6"
          >
            <h3 className="text-h4-mobile md:text-h3-small font-axiforma text-gray-900 mb-8">
              Online Booking
            </h3>

            <div className="max-w-sm mx-auto">
              <button
                onClick={() => (window.location.href = "/booking")}
                className="flex items-center justify-center w-full h-12"
              >
                <span className="text-body text-white font-uber px-4">
                  Book Now
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
