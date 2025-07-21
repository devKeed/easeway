import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0E2127] to-[#1a3943] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src="/images/easeway_logo.png"
                  alt="Easeway Medicare Physiotherapy Clinic"
                  className="h-12 w-12 rounded-xl mr-4"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Easeway Medicare</h3>
                <p className="text-gray-300 font-medium">
                  Physiotherapy Clinic
                </p>
              </div>
            </motion.div>

            <motion.p
              className="text-gray-300 leading-relaxed mb-8 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Overcome pain, regain mobility and live life to the fullest...
              easily! Professional physiotherapy services in Whittlesey,
              Peterborough.
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="group">
                <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-[#FF3133] transition-all duration-300 cursor-pointer group-hover:scale-110">
                  <span className="text-xl">📧</span>
                </div>
              </div>
              <div className="group">
                <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-[#FF3133] transition-all duration-300 cursor-pointer group-hover:scale-110">
                  <span className="text-xl">📞</span>
                </div>
              </div>
              <div className="group">
                <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-[#FF3133] transition-all duration-300 cursor-pointer group-hover:scale-110">
                  <span className="text-xl">🌐</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h4
              className="text-lg font-bold mb-6 text-[#FF3133]"
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
              {["Home", "Services", "About", "Book Now", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <button
                      onClick={() => {
                        if (link === "Home")
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        if (link === "Services")
                          document
                            .getElementById("services")
                            ?.scrollIntoView({ behavior: "smooth" });
                        if (link === "Book Now")
                          document
                            .getElementById("book-appointment")
                            ?.scrollIntoView({ behavior: "smooth" });
                        if (link === "Contact")
                          document
                            .getElementById("contact")
                            ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-gray-300 hover:text-[#FF3133] transition-all duration-300 hover:translate-x-2 block"
                    >
                      → {link}
                    </button>
                  </li>
                )
              )}
            </motion.ul>
          </div>

          {/* Contact Info */}
          <div>
            <motion.h4
              className="text-lg font-bold mb-6 text-[#FF3133]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Contact Info
            </motion.h4>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#FF3133]/20 rounded-lg flex items-center justify-center mt-0.5">
                  <span className="text-[#FF3133] text-sm">📞</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <a
                    href="tel:+447460091561"
                    className="text-white hover:text-[#FF3133] font-semibold transition-colors"
                  >
                    +44 7460 091561
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#FF3133]/20 rounded-lg flex items-center justify-center mt-0.5">
                  <span className="text-[#FF3133] text-sm">📧</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a
                    href="mailto:easeway.physiotherapy@easewaymedicare.co.uk"
                    className="text-white hover:text-[#FF3133] transition-colors text-sm"
                  >
                    easeway.physiotherapy@easewaymedicare.co.uk
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#FF3133]/20 rounded-lg flex items-center justify-center mt-0.5">
                  <span className="text-[#FF3133] text-sm">📍</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Address</p>
                  <p className="text-white text-sm leading-relaxed">
                    Manor Leisure Centre
                    <br />
                    PE7 1UA, Whittlesey
                    <br />
                    Peterborough
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#FF3133]/20 rounded-lg flex items-center justify-center mt-0.5">
                  <span className="text-[#FF3133] text-sm">🌐</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Website</p>
                  <a
                    href="https://www.easewaymedicare.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#FF3133] transition-colors text-sm"
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
          className="border-t border-white/10 py-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">
            &copy; 2024 Easeway Medicare Physiotherapy Clinic. All rights
            reserved.
            <span className="mx-3 text-[#FF3133]">•</span>
            Professional physiotherapy services in Whittlesey, Peterborough.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
