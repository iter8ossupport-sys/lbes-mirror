import { motion } from "framer-motion";
import { FileDown, FileUp, MessageSquareText } from "lucide-react";
import { GradientBorder } from "./ui/GradientBorder";
import { RollingText } from "./ui/RollingText";

interface StrategyOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  recommended?: boolean;
  delay: number;
  onClick?: () => void;
}

const StrategyOption = ({
  icon,
  title,
  description,
  action,
  recommended,
  delay,
  onClick,
}: StrategyOptionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className={`relative flex flex-col p-6 md:p-8 rounded-2xl border transition-all duration-300 h-full cursor-pointer group ${
      recommended
        ? "bg-[#0A0A0A] border-blue-500/30 hover:border-blue-500/50"
        : "bg-[#0A0A0A] border-white/10 hover:border-white/20"
    }`}
    onClick={onClick}
  >
    {recommended && (
      <div className="absolute -top-3 right-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
        Recommended
      </div>
    )}

    <div className="flex flex-col h-full">
      <div className="mb-6">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
            recommended
              ? "bg-blue-500/10 border border-blue-500/20"
              : "bg-white/5 border border-white/10"
          }`}
        >
          {icon}
        </div>
      </div>

      <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
        {title}
      </h3>

      <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-grow">
        {description}
      </p>

      <GradientBorder
        gradient={
          recommended
            ? "from-blue-500 via-blue-600 to-blue-500"
            : "from-orange-500 via-red-500 to-orange-600"
        }
        containerClassName="rounded-xl p-[1px] w-fit"
      >
        <button
          className={`px-6 py-2.5 bg-[#0F0F0F] text-white text-sm font-medium rounded-xl hover:bg-black transition-colors flex items-center gap-2 group/btn ${
            recommended ? "" : ""
          }`}
        >
          <RollingText text={action} />
        </button>
      </GradientBorder>
    </div>

    {recommended && (
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-2xl pointer-events-none" />
    )}
  </motion.div>
);

export const StrategyInput = () => {
  const options = [
    {
      icon: <FileDown className="w-6 h-6 text-blue-400" />,
      title: "Import from LBES",
      description:
        "Bring in your approved strategy and its defined rules.",
      action: "Import Strategy",
      recommended: true,
    },
    {
      icon: <FileUp className="w-6 h-6 text-orange-400" />,
      title: "Upload",
      description:
        "Use an existing PDF, code file, or strategy document.",
      action: "Upload Strategy",
      recommended: false,
    },
    {
      icon: <MessageSquareText className="w-6 h-6 text-gray-400" />,
      title: "Describe it",
      description:
        "Answer a few simple questions about your market, timeframe, entry, exit, and risk.",
      action: "Describe Strategy",
      recommended: false,
    },
  ];

  return (
    <section className="w-full py-24 md:py-32 px-6 relative z-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5">
            <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-400">
              YOUR STRATEGY FIRST
            </span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-center mb-6 max-w-3xl mx-auto leading-[1.15]"
        >
          Give Mirror your strategy.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Start with the strategy you already have. Import it from LBES, upload
          your existing document or code, or describe it in a few simple steps.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {options.map((option, index) => (
            <StrategyOption
              key={index}
              {...option}
              delay={index * 0.1 + 0.3}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500">
            Don't have a defined strategy yet?{" "}
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Start with LBES
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
};
