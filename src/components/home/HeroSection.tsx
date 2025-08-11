import React from"react";
import { MyFillButton } from"../reusables/Button";

const HeroSection: React.FC = () => {
 return (
 <section className="min-h-full sm:min-h-[90vh] flex items-center bg-white py-3 sm:py-2">
 <div className="max-w-7xl mx-auto px-2 sm:px-6 w-full">
 <div className="relative sm:mx-4">
 {/* Background Image */}
 <div
 className="relative h-[85vh] md:h-[85vh] bg-cover bg-center bg-no-repeat rounded-xl sm:rounded-2xl overflow-hidden"
 style={{
 backgroundImage: `url(/images/fx4.jpg)`,
 }}
 >
 {/* Overlay for better text readability */}
 <div className="absolute inset-0 bg-black/50 rounded-xl sm:rounded-2xl"></div>

 {/* Text Content Overlay */}
 <div className="absolute inset-0 flex items-center">
 <div className="max-w-xl sm:max-w-2xl px-6 sm:px-8 md:px-16 lg:px-20">
 {/* Main Heading */}
 <h1 className="text-h1-mobile sm:text-h2-desktop md:text-h1-desktop lg:text-5xl xl:text-6xl font-axiforma text-white mb-4 sm:mb-6 leading-tight">
 Professional Physiotherapy
 </h1>

 {/* Subtitle */}
 <p className="text-body text-gray-400 mb-6 sm:mb-8 max-w-sm sm:max-w-sm text-body leading-relaxed font-uber text-body font-uber">
 Overcome pain, regain mobility, and live life to the fullest
 with Easeway Medicare Physiotherapy Clinic.
 </p>

 {/* Single CTA Button */}
 <div>
 {""}
 <MyFillButton
 text="Book Appointment"
 link="/booking"
 bgColor="#FF3133"
 hoverBgColor="#e62a2c"
 color="white"
 hoverTextColor="white"
 ariaLabel="Book Appointment"
 />
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
};

export default HeroSection;
