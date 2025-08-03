"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    date: "",
    time: "",
    phone: "",
    email: "",
    message: "",
  });

  const services = [
    "Comprehensive Assessment",
    "Manual Therapy",
    "Electrotherapy",
    "Post-surgical Rehabilitation",
    "Kinesotaping",
    "Sports Massage",
    "Home Physiotherapy Care",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to the booking link
    window.open("https://qr-codes.io/wZKD7d", "_blank");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="book-appointment" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0E2127] mb-4">
              📅 Book Appointment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take the first step towards better health. Schedule your
              consultation today.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* QR Code Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-[#EDF2F6] p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-[#0E2127] mb-6">
                Quick Book with QR Code
              </h3>

              {/* QR Code Placeholder - Replace with actual QR code */}
              <div className="w-64 h-64 mx-auto bg-white rounded-lg shadow-inner flex items-center justify-center mb-6 border-2 border-gray-200">
                <div className="text-6xl">📱</div>
              </div>

              <p className="text-gray-600 mb-4">
                Scan this QR code with your phone to book instantly
              </p>

              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">
                  Or call us directly:
                </p>
                <a
                  href="tel:+447460091561"
                  className="text-2xl font-bold text-[#FF3133] hover:underline"
                >
                  +44 7460 091561
                </a>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#EDF2F6] p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-[#0E2127] mb-6">
                Online Booking Form
              </h3>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[#0E2127] font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-[#0E2127] font-semibold mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[#0E2127] font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[#0E2127] font-semibold mb-2">
                  Service *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[#0E2127] font-semibold mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[#0E2127] font-semibold mb-2">
                    Preferred Time *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[#0E2127] font-semibold mb-2">
                  Additional Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent"
                  placeholder="Tell us about your condition or any specific concerns..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF3133] text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-[#e62a2c] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Book Now
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;
