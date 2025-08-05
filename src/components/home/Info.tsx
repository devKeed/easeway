import RevealOnScroll from "../animations/Reveal";

const Info = () => {
  return (
    <div className="py-12 sm:py-14 md:py-16 lg:py-20 items-center flex flex-col gap-6 sm:gap-8 md:gap-10 justify-center text-center">
      <div className="mx-auto text-center text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-6 md:px-8 lg:px-0 max-w-4xl lg:w-1/2">
        <RevealOnScroll>
          <p className="leading-relaxed">
            At Easeway Medicare Physiotherapy Clinic, we believe that everyone
            deserves to live without pain and move freely. Our dedicated team
            provides personalized, evidence-based treatments that address the
            root cause of your condition.
          </p>
        </RevealOnScroll>
      </div>
      <RevealOnScroll>
        <button
          onClick={() =>
            document
              .getElementById("services")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="bg-[#0E2127] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base transition-all duration-300 hover:bg-[#1a2d35] hover:scale-105"
        >
          Learn More About Our Services
        </button>
      </RevealOnScroll>
    </div>
  );
};

export default Info;
