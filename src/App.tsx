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
import SEO from "./components/SEO";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#EDF2F6] ">
      <SEO
        title="Easeway Medicare Physiotherapy Clinic - Professional Physiotherapy Services in Whittlesey"
        description="Overcome pain, regain mobility and live life to the fullest easily! Professional physiotherapy services including manual therapy, electrotherapy, sports massage and home physiotherapy care in Whittlesey, Peterborough."
        keywords="physiotherapy, physiotherapist, manual therapy, electrotherapy, sports massage, home physiotherapy, Whittlesey, Peterborough, pain relief, mobility, rehabilitation"
        url="https://easewaymedicare.co.uk"
        type="website"
      />
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <div className="flex flex-col">
          <HeroSection />
          <Info />
          <RevealOnScroll>
            <AboutUs />
          </RevealOnScroll>
          <RevealOnScroll>
            <Services />
          </RevealOnScroll>
          <RevealOnScroll>
            <WhyChooseUs />
          </RevealOnScroll>
          <RevealOnScroll>
            <BookAppointment />
          </RevealOnScroll>
          <RevealOnScroll>
            <Contact />
          </RevealOnScroll>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
