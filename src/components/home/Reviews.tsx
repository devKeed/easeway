import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/autoplay";
import clsx from "clsx";
import { colorClassMap, reviews } from "../../data/data";

const ReviewSlider = () => {
  return (
    <div className="max-w-7xl mx-auto mb-10 px-4 w-full mt-4 md:mt-20">
      <h3 className="text-center font-semibold mb-8">
        TRUSTED BY DIFFERENT PEOPLE
      </h3>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1.1}
        breakpoints={{
          768: { slidesPerView: 2.2 },
        }}
        loop={true}
        speed={5000}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
        }}
      >
        {reviews.map((review, index) => {
          const color = colorClassMap[review.boxColor];

          return (
            <SwiperSlide key={index}>
              <div
                className={clsx(
                  "h-[380px] bg-gray-100 p-6 rounded-2xl border-l-8",
                  color.border
                )}
              >
                <div className={clsx("flex gap-1 mb-3", color.text)}>
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <h6 className="font-semibold text-left mb-2">{review.title}</h6>
                <p className="text-left text-[16px] italic line-clamp-6">
                  "{review.text}"
                </p>
                <p className="mt-4 font-bold text-left">- {review.name}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
