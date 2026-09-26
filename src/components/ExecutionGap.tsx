import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const GapCard = ({ 
  label, 
  title, 
  items, 
  supportingLine,
  index,
  isHighlighted 
}: { 
  label: string;
  title: string;
  items: string[];
  supportingLine: string;
  index: number;
  isHighlighted?: boolean;
}) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    className={`relative flex flex-col p-6 md:p-8 rounded-2xl border transition-all duration-300 h-full ${
      isHighlighted 
        ? "bg-[#0A0A0A] border-blue-500/30 hover:border-blue-500/50" 
        : "bg-[#0A0A0A] border-white/10 hover:border-white/20"
    }`}
  >
    {/* Label */}
    <div className="mb-4">
      <span className={`text-[10px] md:text-xs font-bold tracking-widest uppercase ${
        isHighlighted ? "text-blue-400" : "text-gray-500"
      }`}>
        {label}
      </span>
    </div>

    {/* Title */}
    <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
      {title}
    </h3>

    {/* Items List */}
    <ul className="space-y-2 mb-6 flex-grow">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
          <span className="text-gray-600 mt-1">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>

    {/* Supporting Line */}
    <p className="text-xs text-gray-500 pt-4 border-t border-white/5">
      {supportingLine}
    </p>

    {/* Subtle glow for highlighted card */}
    {isHighlighted && (
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-2xl pointer-events-none" />
    )}
  </motion.div>
);

const ArrowDown = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 }}
    className="hidden md:flex items-center justify-center py-2"
  >
    <div className="flex flex-col items-center">
      <div className="w-px h-6 bg-gradient-to-b from-white/20 to-transparent" />
      <div className="w-2 h-2 rotate-45 border-r border-b border-white/20 mt-[-4px]" />
    </div>
  </motion.div>
);

export const ExecutionGap = () => {
  const cards = [
    {
      label: "What I Defined",
      title: "My strategy",
      items: [
        "Entry conditions",
        "Risk rules",
        "Sessions",
        "Trade limits",
        "Exceptions"
      ],
      supportingLine: "The rules I believe I am following."
    },
    {
      label: "What I Actually Did",
      title: "My trading history",
      items: [
        "Entries",
        "Position size",
        "Timing",
        "Exits",
        "Frequency"
      ],
      supportingLine: "What my recorded trading actually shows."
    },
    {
      label: "What I Couldn't See",
      title: "The difference",
      items: [
        "Rules followed",
        "Rules missed",
        "Changes over time",
        "Not enough evidence"
      ],
      supportingLine: "The gap between the two."
    }
  ];

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
              THE EXECUTION GAP
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
          Your strategy is not the same thing as your trading.
        </motion.h2>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          You can know your rules and still trade differently from them. A normal trade history shows what happened. It does not automatically show how closely those trades matched the strategy you said you were following.
        </motion.p>

        {/* Cards Grid */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
          {/* Card 1 */}
          <div className="flex-1">
            <GapCard
              label={cards[0].label}
              title={cards[0].title}
              items={cards[0].items}
              supportingLine={cards[0].supportingLine}
              index={0}
            />
            <ArrowDown />
          </div>

          {/* Card 2 */}
          <div className="flex-1">
            <GapCard
              label={cards[1].label}
              title={cards[1].title}
              items={cards[1].items}
              supportingLine={cards[1].supportingLine}
              index={1}
            />
            <ArrowDown />
          </div>

          {/* Card 3 - Highlighted */}
          <div className="flex-1">
            <GapCard
              label={cards[2].label}
              title={cards[2].title}
              items={cards[2].items}
              supportingLine={cards[2].supportingLine}
              index={2}
              isHighlighted
            />
          </div>
        </div>

        {/* Final Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-gray-300 text-base md:text-lg mt-12 md:mt-16"
        >
          That's the gap LBES Mirror is built to show.
        </motion.p>
      </div>
    </section>
  );
};
