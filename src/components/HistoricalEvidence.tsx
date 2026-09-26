import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, BarChart3, Clock, AlertCircle, Eye, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

interface EvidenceGroupProps {
  label: string;
  count: string;
  average: string;
  isPositive: boolean;
  delay: number;
}

const EvidenceGroup = ({ label, count, average, isPositive, delay }: EvidenceGroupProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={cn(
      "flex-1 flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl border transition-all duration-300",
      isPositive
        ? "bg-green-500/5 border-green-500/20 hover:border-green-500/40"
        : "bg-orange-500/5 border-orange-500/20 hover:border-orange-500/40"
    )}
  >
    <span className={cn(
      "text-[10px] font-bold tracking-widest uppercase mb-4",
      isPositive ? "text-green-400" : "text-orange-400"
    )}>
      {label}
    </span>
    
    <div className="text-center mb-4">
      <span className="text-2xl md:text-3xl font-bold text-white block mb-1">
        {count}
      </span>
      <span className="text-xs text-gray-500">observations</span>
    </div>
    
    <div className="flex items-center gap-2">
      {isPositive ? (
        <TrendingUp className="w-4 h-4 text-green-400" />
      ) : (
        <TrendingDown className="w-4 h-4 text-orange-400" />
      )}
      <span className={cn(
        "text-lg font-semibold",
        isPositive ? "text-green-400" : "text-orange-400"
      )}>
        {average}
      </span>
    </div>
    <span className="text-xs text-gray-500 mt-1">historical average</span>
  </motion.div>
);

interface ObservationRowProps {
  rule: string;
  inside: string;
  outside: string;
  delay: number;
}

const ObservationRow = ({ rule, inside, outside, delay }: ObservationRowProps) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-white/5 last:border-0 gap-2 md:gap-4"
  >
    <span className="text-sm text-white font-medium md:w-1/3">{rule}</span>
    <div className="flex items-center gap-4 md:gap-8 md:w-2/3">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-xs text-gray-400">{inside}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-orange-500" />
        <span className="text-xs text-gray-400">{outside}</span>
      </div>
    </div>
  </motion.div>
);

interface TradeExampleProps {
  date: string;
  symbol: string;
  defined: string;
  observed: string;
  delay: number;
}

const TradeExample = ({ date, symbol, defined, observed, delay }: TradeExampleProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-white">{date}</span>
      </div>
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{symbol}</span>
    </div>
    
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <span className="text-[10px] font-bold tracking-wider uppercase text-blue-400 mt-0.5">Defined:</span>
        <span className="text-xs text-gray-300">{defined}</span>
      </div>
      <div className="flex items-start gap-2">
        <span className="text-[10px] font-bold tracking-wider uppercase text-orange-400 mt-0.5">Observed:</span>
        <span className="text-xs text-gray-300">{observed}</span>
      </div>
    </div>
  </motion.div>
);

export const HistoricalEvidence = () => {
  const observations = [
    { rule: "London session", inside: "41 trades inside", outside: "4 trades outside" },
    { rule: "Maximum daily trades", inside: "41 sessions within rule", outside: "6 sessions exceeded rule" },
    { rule: "Instrument restriction", inside: "44 trades matched", outside: "3 trades outside definition" },
  ];

  const tradeExamples = [
    {
      date: "Sep 18",
      symbol: "EURUSD",
      defined: "Maximum 2 trades/day",
      observed: "3rd trade of session",
    },
    {
      date: "Sep 24",
      symbol: "EURUSD",
      defined: "London session",
      observed: "Entry outside defined window",
    },
    {
      date: "Sep 29",
      symbol: "GBPUSD",
      defined: "Maximum 2 trades/day",
      observed: "4 trades in single session",
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
              THE EVIDENCE
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
          See what the history shows.
        </motion.h2>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          For the rules we can measure, Mirror compares the historical results of trades that followed the rule with trades that didn't.
        </motion.p>

        {/* Demo Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/20">
            <Eye className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-blue-300">
              Demonstration data — not real trading results
            </span>
          </div>
        </motion.div>

        {/* Primary Evidence Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 md:p-10 mb-12"
        >
          {/* Selected Rule */}
          <div className="text-center mb-8">
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-3 block">
              SELECTED RULE
            </span>
            <h3 className="text-xl md:text-2xl font-semibold text-white">
              Maximum 2 trades per day
            </h3>
          </div>

          {/* Comparison Groups */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-8">
            <EvidenceGroup
              label="Followed"
              count="41 trades"
              average="+0.8R"
              isPositive={true}
              delay={0.4}
            />
            <EvidenceGroup
              label="Exceeded"
              count="6 sessions"
              average="-0.4R"
              isPositive={false}
              delay={0.5}
            />
          </div>

          {/* Historical Difference */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5"
          >
            <span className="text-xs text-gray-500 block mb-1">Historical difference</span>
            <span className="text-xl font-bold text-white">+1.2R</span>
          </motion.div>

          {/* Historical Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-xs text-gray-600 text-center mt-6"
          >
            Historical observation, not a prediction of future performance.
          </motion.p>
        </motion.div>

        {/* Other Observations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-white">Other Observations</h3>
          </div>
          
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
            {observations.map((obs, index) => (
              <ObservationRow
                key={index}
                rule={obs.rule}
                inside={obs.inside}
                outside={obs.outside}
                delay={0.5 + index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* Trade Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-white">Trade Examples</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tradeExamples.map((example, index) => (
              <TradeExample
                key={index}
                date={example.date}
                symbol={example.symbol}
                defined={example.defined}
                observed={example.observed}
                delay={0.6 + index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* Trust Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-16 text-center"
        >
          <p className="text-xs text-gray-600 max-w-lg mx-auto">
            Mirror reports historical evidence from your strategy definition and available trading data.
            It does not provide trading recommendations or predict future results.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
