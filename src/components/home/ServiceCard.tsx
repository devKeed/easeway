import { motion } from "framer-motion";
import { BsArrowDownLeftCircle } from "react-icons/bs";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  breakdown: string;
}

export const ServiceCard = ({
  title,
  description,
  image,
  features,
  breakdown,
}: ServiceCardProps) => {
  const handleContactClick = () => {
    // Scroll to the contact section or show a contact modal
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      className="bg-[#F2F2F2] rounded-2xl p-3 md:p-6  flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto relative overflow-hidden"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
    >
      <motion.img
        src={image}
        alt={title}
        className="w-full lg:w-1/3 h-full object-cover rounded-xl"
        whileHover={{
          y: 10,
          transition: { duration: 0.3 },
        }}
      />
      <motion.div
        className="flex-1 gap-8"
        whileHover={{
          x: 10,
          transition: { duration: 0.3 },
        }}
      >
        <h3 className="text-xl md:text-3xl font-medium uppercase text-gray-800 mt-0 lg:mt-10">
          {title}
        </h3>
        <p className="text-md mt-2">{description}</p>
        <div className="mt-3">
          <h5 className=" text-md sm:text-xl md:text-2xl  font-medium text-gray-800 mt-2 md:mt-7">
            WHAT WE MANAGE:
          </h5>
          <div className="flex flex-wrap gap-1 md:gap-2 mt-2">
            {features.map((feature, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 rounded-xl border border-black flex items-center justify-center py-1 md:py-2"
              >
                <p className="text-[11px] md:text-[14px] px-2 md:px-3">
                  {feature}
                </p>
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h5 className="text-md sm:text-xl md:text-2xl font-medium text-gray-800 mt-7">
            LET'S BREAK IT DOWN:
          </h5>
          <p className=" text-gray-700 mt-1">{breakdown}</p>
        </div>
      </motion.div>
      <motion.div
        className="absolute top-4 right-4 md:top-8 md:right-8 cursor-pointer"
        whileHover={{
          rotate: -180,
          transition: { duration: 0.5 },
        }}
        onClick={handleContactClick}
      >
        <BsArrowDownLeftCircle className="text-black size-10 md:size-16" />
      </motion.div>
    </motion.div>
  );
};
