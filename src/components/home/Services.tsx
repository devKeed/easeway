import { motion } from "framer-motion";

const Services = () => {
  const services = [
    {
      icon: "🔍",
      title: "Comprehensive Assessment",
      description:
        "Thorough evaluation to identify the root cause of your pain and mobility issues.",
      image: "/images/image copy 2.png",
    },
    {
      icon: "✋",
      title: "Manual Therapy",
      description:
        "Hands-on treatment techniques to improve joint mobility and reduce pain.",
      image: "/images/image copy 3.png",
    },
    {
      icon: "⚡",
      title: "Electrotherapy",
      description:
        "Advanced electrical stimulation techniques for pain relief and tissue healing.",
      image: "/images/image copy 4.png",
    },
    {
      icon: "🏥",
      title: "Post-surgical Rehabilitation",
      description:
        "Specialized recovery programs to help you regain strength and function after surgery.",
      image: "/images/image copy 5.png",
    },
    {
      icon: "🩹",
      title: "Kinesotaping",
      description:
        "Therapeutic taping techniques to support muscles and joints during healing.",
      image: "/images/image copy 6.png",
    },
    {
      icon: "💆",
      title: "Sports Massage",
      description:
        "Targeted massage therapy for athletes and active individuals.",
      image: "/images/image copy 7.png",
    },
    {
      icon: "🏠",
      title: "Home Physiotherapy Care",
      description:
        "The only provider of this service in Whittlesey - professional care in the comfort of your home.",
      highlight: true,
      image: "/images/image copy 8.png",
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-[#FF3133]/5 border border-[#FF3133]/10 rounded-full mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-[#FF3133] text-sm font-medium">
              🏥 Our Services
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-[#0E2127] mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Professional Physiotherapy
            <span className="block text-[#FF3133]">Services</span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Comprehensive physiotherapy treatments designed to help you overcome
            pain, regain mobility, and return to your active lifestyle with
            confidence.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                service.highlight
                  ? "ring-2 ring-[#FF3133] ring-offset-4 transform scale-105"
                  : "hover:scale-105"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
            >
              {service.highlight && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-[#FF3133] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Exclusive to Whittlesey
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Icon */}
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0E2127] mb-3 group-hover:text-[#FF3133] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FF3133]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() =>
              document
                .getElementById("book-appointment")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[#FF3133] hover:bg-[#e62a2c] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Book Your Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
