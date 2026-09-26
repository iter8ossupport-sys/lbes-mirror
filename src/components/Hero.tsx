import { Link } from "react-router-dom";
import { GradientBorder } from "./ui/GradientBorder";
import { RollingText } from "./ui/RollingText";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="relative w-full min-h-[95vh] overflow-hidden flex flex-col items-center justify-center pt-24 pb-48">
      {/* Background Video/Effect */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        >
          <source
            src="https://69sfgmk1pv2omedb.public.blob.vercel-storage.com/new-templates/converge-ai/bgVid.webm"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center h-full">
        {/* Eyebrow */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-900/10 backdrop-blur-md px-4 py-1.5 shadow-[0_0_20px_rgba(77,121,255,0.2)]">
            <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
              STRATEGY → REALITY
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 max-w-4xl text-center drop-shadow-2xl"
        >
          Are you actually trading<br />your strategy?
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-light text-center"
        >
          You have a strategy. You have your trading history. LBES Mirror compares the two and shows where your actual trading matches, differs, and changes over time.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-12"
        >
          <GradientBorder
            gradient="from-orange-500 via-red-500 to-orange-600"
            containerClassName="rounded-full p-[1px]"
          >
            <Link
              to="#how-it-works"
              className="px-8 py-3.5 bg-black text-white font-medium rounded-full hover:bg-gray-900 transition-colors flex items-center gap-2 group"
            >
              <RollingText text="See How It Works" />
            </Link>
          </GradientBorder>

          <Link
            to="/waitlist"
            className="px-8 py-3.5 text-white font-medium border border-white/20 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm group"
          >
            <RollingText text="Join Early Access" />
          </Link>
        </motion.div>

        {/* Supporting line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-500 text-xs sm:text-sm text-center mb-16"
        >
          Built for traders who already have a strategy and trading history.
        </motion.p>

        {/* Product Visual - Strategy vs Reality */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-4xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Strategy Card */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">What I Defined</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Max trades</span>
                  <span className="text-sm text-white font-medium">2 / day</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Session</span>
                  <span className="text-sm text-white font-medium">London</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Risk</span>
                  <span className="text-sm text-white font-medium">1% per trade</span>
                </div>
              </div>
            </div>

            {/* Mirror - Center */}
            <div className="flex flex-col items-center justify-center py-4 md:py-0">
              <div className="hidden md:flex flex-col items-center gap-3">
                <div className="w-px h-8 bg-gradient-to-b from-blue-500 to-transparent" />
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-orange-500/20 border border-white/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">VS</span>
                </div>
                <div className="w-px h-8 bg-gradient-to-t from-orange-500 to-transparent" />
              </div>
              <div className="md:hidden flex items-center gap-4">
                <div className="w-12 h-px bg-gradient-to-r from-blue-500 to-transparent" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-orange-500/20 border border-white/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">VS</span>
                </div>
                <div className="w-12 h-px bg-gradient-to-l from-orange-500 to-transparent" />
              </div>
            </div>

            {/* Reality Card */}
            <div className="bg-[#0A0A0A] border border-orange-500/20 rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">What I Actually Did</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Trades</span>
                  <span className="text-sm text-orange-400 font-medium">3+ on 6 sessions</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Outside session</span>
                  <span className="text-sm text-orange-400 font-medium">9%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Above 1% risk</span>
                  <span className="text-sm text-orange-400 font-medium">5 trades</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
