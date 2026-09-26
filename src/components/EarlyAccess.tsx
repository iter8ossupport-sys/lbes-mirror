import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle, Mail, User, HelpCircle, Eye } from "lucide-react";
import { GradientBorder } from "./ui/GradientBorder";
import { RollingText } from "./ui/RollingText";
import { cn } from "../lib/utils";
import { supabase } from "../lib/supabase";

interface FormData {
  email: string;
  name: string;
  isLbesUser: string;
}

interface ValidationCardProps {
  number: string;
  title: string;
  description: string;
  delay: number;
}

const ValidationCard = ({ number, title, description, delay }: ValidationCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col p-6 md:p-8 rounded-2xl border border-white/10 bg-[#0A0A0A] hover:border-white/20 transition-all duration-300"
  >
    <div className="flex items-start gap-4 mb-4">
      <span className="text-2xl md:text-3xl font-bold text-blue-400">{number}</span>
      <div className="flex-1">
        <h4 className="text-base md:text-lg font-semibold text-white mb-2">{title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

export const EarlyAccess = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    isLbesUser: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") setStatus("idle");
  };

  const handleLbesUserChange = (value: string) => {
    setFormData((prev) => ({ ...prev, isLbesUser: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail || !/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      // Trim name before saving
      const trimmedName = formData.name.trim();
      
      // Determine lbes_user value
      let lbesUserValue: boolean | null = null;
      if (formData.isLbesUser === "yes") {
        lbesUserValue = true;
      } else if (formData.isLbesUser === "no") {
        lbesUserValue = false;
      }

      // Insert into Supabase
      const { error } = await supabase
        .from('early_access')
        .insert([
          {
            email: trimmedEmail,
            name: trimmedName || null,
            lbes_user: lbesUserValue,
          }
        ]);

      if (error) {
        // Check for duplicate email (PostgreSQL unique constraint error)
        if (error.code === '23505' || error.message.includes('duplicate') || error.message.includes('already exists')) {
          setStatus("duplicate");
        } else {
          console.error('Supabase error:', error);
          setStatus("error");
          setErrorMessage("Something went wrong. Please try again in a moment.");
        }
        return;
      }

      // Success
      setStatus("success");
      setFormData({ email: "", name: "", isLbesUser: "" });
    } catch (err) {
      console.error('Submission error:', err);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again in a moment.");
    }
  };

  const validationItems = [
    {
      number: "01",
      title: "Strategy Audit",
      description: "Does comparing a defined strategy with real trading history reveal something the trader didn't already know?",
    },
    {
      number: "02",
      title: "Rule Comparison",
      description: "Which strategy rules can actually be measured reliably from trading data?",
    },
    {
      number: "03",
      title: "Strategy Refinement",
      description: "Does the evidence help traders understand when their trading changed relative to the strategy they defined?",
    },
  ];

  return (
    <section className="w-full py-24 md:py-32 px-6 relative z-20">
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {status !== "success" && status !== "duplicate" ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex justify-center mb-6"
              >
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5">
                  <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-400">
                    EARLY ACCESS
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
                Be one of the first 50 traders to use Mirror.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-400 text-base md:text-lg text-center max-w-2xl mx-auto mb-12 leading-relaxed"
              >
                We're building Mirror around one simple question: Are you actually trading the strategy you defined? Join the first group of traders helping us test the Strategy Audit, compare real trading history against defined rules, and shape what Mirror becomes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-xl mx-auto"
              >
                <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 md:p-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-white flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        disabled={status === "loading"}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:bg-black/60 outline-none transition-all disabled:opacity-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-white flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        Name <span className="text-xs text-gray-500 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        disabled={status === "loading"}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:bg-black/60 outline-none transition-all disabled:opacity-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-gray-500" />
                        LBES user? <span className="text-xs text-gray-500 font-normal">(optional)</span>
                      </label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => handleLbesUserChange("yes")}
                          disabled={status === "loading"}
                          className={cn(
                            "flex-1 py-3 rounded-xl border text-sm font-medium transition-all disabled:opacity-50",
                            formData.isLbesUser === "yes"
                              ? "bg-blue-500/10 border-blue-500/50 text-blue-400"
                              : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                          )}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => handleLbesUserChange("no")}
                          disabled={status === "loading"}
                          className={cn(
                            "flex-1 py-3 rounded-xl border text-sm font-medium transition-all disabled:opacity-50",
                            formData.isLbesUser === "no"
                              ? "bg-blue-500/10 border-blue-500/50 text-blue-400"
                              : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                          )}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <GradientBorder
                        gradient="from-orange-500 via-red-500 to-orange-600"
                        containerClassName="rounded-xl p-[1px] w-full"
                      >
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="w-full py-4 bg-[#0F0F0F] text-white font-medium rounded-xl hover:bg-black transition-colors relative overflow-hidden group flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span className="relative z-10">
                            {status === "loading" ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <RollingText text="Join Early Access" />
                            )}
                          </span>
                        </button>
                      </GradientBorder>
                    </div>

                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-500 text-sm justify-center"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errorMessage}
                      </motion.div>
                    )}

                    <p className="text-xs text-gray-500 text-center pt-2">
                      First 50 traders. Early access at launch. No payment required.
                    </p>
                  </form>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-xs text-gray-600 text-center mt-6"
                >
                  Built first with real trader feedback.
                </motion.p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 md:p-12 max-w-xl mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/5 border border-green-500/20 mb-6">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-green-400">
                    EARLY ACCESS REQUEST RECEIVED
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {status === "duplicate" ? "You're already on the list." : "You're on the list."}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {status === "duplicate" 
                    ? "We'll reach out when Mirror is ready for early access." 
                    : "We'll reach out when the first Mirror access opens."}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {status !== "success" && status !== "duplicate" && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-20"
            >
              <div className="text-center mb-10">
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">
                  WHAT EARLY USERS WILL HELP US TEST
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {validationItems.map((item, index) => (
                  <ValidationCard
                    key={index}
                    number={item.number}
                    title={item.title}
                    description={item.description}
                    delay={0.5 + index * 0.1}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-12 text-center"
            >
              <p className="text-xs text-gray-600 max-w-lg mx-auto mb-6">
                The first 50 traders are not joining a finished dashboard. They're helping us validate the core product with real strategy specifications and real trading history.
              </p>
            </motion.div>
          </>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-12 text-center"
        >
          <p className="text-[10px] text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Mirror provides historical analysis of your own trading data and documented strategy. It does not provide trade signals, personalized investment recommendations, or guarantees of future performance.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
