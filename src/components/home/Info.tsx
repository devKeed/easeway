import RevealOnScroll from "../animations/Reveal";

const Info = () => {
  return (
    <div className="py-16 md:py-20 items-center flex flex-col gap-4 md:gap-10 justify-center text-center">
      <div className="mx-auto text-center text-xl px-3 md:px-0 md:w-1/2">
        <RevealOnScroll>
          <p>
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
          className="bg-[#0E2127] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Learn More About Our Services
        </button>
      </RevealOnScroll>
    </div>
  );
};

export default Info;
