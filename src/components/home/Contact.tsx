import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-6 py-2 bg-white/40 backdrop-blur-md border border-white/20 rounded-full mb-8">
              <span className="text-gray-700 text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" /> Get in Touch
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-8 tracking-tight">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              Ready to start your journey to recovery? Get in touch with us
              today.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-medium text-gray-900 mb-8">
                Get In Touch
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl flex items-center justify-center">
                    <Phone className="text-gray-700 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Phone</h4>
                    <a
                      href="tel:+447460091561"
                      className="text-gray-600 hover:text-gray-900 transition-colors font-light"
                    >
                      +44 7460 091561
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl flex items-center justify-center">
                    <Mail className="text-gray-700 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Email</h4>
                    <a
                      href="mailto:easeway.physiotherapy@easewaymedicare.co.uk"
                      className="text-gray-600 hover:text-gray-900 transition-colors font-light break-all"
                    >
                      easeway.physiotherapy@easewaymedicare.co.uk
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl flex items-center justify-center">
                    <Globe className="text-gray-700 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Website</h4>
                    <a
                      href="https://www.easewaymedicare.co.uk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors font-light"
                    >
                      www.easewaymedicare.co.uk
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl flex items-center justify-center">
                    <MapPin className="text-gray-700 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Location</h4>
                    <p className="text-gray-600 font-light leading-relaxed">
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
            className="bg-white/50 backdrop-blur-md border-2 border-gray-300/50 rounded-3xl p-12 text-center"
          >
            <h3 className="text-3xl font-medium text-gray-900 mb-8">
              🔗 Quick Access QR Code
            </h3>

            <div className="max-w-sm mx-auto">
              <a
                href="https://qr-codes.io/wZKD7d"
                target="_blank"
                rel="noopener noreferrer"
                className="w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-6 hover:from-blue-200 hover:to-purple-200 transition-all duration-300 group shadow-xl"
              >
                <div className="text-center text-gray-800">
                  <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-all">
                    <Phone className="w-10 h-10 text-white" />
                  </div>
                  <p className="font-bold text-xl mb-2 text-blue-800">
                    CLICK HERE
                  </p>
                  <p className="text-md text-blue-700 font-medium">
                    View QR Code
                  </p>
                </div>
              </a>

              <p className="text-gray-600 font-light mb-6">
                Scan the QR code above to instantly call us or visit our website
                for more information about our services.
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

                <div className="flex items-center justify-center space-x-4 p-4 bg-white/40 backdrop-blur-sm border border-white/30 rounded-2xl">
                  <Globe className="w-5 h-5 text-gray-700" />
                  <a
                    href="https://www.easewaymedicare.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-gray-600 font-medium transition-colors"
                  >
                    Visit Website
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
