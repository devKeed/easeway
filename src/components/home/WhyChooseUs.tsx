import { motion } from "framer-motion";
import {
  User,
  Building2,
  UserCheck,
  Sprout,
  Handshake,
  ArrowUpRight,
} from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: User,
      title: "Personalized Treatment",
      description:
        "Tailored plans for faster recovery. We focus on what works best for you with treatment plans designed for your specific needs and goals.",
    },
    {
      icon: Building2,
      title: "Comprehensive Care",
      description:
        "Therapies for all recovery stages. A full range of therapies and support services to address all aspects of your recovery and well-being.",
    },
    {
      icon: UserCheck,
      title: "Experienced Professionals",
      description:
        "Skilled and qualified team. Led by experienced physiotherapists with extensive training in modern treatment techniques and patient care.",
    },
    {
      icon: Sprout,
      title: "Holistic Approach",
      description:
        "Focused on long-term wellness. Treating the whole person for lasting recovery, addressing not just symptoms but underlying causes.",
    },
  ];

  return (
    <section className="py-20 bg-[#0e2127] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Handshake className="w-8 h-8 text-[#FF3133]" /> Why Choose Us?
            </h2>
            <p className="text-sm text-gray-200 max-w-xl mx-auto">
              Your health and recovery are our priority. Here's what sets us
              apart.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 bg-[#FF3133]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <reason.icon className="w-8 h-8 text-[#FF3133]" />
              </div>
              <h3 className="text-sm font-bold text-[#0E2127] mb-4">
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
            <a
              href="https://qr-codes.io/wZKD7d"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF3133] hover:bg-[#e62a2c] flex items-center gap-3 pr-1 py-1 mx-auto"
            >
              Book your appointment
              <div className="bg-white rounded-full p-1.5 flex items-center justify-center">
                <ArrowUpRight className="h-4 w-4 text-[#FF3133]" />
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
