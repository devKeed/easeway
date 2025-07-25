import Logo from "/images/easeway_logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Phone, MapPin } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  const handleMenuClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className=" w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo Section */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="relative">
                <img
                  src={Logo}
                  alt="Easeway Medicare Physiotherapy Clinic"
                  className="w-8 md:w-10 rounded-xl"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-[#0E2127] font-bold text-xs md:text-base leading-tight">
                  Easeway Medicare
                </p>
                <p className="text-[#0E2127]/70 text-[12px] md:text-[14px]">
                  Physiotherapy Clinic
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center space-x-4">
            {/* Desktop Contact Info & CTA */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Contact Info */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-[#0E2127]">
                  <div className="w-8 h-8 bg-[#FF3133]/10 rounded-full flex items-center justify-center">
                    <Phone className="text-[#FF3133] w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#0E2127]/60 text-xs">Call us</span>
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
                    <MapPin className="text-[#FF3133] w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#0E2127]/60 text-xs">Location</span>
                    <span className="text-xs">Whittlesey, Peterborough</span>
                  </div>
                </div>
              </div>

              {/* Book Appointment Button */}
              <motion.a
                href="https://qr-codes.io/wZKD7d"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Appointment
              </motion.a>
            </div>

            {/* Hamburger Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-transparent  text-[#0E2127] transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className="block h-0.5 bg-[#0E2127] rounded"
                  animate={
                    isMobileMenuOpen
                      ? { rotate: 45, y: 8 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-0.5 bg-[#0E2127] rounded"
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-0.5 bg-[#0E2127] rounded"
                  animate={
                    isMobileMenuOpen
                      ? { rotate: -45, y: -8 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className=" bg-transparent border-t border-white/20"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4 bg-transparent backdrop-blur-md">
                {/* Mobile Navigation */}
                <nav className="space-y-3">
                  {menuItems.map((item) => (
                    <a
                      key={item.label}
                      onClick={() => handleMenuClick(item.href)}
                      className="block w-full cursor-pointer text-left text-[#0E2127] hover:text-[#FF3133] transition-colors text-base font-medium py-2"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* Mobile Contact Info */}
                <div className="pt-4 border-t border-[#0E2127]/10 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#FF3133]/10 rounded-full flex items-center justify-center">
                      <Phone className="text-[#FF3133] w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[#0E2127]/60 text-xs">Call us</p>
                      <a
                        href="tel:+447460091561"
                        className="text-[#FF3133] font-semibold text-xs hover:text-[#e62a2c] transition-colors"
                      >
                        +44 7460 091561
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#FF3133]/10 rounded-full flex items-center justify-center">
                      <MapPin className="text-[#FF3133] w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[#0E2127]/60 text-xs">Location</p>
                      <p className="text-xs">Whittlesey, Peterborough</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Book Appointment Button */}
                <div className="pt-4">
                  <motion.a
                    href="https://qr-codes.io/wZKD7d"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Appointment
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
