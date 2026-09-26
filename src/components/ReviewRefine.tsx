import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Edit3, ArrowRight, ArrowLeft, Send, Eye, Clock, AlertCircle } from "lucide-react";
import { GradientBorder } from "./ui/GradientBorder";
import { RollingText } from "./ui/RollingText";
import { cn } from "../lib/utils";

type ReviewState = "initial" | "reviewing" | "editing" | "approved" | "kept";

interface RuleData {
  current: string;
  observed: string;
  evidence: string;
  followed: number;
  exceeded: number;
}

const ReviewOption = ({
  title,
  description,
  action,
  icon: Icon,
  variant,
  delay,
  onClick,
}: {
  title: string;
  description: string;
  action: string;
  icon: React.ElementType;
  variant: "primary" | "secondary";
  delay: number;
  onClick?: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={cn(
      "flex flex-col p-6 md:p-8 rounded-2xl border transition-all duration-300 cursor-pointer h-full",
      variant === "primary"
        ? "bg-[#0A0A0A] border-white/10 hover:border-white/30"
        : "bg-[#0A0A0A] border-blue-500/20 hover:border-blue-500/40"
    )}
    onClick={onClick}
  >
    <div className="flex items-start gap-4 mb-4">
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center",
          variant === "primary"
            ? "bg-white/5 border border-white/10"
            : "bg-blue-500/10 border border-blue-500/20"
        )}
      >
        <Icon className={cn("w-5 h-5", variant === "primary" ? "text-gray-400" : "text-blue-400")} />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
    <div className="mt-auto pt-4">
      <GradientBorder
        gradient={variant === "primary" ? "from-orange-500 via-red-500 to-orange-600" : "from-blue-500 via-blue-600 to-blue-500"}
        containerClassName="rounded-xl p-[1px] w-full"
      >
        <button className="w-full py-3 bg-[#0F0F0F] text-white text-sm font-medium rounded-xl hover:bg-black transition-colors">
          <RollingText text={action} />
        </button>
      </GradientBorder>
    </div>
  </motion.div>
);

const EvidenceSummary = ({ rule, delay }: { rule: RuleData; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white/[0.02] border border-white/5 rounded-xl p-4 mb-6"
  >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <span className="text-[10px] font-bold tracking-wider uppercase text-blue-400 mb-2 block">Current Rule</span>
        <p className="text-sm text-white font-medium">{rule.current}</p>
      </div>
      <div>
        <span className="text-[10px] font-bold tracking-wider uppercase text-orange-400 mb-2 block">Observed</span>
        <p className="text-sm text-white font-medium">{rule.observed}</p>
      </div>
      <div>
        <span className="text-[10px] font-bold tracking-wider uppercase text-gray-400 mb-2 block">Evidence</span>
        <p className="text-sm text-white font-medium">{rule.evidence}</p>
      </div>
    </div>
    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-xs text-gray-400">{rule.followed} sessions followed</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-orange-500" />
        <span className="text-xs text-gray-400">{rule.exceeded} sessions exceeded</span>
      </div>
    </div>
  </motion.div>
);

export const ReviewRefine = () => {
  const [state, setState] = useState<ReviewState>("initial");
  const [editedRule, setEditedRule] = useState("Maximum 3 trades per day");
  
  const rule: RuleData = {
    current: "Maximum 2 trades per day",
    observed: "6 sessions exceeded the limit",
    evidence: "41 sessions followed, 6 exceeded",
    followed: 41,
    exceeded: 6,
  };

  const handleKeepRule = () => {
    setState("kept");
  };

  const handleReviewRule = () => {
    setState("reviewing");
  };

  const handleEditRule = () => {
    setState("editing");
  };

  const handleAcceptChange = () => {
    setState("approved");
  };

  const handleBack = () => {
    setState("initial");
  };

  return (
    <section className="w-full py-24 md:py-32 px-6 relative z-20">
      <div className="max-w-5xl mx-auto">
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
              REVIEW THE DIFFERENCE
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
          Now decide what changed.
        </motion.h2>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg text-center max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Your trading changed relative to the strategy you defined. Decide whether the rule still represents how you trade.
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

        <AnimatePresence mode="wait">
          {/* INITIAL STATE - Two Options */}
          {state === "initial" && (
            <motion.div
              key="initial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Current Rule Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-8 mb-8"
              >
                <div className="text-center mb-6">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-3 block">
                    REVIEW THIS RULE
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                    {rule.current}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Does this rule still describe your strategy?
                  </p>
                </div>

                <EvidenceSummary rule={rule} delay={0.4} />
              </motion.div>

              {/* Two Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ReviewOption
                  title="Keep the rule"
                  description="My strategy has not changed. I want to keep this rule and continue comparing my trading against it."
                  action="Keep Current Rule"
                  icon={CheckCircle2}
                  variant="primary"
                  delay={0.5}
                  onClick={handleKeepRule}
                />
                <ReviewOption
                  title="Review the rule"
                  description="My strategy has changed, or this rule no longer describes how I trade."
                  action="Review Rule"
                  icon={Edit3}
                  variant="secondary"
                  delay={0.6}
                  onClick={handleReviewRule}
                />
              </div>
            </motion.div>
          )}

          {/* REVIEWING STATE */}
          {state === "reviewing" && (
            <motion.div
              key="reviewing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back Button */}
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </motion.button>

              {/* Current Rule */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-8 mb-6"
              >
                <div className="mb-6">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2 block">
                    CURRENT RULE
                  </span>
                  <p className="text-xl font-semibold text-white">{rule.current}</p>
                </div>

                <EvidenceSummary rule={rule} delay={0.1} />
              </motion.div>

              {/* Suggested Revision */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#0A0A0A] border border-blue-500/20 rounded-2xl p-6 md:p-8 mb-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-blue-400">
                    SUGGESTED FOR REVIEW
                  </span>
                </div>
                <p className="text-xl font-semibold text-white mb-2">Maximum 3 trades per day</p>
                <p className="text-sm text-gray-400">
                  Based on your observed trading behavior, this revision may better reflect how you actually trade.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4">
                <GradientBorder
                  gradient="from-blue-500 via-blue-600 to-blue-500"
                  containerClassName="rounded-xl p-[1px] flex-1"
                >
                  <button
                    onClick={handleAcceptChange}
                    className="w-full py-4 bg-[#0F0F0F] text-white font-medium rounded-xl hover:bg-black transition-colors"
                  >
                    <RollingText text="Accept Change" />
                  </button>
                </GradientBorder>
                <button
                  onClick={handleKeepRule}
                  className="flex-1 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors"
                >
                  <RollingText text="Keep Current Rule" />
                </button>
                <button
                  onClick={handleEditRule}
                  className="flex-1 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <RollingText text="Edit" />
                </button>
              </div>
            </motion.div>
          )}

          {/* EDITING STATE */}
          {state === "editing" && (
            <motion.div
              key="editing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back Button */}
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </motion.button>

              {/* Edit Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-8"
              >
                <div className="mb-6">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2 block">
                    EDIT RULE
                  </span>
                  <p className="text-sm text-gray-400 mb-6">
                    Modify the rule to better reflect your current strategy.
                  </p>
                </div>

                {/* Current Rule */}
                <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2 block">
                    CURRENT
                  </span>
                  <p className="text-base text-white">{rule.current}</p>
                </div>

                {/* Edit Input */}
                <div className="mb-8">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-blue-400 mb-2 block">
                    UPDATED RULE
                  </label>
                  <input
                    type="text"
                    value={editedRule}
                    onChange={(e) => setEditedRule(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-blue-500/50 outline-none transition-all"
                    placeholder="Enter updated rule..."
                  />
                </div>

                {/* Approve Button */}
                <GradientBorder
                  gradient="from-blue-500 via-blue-600 to-blue-500"
                  containerClassName="rounded-xl p-[1px] w-full"
                >
                  <button
                    onClick={handleAcceptChange}
                    className="w-full py-4 bg-[#0F0F0F] text-white font-medium rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <RollingText text="Approve Change" />
                  </button>
                </GradientBorder>
              </motion.div>
            </motion.div>
          )}

          {/* APPROVED STATE */}
          {state === "approved" && (
            <motion.div
              key="approved"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[#0A0A0A] border border-green-500/20 rounded-2xl p-8 md:p-12 mb-8"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>

                <span className="text-[10px] font-bold tracking-widest uppercase text-green-400 mb-4 block">
                  STRATEGY UPDATED
                </span>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Strategy v2
                </h3>
                <p className="text-lg text-white mb-4">{editedRule}</p>
                <p className="text-sm text-gray-400">Approved</p>
              </motion.div>

              {/* Send to LBES */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <GradientBorder
                  gradient="from-orange-500 via-red-500 to-orange-600"
                  containerClassName="rounded-xl p-[1px] inline-block"
                >
                  <button className="px-8 py-4 bg-[#0F0F0F] text-white font-medium rounded-xl hover:bg-black transition-colors flex items-center gap-3">
                    <Send className="w-4 h-4" />
                    <RollingText text="Send to LBES" />
                  </button>
                </GradientBorder>
                <p className="text-xs text-gray-500 mt-4 max-w-md mx-auto">
                  Need the updated strategy engineered into software? Send it back to LBES for implementation.
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* KEPT STATE */}
          {state === "kept" && (
            <motion.div
              key="kept"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 md:p-12 mb-8"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-gray-400" />
                </div>

                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4 block">
                  CURRENT STRATEGY KEPT
                </span>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {rule.current}
                </h3>
                <p className="text-sm text-gray-400 mt-4">
                  Your existing rule remains active for future comparisons.
                </p>
              </motion.div>

              {/* Continue Monitoring */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                  <Clock className="w-3 h-3 text-gray-500" />
                  <span className="text-[10px] font-bold tracking-wider uppercase text-gray-500">
                    Coming Soon
                  </span>
                </div>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Continuous monitoring will alert you when future trading diverges from your defined strategy.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-xs text-gray-600 max-w-lg mx-auto">
            Mirror helps you review differences between your defined strategy and actual trading.
            You decide whether a rule should change. Mirror does not provide trading recommendations.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
