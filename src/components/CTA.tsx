import React from "react";
import { motion } from "framer-motion";
import { GradientBorder } from "./ui/GradientBorder";
import { RollingText } from "./ui/RollingText";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="relative w-full py-32 overflow-hidden z-20">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[40vw] h-[40vw] bg-orange-600/20 blur-[120px] rounded-full opacity-60" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[40vw] h-[40vw] bg-blue-600/20 blur-[120px] rounded-full opacity-60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-6"
        >
          Are you actually trading <br />
          your strategy?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          Join the first 50 traders helping us test Mirror. Compare your defined strategy with your actual trading history.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto"
        >
          <GradientBorder
            gradient="from-orange-500 via-red-500 to-orange-600"
            containerClassName="rounded-full p-[1.5px] w-full sm:w-auto"
          >
            <Link
              to="/#early-access"
              className="w-full sm:w-auto px-8 py-3.5 bg-black text-white font-medium rounded-full hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 group"
            >
              <RollingText text="Join Early Access" />
            </Link>
          </GradientBorder>

          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-3.5 text-white font-medium border border-white/20 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center justify-center gap-2 group"
          >
            <RollingText text="Contact Us" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
