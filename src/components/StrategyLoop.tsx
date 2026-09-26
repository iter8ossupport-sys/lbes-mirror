import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar, BarChart3, TrendingUp, Eye } from "lucide-react";
import { cn } from "../lib/utils";

interface LifecycleNodeProps {
  label: string;
  action: string;
  bg: string;
  border: string;
  delay: number;
  dim?: boolean;
}

const LifecycleNode = ({ label, action, bg, border, delay, dim }: LifecycleNodeProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay }}
    className={cn("flex flex-col items-center gap-2.5 flex-shrink-0", dim && "opacity-50")}
  >
    <div className={cn("w-[72px] h-[72px] rounded-xl border flex items-center justify-center transition-all duration-300", bg, border)}>
      <span className="text-[10px] font-bold tracking-widest uppercase text-white">
        {label}
      </span>
    </div>
    <span className="text-[11px] tracking-wide text-gray-500">{action}</span>
  </motion.div>
);

// Spacer — same size as the old arrow, keeps node spacing identical
const HArrow = ({ delay: _ }: { delay: number }) => (
  <div className="hidden md:block w-[40px] flex-shrink-0 pb-6" />
);

const VArrow = ({ delay: _ }: { delay: number }) => (
  <div className="md:hidden h-[32px]" />
);

interface VersionCardProps {
  version: string;
  rule: string;
  arrow?: boolean;
  delay: number;
}

const VersionCard = ({ version, rule, arrow, delay }: VersionCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="flex flex-col items-center"
  >
    <div className="bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-center">
      <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 block mb-1">
        {version}
      </span>
      <span className="text-sm text-white font-medium">{rule}</span>
    </div>
    {arrow && (
      <div className="flex flex-col items-center my-2">
        <div className="w-px h-4 bg-gradient-to-b from-white/20 to-transparent" />
        <ArrowRight className="w-4 h-4 text-gray-600 rotate-90" />
      </div>
    )}
  </motion.div>
);

interface FutureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const FutureCard = ({ icon: Icon, title, description, delay }: FutureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="relative flex flex-col p-5 md:p-6 rounded-2xl border border-white/5 bg-[#0A0A0A]/50 transition-all duration-300 opacity-60"
  >
    {/* Coming Soon Badge */}
    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
      <Clock className="w-3 h-3 text-gray-500" />
      <span className="text-[10px] font-bold tracking-wider uppercase text-gray-500">
        Coming Soon
      </span>
    </div>

    {/* Icon */}
    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
      <Icon className="w-5 h-5 text-gray-500" />
    </div>

    {/* Title */}
    <h4 className="text-base font-semibold text-white mb-2">{title}</h4>

    {/* Description */}
    <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
  </motion.div>
);

export const StrategyLoop = () => {



  const futureFeatures = [
    {
      icon: Calendar,
      title: "Daily Review",
      description: "Your latest trading activity.",
    },
    {
      icon: BarChart3,
      title: "Weekly Review",
      description: "What changed in your trading this week.",
    },
    {
      icon: TrendingUp,
      title: "Monthly Review",
      description: "How closely your trading matched your strategy over time.",
    },
    {
      icon: Eye,
      title: "Strategy Drift",
      description: "Detect meaningful changes in behavior relative to your current strategy.",
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
              THE LOOP
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
          Your strategy changed. Your software can change with it.
        </motion.h2>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          When your strategy evolves, update the strategy version, send it back to LBES for engineering and testing, and keep comparing the new version with your trading history.
        </motion.p>

        {/* Primary Product Loop */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="border border-white/8 rounded-2xl px-6 py-8 md:px-10 md:py-10 bg-[#080808]">

            {/* Desktop: horizontal row */}
            <div className="hidden md:flex items-start justify-center">
              <LifecycleNode label="MIRROR" action="Compare" bg="bg-blue-500/10" border="border-blue-500/40" delay={0.35} />
              <HArrow delay={0.4} />
              <LifecycleNode label="STRATEGY" action="Refine" bg="bg-amber-500/10" border="border-amber-500/40" delay={0.45} />
              <HArrow delay={0.5} />
              <LifecycleNode label="LBES" action="Engineer" bg="bg-violet-500/10" border="border-violet-500/40" delay={0.55} />
              <HArrow delay={0.6} />
              <LifecycleNode label="TEST" action="Verify" bg="bg-green-500/10" border="border-green-500/40" delay={0.65} />
              <HArrow delay={0.7} />
              <LifecycleNode label="MIRROR" action="Observe again" bg="bg-blue-500/5" border="border-blue-500/20" delay={0.75} dim />
            </div>

            {/* Loop-back hint — desktop only */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="hidden md:flex justify-center mt-4"
            >
              <svg width="420" height="20" viewBox="0 0 420 20" fill="none">
                {/* Curved arc connecting last node back to first */}
                <path d="M 390 4 Q 210 28 30 4" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" strokeDasharray="3 4"/>
                <polyline points="26,0 30,4 34,0" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
              </svg>
            </motion.div>

            {/* Mobile: vertical stack */}
            <div className="md:hidden flex flex-col items-center">
              <LifecycleNode label="MIRROR" action="Compare" bg="bg-blue-500/10" border="border-blue-500/40" delay={0.35} />
              <VArrow delay={0.4} />
              <LifecycleNode label="STRATEGY" action="Refine" bg="bg-amber-500/10" border="border-amber-500/40" delay={0.45} />
              <VArrow delay={0.5} />
              <LifecycleNode label="LBES" action="Engineer" bg="bg-violet-500/10" border="border-violet-500/40" delay={0.55} />
              <VArrow delay={0.6} />
              <LifecycleNode label="TEST" action="Verify" bg="bg-green-500/10" border="border-green-500/40" delay={0.65} />
              <VArrow delay={0.7} />
              <LifecycleNode label="MIRROR" action="Observe again" bg="bg-blue-500/5" border="border-blue-500/20" delay={0.75} dim />
            </div>

          </div>
        </motion.div>

        {/* Strategy Version Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-8">
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">
              STRATEGY VERSIONING
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <VersionCard
              version="Strategy v1"
              rule="Maximum 2 trades/day"
              arrow={true}
              delay={0.6}
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="flex flex-col items-center"
            >
              <div className="bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2 text-center">
                <span className="text-xs text-gray-400">Historical Evidence</span>
              </div>
              <div className="w-px h-4 bg-gradient-to-b from-white/20 to-transparent my-2" />
              <ArrowRight className="w-5 h-5 text-gray-600 rotate-90 md:rotate-0" />
              <div className="w-px h-4 bg-gradient-to-t from-white/20 to-transparent my-2" />
            </motion.div>

            <VersionCard
              version="Strategy v2"
              rule="Maximum 3 trades/day"
              arrow={false}
              delay={0.8}
            />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="flex flex-col items-center"
            >
              <ArrowRight className="w-5 h-5 text-gray-600 hidden md:block" />
              <div className="w-px h-4 bg-gradient-to-b from-white/20 to-transparent my-2 md:hidden" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.0 }}
              className="bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-3 text-center"
            >
              <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400 block mb-1">
                LBES
              </span>
              <span className="text-xs text-white">Engineering + Testing</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Future Monitoring Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Coming Soon Eyebrow */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5">
              <Clock className="w-3 h-3 text-gray-500" />
              <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-400">
                COMING SOON
              </span>
            </div>
          </div>

          {/* Future Headline */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight text-center mb-6"
          >
            Keep your strategy in the mirror.
          </motion.h3>

          {/* Future Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-gray-400 text-base md:text-lg text-center max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Connect your trading account once and Mirror will continuously compare new trading activity with your current strategy.
          </motion.p>

          {/* Future Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {futureFeatures.map((feature, index) => (
              <FutureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={0.7 + index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* Trust Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <p className="text-xs text-gray-600 max-w-lg mx-auto">
            Mirror reports historical evidence from your strategy definition and available trading data.
            Continuous monitoring will compare new trading activity against your documented strategy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
