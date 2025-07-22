import AboutUs from "./components/home/AboutUs";
import Services from "./components/home/Services";
import WhyChooseUs from "./components/home/WhyChooseUs";
import BookAppointment from "./components/home/BookAppointment";
import HeroSection from "./components/home/HeroSection";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Info from "./components/home/Info";
import RevealOnScroll from "./components/animations/Reveal";
import Contact from "./components/home/Contact";
import Testimonials from "./components/home/Testimonials";
import SEO from "./components/SEO";
import ScrollToTop from "./components/ScrollToTop";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#EDF2F6] overflow-hidden">
      <SEO
        title="Easeway Medicare Physiotherapy Clinic - Professional Physiotherapy Services in Whittlesey"
        description="Overcome pain, regain mobility and live life to the fullest easily! Professional physiotherapy services including manual therapy, electrotherapy, sports massage and home physiotherapy care in Whittlesey, Peterborough."
        keywords="physiotherapy, physiotherapist, manual therapy, electrotherapy, sports massage, home physiotherapy, Whittlesey, Peterborough, pain relief, mobility, rehabilitation"
        url="https://easewaymedicare.co.uk"
        type="website"
      />
      <ScrollToTop />
      <CustomCursor />
      <Header />
      <main className="flex-1">
        <div className="flex flex-col">
          <HeroSection />
          <div className="max-w-[1280px] mx-auto">
            {" "}
            <Info />
            <RevealOnScroll>
              <AboutUs />
            </RevealOnScroll>
          </div>
          <div className="mt-4 md:mt-20">
            {" "}
            <RevealOnScroll>
              <Services />
            </RevealOnScroll>{" "}
            <WhyChooseUs />
          </div>
           <RevealOnScroll>
            <Testimonials />
          </RevealOnScroll>
          <div className="max-w-[1280px] mx-auto">
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

export default App;
