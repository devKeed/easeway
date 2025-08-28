"use client";

import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";

const LeaveReview = () => {
  const googleReviewUrl =
    "https://www.google.com/search?client=ms-android-samsung-ss&sca_esv=ba24c2d2484ecd3d&sxsrf=AE3TifOfuqv96J_G6wzvgKVEzgxvqKXbNw:1756331177143&q=easeway+medicare+physiotherapy+peterborough+reviews&uds=AOm0WdGQnFtqQKYcJASmdBTO60EylojGf40QUoFLgC3nR2vnGqcBiNyO_kwy6XGzO1z2lqwcafQ1QJMbx628Kv-5Ra4u3cPo7enwiKG2MsWFEpJyD6AmhVyUJV5BrBXGS4inQxiuD_felJJS6Q-bp8zmDOYINfBVwGpmRSTfXBtty3xUNwGZ6o5LxuHezKw3fCX_6g9oCHDYIHRTsT9PvuczTiID63Op8W2zyV-aWubJjp1-6-jtoMT2NwAZHkPF0xBmd0DOfUylOiKN-GDUicoX_utZSgPzV3gyHU4vwVkxIFbPlSWGJe-k0zFgZblC5IDndhsv08i_W5eyAvLqOphbjKh3P2VvDvY7eNS5zSTp5q1G-e8s7XdwFOdb2xu0D_dZypFk8qOT&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E_SOyUOn5D3iB6AbdFVfgLPcmvEmv6WJmgeT70k9_xOeLmhD5vNfjbtmI22--8ldiotsFsYVgvWc1MeLpzcx2gSY63i6UsJoik7D9YF7dfPegITMXneSO8VWc2rDKPFUAzhgwvg%3D&sa=X&ved=2ahUKEwjiu6-_-6uPAxUkQkEAHSKuKkIQk8gLegQIFxAB&ictx=1&stq=1&cs=1&lei=qXyvaKLDCKSEhbIPotyqkQQ#ebo=2";

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Main Content */}
          <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-xl p-6 sm:p-8">
            <h2 className="text-h4-mobile md:text-h3-small font-axiforma text-gray-900 mb-3 tracking-tight">
              Love Our Service?
            </h2>

            <p className="text-body-sm md:text-body text-gray-600 mb-6 max-w-lg mx-auto">
              Help others discover our care by sharing your experience on
              Google.
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current"
                />
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0e2127] hover:bg-[#101f24] text-white font-semibold rounded-xl transition-all duration-300 text-body-sm sm:text-body"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Star className="w-4 h-4 fill-current" />
              Leave a Google Review
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeaveReview;
