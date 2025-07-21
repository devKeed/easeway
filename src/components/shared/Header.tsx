import Logo from "/images/easeway_logo.png";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo Section */}
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={Logo}
                alt="Easeway Medicare Physiotherapy Clinic"
                className="h-12 w-12 rounded-xl"
              />
            </div>
            <div className="flex flex-col">
              <h5 className="text-[#0E2127] font-bold leading-tight">
                Easeway Medicare
              </h5>
              <p className="text-[#0E2127]/70 text-xs">
                Physiotherapy Clinic
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Contact Info - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-[#0E2127]">
              <div className="w-8 h-8 bg-[#FF3133]/10 rounded-full flex items-center justify-center">
                <span className="text-[#FF3133]">📞</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#0E2127]/60 text-xs">
                  Call us
                </span>
                <a
                  href="tel:+447460091561"
                  className="text-[#FF3133] font-semibold text-xs hover:text-[#e62a2c] transition-colors"
                >
                  +44 7460 091561
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-[#0E2127]">
              <div className="w-8 h-8 bg-[#FF3133]/10 rounded-full flex items-center justify-center">
                <span className="text-[#FF3133]">📍</span>
              </div>
              <div className="flex flex-col">
                <span className=" text-[#0E2127]/60 text-xs text-xs">
                  Location
                </span>
                <span className="text-xs text-xs">
                  Whittlesey, Peterborough
                </span>
              </div>
            </div>
          </div>

          {/* Book Appointment Button */}
          <motion.button
            onClick={() => {
              document
                .getElementById("book-appointment")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className=""
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Appointment
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
