import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, HelpCircle, ArrowDown, TrendingUp, BarChart3, Layers, Eye } from "lucide-react";
import { cn } from "../lib/utils";

type ComparisonState = "aligned" | "diverged" | "unknown";

interface ComparisonFinding {
  id: string;
  defined: string;
  actual: string;
  evidence: string;
  state: ComparisonState;
}

interface SummaryStat {
  value: number;
  label: string;
  color?: string;
}

const StateBadge = ({ state }: { state: ComparisonState }) => {
  const config = {
    aligned: {
      icon: CheckCircle2,
      label: "Aligned",
      className: "bg-green-500/10 border-green-500/30 text-green-400",
    },
    diverged: {
      icon: AlertTriangle,
      label: "Diverged",
      className: "bg-orange-500/10 border-orange-500/30 text-orange-400",
    },
    unknown: {
      icon: HelpCircle,
      label: "Unknown",
      className: "bg-gray-500/10 border-gray-500/30 text-gray-400",
    },
  };

  const { icon: Icon, label, className } = config[state];

  return (
    <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full border", className)}>
      <Icon className="w-4 h-4" />
      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    </div>
  );
};

const SummaryCard = ({ stat, delay }: { stat: SummaryStat; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0A0A0A] border border-white/10"
  >
    <span className={cn("text-3xl md:text-4xl font-bold mb-2", stat.color || "text-white")}>
      {stat.value}
    </span>
    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
      {stat.label}
    </span>
  </motion.div>
);

const ComparisonCard = ({ finding, index }: { finding: ComparisonFinding; index: number }) => {
  const stateColors = {
    aligned: {
      border: "border-green-500/20",
      glow: "from-green-500/10",
      arrow: "text-green-500",
    },
    diverged: {
      border: "border-orange-500/20",
      glow: "from-orange-500/10",
      arrow: "text-orange-500",
    },
    unknown: {
      border: "border-gray-500/20",
      glow: "from-gray-500/10",
      arrow: "text-gray-500",
    },
  };

  const colors = stateColors[finding.state];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "relative flex flex-col p-6 md:p-8 rounded-2xl border bg-[#0A0A0A] transition-all duration-300",
        colors.border
      )}
    >
      {/* Subtle glow based on state */}
      <div className={cn("absolute inset-0 bg-gradient-to-b rounded-2xl pointer-events-none opacity-50", colors.glow, "to-transparent")} />

      <div className="relative z-10">
        {/* Defined Rule */}
        <div className="mb-4">
          <span className="text-[10px] font-bold tracking-widest uppercase text-blue-400 mb-2 block">
            Defined
          </span>
          <p className="text-base md:text-lg font-medium text-white">
            {finding.defined}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center my-4">
          <ArrowDown className={cn("w-5 h-5", colors.arrow)} />
        </div>

        {/* Actual Behavior */}
        <div className="mb-4">
          <span className="text-[10px] font-bold tracking-widest uppercase text-orange-400 mb-2 block">
            Actual
          </span>
          <p className="text-base md:text-lg font-medium text-white">
            {finding.actual}
          </p>
        </div>

        {/* Evidence */}
        <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2 block">
            Evidence
          </span>
          <p className="text-sm text-gray-300">
            {finding.evidence}
          </p>
        </div>

        {/* State Badge */}
        <div className="flex justify-center">
          <StateBadge state={finding.state} />
        </div>
      </div>
    </motion.div>
  );
};

export const MirrorComparison = () => {
  // Demo data - clearly illustrative
  const summaryStats: SummaryStat[] = [
    { value: 47, label: "Trades Analyzed" },
    { value: 8, label: "Rules Checked" },
    { value: 5, label: "Aligned", color: "text-green-400" },
    { value: 3, label: "Need Review", color: "text-orange-400" },
  ];

  const findings: ComparisonFinding[] = [
    {
      id: "1",
      defined: "Maximum 2 trades per day",
      actual: "3+ trades occurred on some sessions",
      evidence: "6 sessions exceeded the defined limit. 41 sessions followed the limit.",
      state: "diverged",
    },
    {
      id: "2",
      defined: "London session only",
      actual: "Some trades occurred outside the defined session",
      evidence: "9% of recorded trades were outside the defined session window.",
      state: "diverged",
    },
    {
      id: "3",
      defined: "1% risk per trade",
      actual: "Some recorded positions exceeded the defined size/risk rule",
      evidence: "5 trades exceeded the defined risk threshold.",
      state: "diverged",
    },
    {
      id: "4",
      defined: "Enter after confirmation",
      actual: "Confirmation cannot be established from the uploaded trade data",
      evidence: "Required confirmation information is not present in the available history.",
      state: "unknown",
    },
  ];

  return (
    <section className="w-full py-24 md:py-32 px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5">
            <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-400">
              THE MIRROR
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-center mb-6 max-w-3xl mx-auto leading-[1.15]"
        >
          Your strategy vs. your reality.
        </motion.h2>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Mirror compares the rules you defined with what your trading history actually shows.
        </motion.p>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {summaryStats.map((stat, index) => (
            <SummaryCard key={index} stat={stat} delay={index * 0.1} />
          ))}
        </motion.div>

        {/* Demo Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/20">
            <Eye className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-blue-300">
              Demonstration data — not real trading results
            </span>
          </div>
        </motion.div>

        {/* Findings Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-white text-center">
            Rule Comparison
          </h3>
          <p className="text-sm text-gray-500 text-center mt-2">
            Each rule compared against your trading history
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {findings.map((finding, index) => (
            <ComparisonCard key={finding.id} finding={finding} index={index} />
          ))}
        </div>

        {/* Trust Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-xs text-gray-600 max-w-md mx-auto">
            Mirror reports historical evidence from your strategy definition and available trading data.
            It does not predict future results or provide trading recommendations.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
