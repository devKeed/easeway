import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: "👤",
      title: "Personalized Treatment",
      description:
        "We focus on what works best for you with tailored treatment plans designed for your specific needs and goals.",
    },
    {
      icon: "🏥",
      title: "Comprehensive Care",
      description:
        "A full range of therapies and support services to address all aspects of your recovery and well-being.",
    },
    {
      icon: "👨‍⚕️",
      title: "Skilled Professionals",
      description:
        "Led by experienced physiotherapists with extensive training in modern treatment techniques and patient care.",
    },
    {
      icon: "🌱",
      title: "Holistic Approach",
      description:
        "Treating the whole person for lasting recovery, addressing not just symptoms but underlying causes.",
    },
  ];

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
              🤝 Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your health and recovery are our priority. Here's what sets us
              apart.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0E2127] mb-4">
                {reason.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>

              {/* Hover effect border */}
              <div className="w-0 h-1 bg-[#FF3133] mt-6 group-hover:w-full transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[#0E2127] mb-4">
              Ready to Start Your Recovery Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Experience the difference personalized physiotherapy care can make
              in your life.
            </p>
            <button
              onClick={() => {
                document
                  .getElementById("book-appointment")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#FF3133] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#e62a2c] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Your Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
