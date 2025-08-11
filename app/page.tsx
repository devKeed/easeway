"use client";

import AboutUs from "../src/components/home/AboutUs";
import Services from "../src/components/home/Services";
import WhyChooseUs from "../src/components/home/WhyChooseUs";
import HeroSection from "../src/components/home/HeroSection";
import Header from "../src/components/shared/Header";
import Footer from "../src/components/shared/Footer";
import Info from "../src/components/home/Info";
import RevealOnScroll from "../src/components/animations/Reveal";
import Contact from "../src/components/home/Contact";
import Testimonials from "../src/components/home/Testimonials";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#EDF2F6] overflow-hidden">
      <Header />
      <main className="flex-1">
        <div className="flex flex-col">
          <HeroSection />
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <Info />
            <RevealOnScroll>
              <AboutUs />
            </RevealOnScroll>
          </div>
          <div className="mt-6 sm:mt-8 md:mt-12 lg:mt-20">
            <RevealOnScroll>
              <Services />
            </RevealOnScroll>
            <WhyChooseUs />
          </div>
          {/* <RevealOnScroll>
 <Testimonials />
 </RevealOnScroll> */}
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <Contact />
            </RevealOnScroll>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
