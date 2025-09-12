"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Search,
  Hand,
  Zap,
  Building2,
  Scissors,
  Waves,
  Home,
  ChevronLeft,
  ChevronRight,
  Target,
  X,
  CheckCircle,
} from "lucide-react";

const Services = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };
  const services = [
    {
      icon: Search,
      title: "Comprehensive Musculoskeletal Assessment and Diagnosis",
      description:
        "Thorough evaluation to identify the root cause of your pain and mobility issues with detailed musculoskeletal assessment.",
      image: "/images/fx5.jpg",
      modalContent: {
        title: "Your Journey to Recovery Starts Here",
        description:
          "At Easeway Medicare, I believe that understanding your condition is the first step towards healing. My comprehensive musculoskeletal assessment goes far beyond a simple examination—it's a detailed exploration of your body's unique story.",
        features: [
          "Complete postural analysis and movement screening",
          "Detailed medical history review and lifestyle assessment",
          "Advanced manual testing of joints, muscles, and ligaments",
          "Functional movement patterns evaluation",
          "Personalized treatment plan development",
          "Clear explanation of your condition and recovery timeline",
        ],
        process:
          "During your assessment, I'll spend quality time understanding not just your symptoms, but how they impact your daily life. Using evidence-based techniques and my years of experience, I'll identify the root cause of your discomfort and create a roadmap for your recovery. You'll leave with a clear understanding of your condition and confidence in your treatment plan.",
        duration: "Initial consultation: 60-90 minutes",
      },
    },
    {
      icon: Hand,
      title: "Manual Therapy",
      description:
        "Hands-on treatment techniques to improve joint mobility and reduce pain.",
      image: "/images/fx13.jpg",
      modalContent: {
        title: "The Healing Power of Expert Touch",
        description:
          "My manual therapy approach combines traditional techniques with modern understanding of anatomy and biomechanics. I use my hands as precise instruments to restore your body's natural movement and reduce pain.",
        features: [
          "Joint mobilization and manipulation techniques",
          "Soft tissue massage and myofascial release",
          "Trigger point therapy and muscle energy techniques",
          "Craniosacral therapy for nervous system balance",
          "Lymphatic drainage for reduced swelling",
          "Gentle stretching and range of motion restoration",
        ],
        process:
          "Each manual therapy session is tailored to your specific needs and comfort level. I'll explain each technique before applying it, ensuring you're comfortable throughout the treatment. My gentle yet effective approach helps restore proper joint function while promoting your body's natural healing processes.",
        duration: "Treatment sessions: 45-60 minutes",
      },
    },
    {
      icon: Zap,
      title: "Electrotherapy",
      description:
        "Advanced electrical stimulation techniques for pain relief and tissue healing.",
      image: "/images/fx10.jpg",
      modalContent: {
        title: "Advanced Technology for Accelerated Healing",
        description:
          "I utilize cutting-edge electrotherapy modalities to enhance your recovery process. These scientifically-proven techniques work at the cellular level to reduce pain, promote healing, and restore function more effectively than traditional methods alone.",
        features: [
          "TENS therapy for immediate pain relief",
          "Ultrasound therapy for deep tissue healing",
          "Laser therapy for cellular regeneration",
          "Electrical muscle stimulation for strength recovery",
          "Interferential therapy for chronic pain management",
          "Shockwave therapy for stubborn conditions",
        ],
        process:
          "I'll carefully select the most appropriate electrotherapy modalities based on your specific condition and healing stage. Each treatment is precisely calibrated to your needs, and I'll monitor your response to ensure optimal therapeutic benefit. These painless treatments complement our hands-on approach beautifully.",
        duration: "Electrotherapy sessions: 20-30 minutes as part of treatment",
      },
    },
    {
      icon: Building2,
      title: "Post-surgical Rehabilitation",
      description:
        "Specialized recovery programs to help you regain strength and function after surgery.",
      image: "/images/fx16.jpg",
      modalContent: {
        title: "Your Surgical Recovery Partner",
        description:
          "Recovery after surgery can feel overwhelming, but you don't have to navigate it alone. I specialize in post-surgical rehabilitation, helping you regain strength, mobility, and confidence as you return to the activities you love.",
        features: [
          "Immediate post-operative care and wound management",
          "Progressive mobility and strength training programs",
          "Scar tissue management and flexibility restoration",
          "Balance and proprioception retraining",
          "Return-to-activity and sport-specific conditioning",
          "Pain management throughout the recovery process",
        ],
        process:
          "I work closely with your surgical team to ensure seamless care transition. Starting with gentle mobilization and progressing through carefully planned phases, I'll guide you through each step of recovery. My experience with post-surgical patients means I understand the physical and emotional challenges you face, and I'm here to support you every step of the way.",
        duration: "Program duration: 6-12 weeks depending on surgery type",
      },
    },
    {
      icon: Scissors,
      title: "Kinesotaping",
      description:
        "Therapeutic taping techniques to support muscles and joints during healing.",
      image: "/images/fx7.jpg",
      modalContent: {
        title: "Support That Moves With You",
        description:
          "Kinesotaping is one of my favorite therapeutic tools because it provides continuous support while allowing natural movement. This colorful tape you may have seen on athletes does much more than provide support—it's a 24/7 therapeutic intervention that works while you live your life.",
        features: [
          "Muscle support and activation techniques",
          "Joint stabilization without movement restriction",
          "Lymphatic drainage enhancement for swelling reduction",
          "Postural correction and movement re-education",
          "Pain reduction through neurological pathways",
          "Sport-specific taping for performance and injury prevention",
        ],
        process:
          "I'm certified in advanced kinesotaping techniques and will apply the tape strategically based on your specific needs. Whether you need support for an injured muscle, help with postural alignment, or enhanced performance for sports, I'll create a custom taping strategy that works with your body's natural healing processes.",
        duration: "Tape application: 15-20 minutes, effective for 3-5 days",
      },
    },
    {
      icon: Waves,
      title: "Sports Massage",
      description:
        "Targeted massage therapy for athletes and active individuals.",
      image: "/images/fx17.jpg",
      modalContent: {
        title: "Performance-Focused Recovery",
        description:
          "As someone who understands the demands of an active lifestyle, I provide specialized sports massage that goes beyond relaxation. My approach focuses on enhancing performance, preventing injuries, and accelerating recovery for athletes and fitness enthusiasts of all levels.",
        features: [
          "Pre-event preparation and muscle activation",
          "Post-workout recovery and lactic acid removal",
          "Deep tissue work for chronic muscle tension",
          "Myofascial release for improved flexibility",
          "Injury prevention through regular maintenance",
          "Performance enhancement through improved circulation",
        ],
        process:
          "I tailor each sports massage session to your specific sport, training schedule, and individual needs. Whether you're preparing for competition, recovering from intense training, or maintaining peak condition, I'll adjust the pressure, techniques, and focus areas to optimize your results. My understanding of sports biomechanics ensures targeted treatment.",
        duration: "Sessions: 45-90 minutes depending on needs",
      },
    },
    {
      icon: Target,
      title: "Virtual Physiotherapy",
      description:
        "Professional physiotherapy consultations and guided exercises from the comfort of your home through secure video calls.",
      image: "/images/fx22.jpg",
      modalContent: {
        title: "Expert Care, Anywhere You Are",
        description:
          "Virtual physiotherapy brings professional assessment, treatment guidance, and rehabilitation directly to you, wherever you are. Using secure video technology, I provide the same quality care and personalized approach as in-person sessions, making expert physiotherapy accessible to everyone regardless of location or mobility constraints.",
        features: [
          "Comprehensive assessment through guided movement testing",
          "Real-time exercise demonstration and correction",
          "Personalized home exercise programs with visual guides",
          "Regular progress tracking and program adjustments",
          "Convenient scheduling without travel time",
          "Follow-up support via secure messaging",
        ],
        process:
          "Before your virtual session, I'll send preparation instructions to ensure we maximize our time together. During the consultation, I'll guide you through movements for assessment, demonstrate exercises tailored to your condition, and provide immediate feedback on your technique. You'll receive a detailed follow-up with your personalized exercise program and resources to support your recovery journey.",
        duration: "Virtual sessions: 30-60 minutes depending on needs",
      },
    },
    {
      icon: Home,
      title: "Home Physiotherapy (Exclusive in Whittlesey)",
      description:
        "The only provider of this service in Whittlesey - professional care in the comfort of your home.",
      highlight: true,
      image: "/images/fx20.jpg",
      modalContent: {
        title: "Bringing Professional Care to Your Doorstep",
        description:
          "I'm proud to be the only physiotherapy provider in Whittlesey offering comprehensive home visits. Sometimes the best healing happens in your own environment, and I bring the same level of professional care and expertise directly to your home.",
        features: [
          "Full physiotherapy assessment in your familiar environment",
          "All necessary equipment brought to your home",
          "Treatment of mobility issues without travel stress",
          "Family education and involvement in your care",
          "Home safety assessments and modifications",
          "Convenient scheduling around your daily routine",
        ],
        process:
          "My home physiotherapy service is perfect for those with mobility challenges, busy schedules, or who simply prefer the comfort of their own space. I bring professional-grade equipment and provide the same comprehensive care you'd receive in a clinic setting. This unique service in Whittlesey ensures you never have to compromise on quality care.",
        duration: "Home visits: 60-90 minutes including setup",
      },
    },
    {
      icon: Target,
      title: "Acupuncture",
      description:
        "Traditional acupuncture treatments using fine needles to stimulate specific points on the body for pain relief and healing.",
      image: "/images/fx21.jpg",
      modalContent: {
        title: "Ancient Wisdom Meets Modern Healthcare",
        description:
          "I combine traditional acupuncture principles with contemporary medical understanding to provide effective pain relief and healing. My approach integrates this time-tested therapy with modern physiotherapy for comprehensive treatment that addresses both symptoms and underlying causes.",
        features: [
          "Traditional Chinese Medicine diagnosis and treatment",
          "Dry needling for muscle trigger points",
          "Electroacupuncture for enhanced therapeutic effect",
          "Auricular (ear) acupuncture for stress and pain",
          "Cupping therapy for improved circulation",
          "Integration with physiotherapy for optimal results",
        ],
        process:
          "As a qualified acupuncturist with physiotherapy expertise, I provide a unique dual approach to healing. I'll assess your condition from both Western and Eastern medicine perspectives, creating a treatment plan that maximizes the benefits of both approaches. My gentle needling technique ensures comfort while delivering powerful therapeutic results.",
        duration: "Acupuncture sessions: 45-60 minutes including consultation",
      },
    },
  ];

  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_70%)]" />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 px-6">
          <div className="inline-flex items-center px-4 py-2 bg-[#FF3133]/5 border border-[#FF3133]/10 rounded-full">
            <Building2 className="w-4 h-4 mr-2 text-[#FF3133]" />
            <span className="text-[#FF3133] text-body-sm font-axiforma">
              Our Services
            </span>
          </div>

          <h2 className="text-h3-mobile sm:text-h2-small font-axiforma text-gray-900 mb-6 sm:mb-8 mt-4 tracking-tight max-w-xl mx-auto leading-tight">
            Professional Physiotherapy Services
          </h2>

          <p className="text-body text-gray-600 leading-relaxed mt-3 sm:mt-4 font-uber mx-auto max-w-md px-4">
            Comprehensive physiotherapy treatments designed to help you overcome
            pain, regain mobility, and return to your active lifestyle with
            confidence.
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="hidden sm:flex absolute left-6 right-6 top-1/3 -translate-y-1/2 justify-between items-center pointer-events-none z-20">
          <button
            onClick={scrollLeft}
            className="w-12 h-12 bg-[#FF3133]/40 backdrop-blur-md border border-[#FF3133]/30 rounded-2xl flex items-center justify-center hover:bg-[#FF3133]/60 transition-all duration-300 pointer-events-auto group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
          </button>
          <button
            onClick={scrollRight}
            className="w-12 h-12 bg-[#FF3133]/40 backdrop-blur-md border border-[#FF3133]/30 rounded-2xl flex items-center justify-center hover:bg-[#FF3133]/60 transition-all duration-300 pointer-events-auto group"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
          </button>
        </div>

        {/* Horizontal Scrollable Services */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:bg-white/50 hover:backdrop-blur-lg flex-shrink-0 w-72 sm:w-80 ring-1 ring-gray-300/50 cursor-pointer"
              onClick={() => setSelectedService(index)}
            >
              {service.highlight && (
                <div className="absolute top-6 right-6 z-10">
                  <span className="bg-gray-900/80 text-white text-body-xs font-axiforma px-4 py-2 rounded-full">
                    Exclusive
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                {/* Icon */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/40 backdrop-blur-md border border-white/30 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <p className="text-md font-uber font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                  {service.title}
                </p>
                <p className="text-body text-gray-600 leading-relaxed mt-3 sm:mt-4 font-uber">
                  {service.description}
                </p>
              </div>

              {/* Subtle hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedService !== null && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
            >
              <motion.div
                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Header Image */}
                <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl">
                  <img
                    src={services[selectedService].image}
                    alt={services[selectedService].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Icon and Title Overlay */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl flex items-center justify-center mb-4">
                      {(() => {
                        const IconComponent = services[selectedService].icon;
                        return <IconComponent className="w-8 h-8" />;
                      })()}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-axiforma font-bold mb-2">
                      {services[selectedService].modalContent.title}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  {/* Description */}
                  <p className="text-body text-gray-600 leading-relaxed mt-3 sm:mt-4 font-uber mb-8">
                    {services[selectedService].modalContent.description}
                  </p>

                  {/* Features Grid */}
                  <div className="mb-8">
                    <h3 className="text-xl font-axiforma font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#FF3133] mr-2" />
                      What's Included
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {services[selectedService].modalContent.features.map(
                        (feature, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-[#FF3133] rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-body text-gray-600 leading-relaxed font-uber">
                              {feature}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Process */}
                  <div className="mb-8">
                    <h3 className="text-xl font-axiforma font-semibold text-gray-900 mb-4">
                      My Approach
                    </h3>
                    <p className="text-body text-gray-600 leading-relaxed mt-3 sm:mt-4 font-uber">
                      {services[selectedService].modalContent.process}
                    </p>
                  </div>

                  {/* Duration */}
                  {/* <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-[#FF3133] mr-2" />
                      <h3 className="text-lg font-axiforma font-semibold text-gray-900">
                        Session Information
                      </h3>
                    </div>
                    <p className="text-gray-700 font-uber">
                      {services[selectedService].modalContent.duration}
                    </p>
                  </div> */}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* <motion.div
          className="text-center mt-12 sm:mt-16 px-4 sm:px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <MyFillButton text="Book Consultation" link="/booking" />
        </motion.div> */}
      </div>
    </section>
  );
};

export default Services;
