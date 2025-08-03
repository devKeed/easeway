"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Globe, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              className="flex items-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src="/images/logo.png"
                  alt="Easeway Medicare Physiotherapy Clinic"
                  className="h-10 w-10 rounded-lg mr-3"
                />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">
                  Easeway Medicare
                </h3>
                <p className="text-gray-400 text-[16px] font-light">
                  Physiotherapy Clinic
                </p>
              </div>
            </motion.div>

            <motion.p
              className="text-gray-400 leading-relaxed mb-8 max-w-sm font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Professional physiotherapy services helping you overcome pain,
              regain mobility, and return to your active lifestyle.
            </motion.p>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h4
              className="text-lg font-medium mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Quick Links
            </motion.h4>
            <motion.ul
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {["Home", "Services", "Contact", "Book Now"].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      if (link === "Home")
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      if (link === "Services")
                        document
                          .getElementById("services")
                          ?.scrollIntoView({ behavior: "smooth" });
                      if (link === "Contact")
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" });
                      if (link === "Book Now")
                        window.open("https://qr-codes.io/wZKD7d", "_blank");
                    }}
                    className="text-gray-400 hover:text-white transition-all duration-300 font-light text-[16px] block"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Contact Info */}
          <div>
            <motion.h4
              className="text-lg font-medium mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Contact
            </motion.h4>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-gray-800 rounded-lg flex items-center justify-center mt-0.5">
                  <Phone className="text-gray-400 w-3 h-3" />
                </div>
                <div>
                  <a
                    href="tel:+447460091561"
                    className="text-white hover:text-gray-300 font-medium transition-colors text-sm"
                  >
                    +44 7460 091561
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-gray-800 rounded-lg flex items-center justify-center mt-0.5">
                  <Mail className="text-gray-400 w-3 h-3" />
                </div>
                <div>
                  <a
                    href="mailto:easeway.physiotherapy@easewaymedicare.co.uk"
                    className="text-white hover:text-gray-300 transition-colors text-[16px] font-light"
                  >
                    easeway.physiotherapy@easewaymedicare.co.uk
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-gray-800 rounded-lg flex items-center justify-center mt-0.5">
                  <MapPin className="text-gray-400 w-3 h-3" />
                </div>
                <div>
                  <p className="text-white text-[16px] font-light leading-relaxed">
                    Manor Leisure Centre
                    <br />
                    PE7 1UA, Whittlesey
                    <br />
                    Peterborough
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-gray-800 rounded-lg flex items-center justify-center mt-0.5">
                  <Globe className="text-gray-400 w-3 h-3" />
                </div>
                <div>
                  <a
                    href="https://www.easewaymedicare.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300 transition-colors text-[16px] font-light"
                  >
                    www.easewaymedicare.co.uk
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-800/50 py-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-[16px] font-light">
            &copy; 2025 Easeway Medicare Physiotherapy Clinic. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
