import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-2 bg-white/40 backdrop-blur-md border border-white/20 rounded-full mb-8">
              <span className="text-gray-700 text-sm font-medium flex items-center gap-2">
                <Star className="w-4 h-4" /> Patient Reviews
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-8 tracking-tight">
              What Our Patients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              Hear from some of our wonderful patients about their recovery
              journey with us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 relative"
            >
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 font-light leading-relaxed mb-6">
                "The team at Easeway Medicare helped me recover from my back
                injury completely. Their personalized approach and genuine care
                made all the difference. I'm back to playing football thanks to
                them!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-800 font-semibold">MJ</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Michael Johnson</p>
                  <p className="text-sm text-gray-600">
                    Sports Injury Recovery
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 relative"
            >
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 font-light leading-relaxed mb-6">
                "After years of chronic neck pain, I finally found relief
                through Easeway Medicare's expert physiotherapy. The staff is
                incredibly professional and the treatment plans are tailored
                perfectly to individual needs."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-800 font-semibold">SW</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Sarah Williams</p>
                  <p className="text-sm text-gray-600">
                    Chronic Pain Management
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 relative md:col-span-2 lg:col-span-1"
            >
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 font-light leading-relaxed mb-6">
                "Post-surgery rehabilitation was made so much easier with
                Easeway Medicare. They supported me every step of the way and
                helped me regain full mobility. Truly exceptional care and
                service!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-teal-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-800 font-semibold">RT</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Robert Thompson</p>
                  <p className="text-sm text-gray-600">Post-Surgery Recovery</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
