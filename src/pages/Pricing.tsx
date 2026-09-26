import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { GradientBorder } from "../components/ui/GradientBorder";
import { RollingText } from "../components/ui/RollingText";

interface PlanCardProps {
  badge: string;
  title: string;
  description: string;
  price: string;
  suffix: string;
  historicalDepth: string;
  features: string[];
  ctaText: string;
  supportingCopy?: string;
  isPopular?: boolean;
  buttonVariant?: "outline" | "gradient";
  isEarlyAccessFree?: boolean;
}

const PricingFeature = ({ text }: { text: string }) => (
  <div className="flex items-start gap-2.5">
    <div className="mt-0.5 flex-shrink-0">
      <Sparkles size={13} className="text-blue-500 fill-blue-500/20" />
    </div>
    <span className="text-gray-300 text-xs md:text-sm font-medium leading-snug">{text}</span>
  </div>
);

const PricingCard = ({
  badge,
  title,
  description,
  price,
  suffix,
  historicalDepth,
  features,
  ctaText,
  supportingCopy,
  isPopular,
  buttonVariant = "outline",
  isEarlyAccessFree = false,
}: PlanCardProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col p-6 md:p-7 rounded-3xl border transition-all duration-300 w-full",
        isPopular
          ? "bg-[#0A0A0A] border-orange-500/50 shadow-[0_0_40px_rgba(249,115,22,0.15)]"
          : "bg-[#0A0A0A] border-white/10 hover:border-white/20"
      )}
    >
      {/* Plan Badge */}
      <div
        className={cn(
          "absolute -top-3.5 right-6 text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-lg",
          isPopular
            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
            : "bg-white/10 border border-white/20 text-gray-300 backdrop-blur-md"
        )}
      >
        {badge}
      </div>

      {/* Header Info */}
      <div className="mb-3">
        <h3 className="text-lg md:text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{description}</p>
      </div>

      {/* Historical Depth Indicator */}
      <div className="mb-3 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
        <span className="text-xs text-gray-400 font-medium">Historical Horizon</span>
        <span className="text-[11px] font-semibold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
          {historicalDepth}
        </span>
      </div>

      {/* Pricing */}
      <div className="mb-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">{price}</span>
          <span className="text-gray-400 text-xs md:text-sm font-medium">{suffix}</span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mb-4">
        {isEarlyAccessFree ? (
          <div>
            <Link to="/#early-access" className="block w-full">
              <GradientBorder
                gradient="from-orange-500 via-red-500 to-orange-600"
                containerClassName="w-full rounded-xl p-[1px]"
                className="rounded-xl"
              >
                <div className="w-full py-2.5 bg-[#0F0F0F] text-white font-medium rounded-xl hover:bg-black transition-colors relative overflow-hidden group flex items-center justify-center">
                  <span className="relative z-10 block">
                    <RollingText text={ctaText} className="justify-center uppercase tracking-wider text-xs font-bold" />
                  </span>
                </div>
              </GradientBorder>
            </Link>
            {supportingCopy && (
              <p className="text-[11px] text-gray-400 text-center mt-1.5 font-medium tracking-wide">
                {supportingCopy}
              </p>
            )}
          </div>
        ) : isPopular ? (
          <div>
            <GradientBorder
              gradient="from-orange-500 via-red-500 to-orange-600"
              containerClassName="w-full rounded-xl p-[1px]"
              className="rounded-xl"
            >
              <button
                disabled
                className="w-full py-2.5 bg-[#0F0F0F] text-white/90 font-medium rounded-xl cursor-default transition-colors relative overflow-hidden group flex items-center justify-center"
              >
                <span className="relative z-10 block text-xs uppercase font-bold tracking-wider text-gray-200">
                  {ctaText}
                </span>
              </button>
            </GradientBorder>
            <p className="text-[11px] text-gray-500 text-center mt-1.5 font-medium">
              In Early Access
            </p>
          </div>
        ) : (
          <div>
            <button
              disabled
              className="w-full py-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 text-xs font-bold uppercase tracking-wider cursor-default transition-colors"
            >
              {ctaText}
            </button>
            <p className="text-[11px] text-gray-500 text-center mt-1.5 font-medium">
              In Early Access
            </p>
          </div>
        )}
      </div>

      {/* Feature List - Tightly follows CTA with no giant gap */}
      <div className="pt-4 border-t border-white/10 space-y-2.5">
        <p className="text-[11px] font-semibold text-white/80 uppercase tracking-widest mb-2.5">
          What&apos;s Included
        </p>
        {features.map((feature, i) => (
          <PricingFeature key={i} text={feature} />
        ))}
      </div>
    </div>
  );
};

export const Pricing = () => {
  const plans: PlanCardProps[] = [
    {
      badge: "FREE",
      title: "Mirror Free",
      description: "See your first Mirror.",
      price: "$0",
      suffix: "forever",
      historicalDepth: "1 month",
      features: [
        "1 month of historical trading data",
        "Strategy import",
        "Basic strategy-vs-reality comparison",
        "Rule-by-rule audit",
        "Limited historical evidence",
        "1 strategy version",
        "Basic review history",
      ],
      ctaText: "START FREE",
      supportingCopy: "No payment required.",
      isPopular: false,
      buttonVariant: "gradient",
      isEarlyAccessFree: true,
    },
    {
      badge: "CORE",
      title: "Mirror Core",
      description: "Understand your recent trading.",
      price: "$9",
      suffix: "per month",
      historicalDepth: "6 months",
      features: [
        "Up to 6 months of historical data",
        "Full strategy audit",
        "Rule-by-rule comparison",
        "Historical evidence",
        "Up to 3 strategy versions",
        "Review history",
        "Weekly review",
        "Strategy refinement workspace",
        "Strategy drift detection",
      ],
      ctaText: "COMING SOON",
      isPopular: false,
      buttonVariant: "outline",
    },
    {
      badge: "POPULAR",
      title: "Mirror Pro",
      description: "Monitor and review your trading continuously.",
      price: "$19",
      suffix: "per month",
      historicalDepth: "1 year",
      features: [
        "Up to 1 year of historical data",
        "Everything in Core",
        "Unlimited strategy versions",
        "Daily review",
        "Weekly review",
        "Strategy drift detection",
        "Current trading monitoring",
        "Full historical evidence",
        "Strategy refinement workspace",
        "Extended comparison history",
      ],
      ctaText: "COMING SOON",
      isPopular: true,
      buttonVariant: "gradient",
    },
    {
      badge: "RESEARCH",
      title: "Mirror Research",
      description: "Study your strategy across years of historical evidence.",
      price: "$39",
      suffix: "per month",
      historicalDepth: "5+ years",
      features: [
        "5+ years of historical data",
        "Everything in Pro",
        "Long-term historical analysis",
        "Advanced historical comparisons",
        "Extended strategy-version history",
        "Long-term strategy drift analysis",
        "Daily review",
        "Weekly review",
        "Current trading monitoring",
        "Research-focused evidence views",
      ],
      ctaText: "COMING SOON",
      isPopular: false,
      buttonVariant: "outline",
    },
  ];

  return (
    <div id="pricing" className="relative w-full min-h-screen pt-28 pb-20 bg-[#050505] overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full max-w-full">
        <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-orange-600/10 blur-[130px] rounded-full opacity-50" />
        <div className="absolute top-1/3 right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-blue-600/10 blur-[130px] rounded-full opacity-40" />
      </div>

      {/* --- HEADER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-1.5 mb-6"
        >
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase">
            MIRROR PLANS
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 drop-shadow-xl max-w-4xl mx-auto"
        >
          Choose how deeply you want to study your trading.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
        >
          Start with your recent history. Go deeper when you need more evidence, longer history, and continuous review.
        </motion.p>
      </div>

      {/* --- PRICING CARDS --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="w-full"
            >
              <PricingCard {...plan} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- FOOTNOTE & LEGAL POSITIONING --- */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-2.5">
        <p className="text-xs text-gray-500 leading-relaxed">
          Historical analysis is based on available user-provided trading data. Historical results do not predict future performance.
        </p>
        <p className="text-[11px] text-gray-600 leading-relaxed">
          Mirror provides historical analysis and educational/product information. It does not provide trade signals, personalized investment recommendations, or guarantees of future performance. Data availability may vary based on instrument, broker format, and market history.
        </p>
      </div>
    </div>
  );
};
