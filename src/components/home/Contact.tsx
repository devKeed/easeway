import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    alert("Thank you for your message! We will get back to you soon.");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-20 bg-[#EDF2F6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0E2127] mb-4">
              📍 Contact Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get in touch with us today. We're here to help with all your
              physiotherapy needs.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg h-fit"
            >
              <h3 className="text-2xl font-bold text-[#0E2127] mb-6">
                Get In Touch
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-[#FF3133] text-2xl">📞</div>
                  <div>
                    <h4 className="font-semibold text-[#0E2127] mb-1">Phone</h4>
                    <a
                      href="tel:+447460091561"
                      className="text-[#FF3133] hover:underline"
                    >
                      +44 7460 091561
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-[#FF3133] text-2xl">📧</div>
                  <div>
                    <h4 className="font-semibold text-[#0E2127] mb-1">Email</h4>
                    <a
                      href="mailto:easeway.physiotherapy@easewaymedicare.co.uk"
                      className="text-[#FF3133] hover:underline break-all"
                    >
                      easeway.physiotherapy@easewaymedicare.co.uk
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-[#FF3133] text-2xl">🌐</div>
                  <div>
                    <h4 className="font-semibold text-[#0E2127] mb-1">
                      Website
                    </h4>
                    <a
                      href="https://www.easewaymedicare.co.uk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF3133] hover:underline"
                    >
                      www.easewaymedicare.co.uk
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-[#FF3133] text-2xl">📍</div>
                  <div>
                    <h4 className="font-semibold text-[#0E2127] mb-1">
                      Address
                    </h4>
                    <p className="text-gray-600">
                      Manor Leisure Centre
                      <br />
                      PE7 1UA, Whittlesey
                      <br />
                      Peterborough
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 pt-6 border-t border-gray-100">
                  <div className="text-[#FF3133] text-2xl">📱</div>
                  <div>
                    <h4 className="font-semibold text-[#0E2127] mb-1">
                      Scan Our QR Code
                    </h4>
                    <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500 text-sm">
                        <div className="text-2xl mb-2">📱</div>
                        <p>QR Code</p>
                        <p>Coming Soon</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      Scan to visit our website or contact us directly
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form and Map */}
          <div className="lg:col-span-2">
            <div className="grid gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <h3 className="text-2xl font-bold text-[#0E2127] mb-6">
                  Send Us a Message
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[#0E2127] font-semibold mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent"
                        placeholder="Your Name"
                      />
                    </div>

                    <div>
                      <label className="block text-[#0E2127] font-semibold mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent"
                        placeholder="Your phone"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[#0E2127] font-semibold mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent"
                        placeholder="Your Email"
                      />
                    </div>

                    <div>
                      <label className="block text-[#0E2127] font-semibold mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent"
                      >
                        <option value="">Select subject</option>
                        <option value="appointment">Book Appointment</option>
                        <option value="inquiry">General Inquiry</option>
                        <option value="home-visit">Home Visit Request</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-[#0E2127] font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3133] focus:border-transparent"
                      placeholder="Your Message"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FF3133] text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-[#e62a2c] transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>

              {/* Google Map Embed */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-80 bg-gray-200 flex items-center justify-center">
                  {/* Replace this with actual Google Maps embed */}
                  <div className="text-center text-gray-600">
                    <div className="text-4xl mb-4">🗺️</div>
                    <p className="font-semibold">Manor Leisure Centre</p>
                    <p>PE7 1UA, Whittlesey, Peterborough</p>
                    <p className="text-sm mt-2">
                      Google Maps will be embedded here
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
