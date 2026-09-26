import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Upload, 
  BarChart3, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle,
  TrendingUp,
  Calendar,
  Layers,
  ChevronRight,
  Eye,
  RefreshCw,
  FileDown,
  Plus
} from "lucide-react";
import { GradientBorder } from "../components/ui/GradientBorder";
import { RollingText } from "../components/ui/RollingText";
import { cn } from "../lib/utils";

// Types
type AuditState = "aligned" | "diverged" | "unknown";
type DashboardState = "no_strategy" | "no_data" | "ready_to_analyze" | "audit_available" | "review_pending" | "strategy_updated";

interface Strategy {
  name: string;
  status: "approved" | "draft" | "pending";
  market: string;
  timeframe: string;
  rulesCount: number;
}

interface TradingData {
  dateRange: string;
  tradeCount: number;
  source: "csv" | "broker";
  status: "ready" | "processing" | "empty";
}

interface Audit {
  date: string;
  tradesAnalyzed: number;
  rulesChecked: number;
  aligned: number;
  needReview: number;
}

interface RuleFinding {
  rule: string;
  state: AuditState;
  evidence: string;
}

interface StrategyVersion {
  version: string;
  status: "current" | "previous";
  approvalStatus: "approved" | "pending";
  date: string;
}

// Demo Data
const demoStrategy: Strategy = {
  name: "London Breakout v1",
  status: "approved",
  market: "EURUSD",
  timeframe: "15m",
  rulesCount: 8
};

const demoTradingData: TradingData = {
  dateRange: "September 01 – September 30",
  tradeCount: 47,
  source: "csv",
  status: "ready"
};

const demoAudit: Audit = {
  date: "September 30",
  tradesAnalyzed: 47,
  rulesChecked: 8,
  aligned: 5,
  needReview: 3
};

const demoFindings: RuleFinding[] = [
  { rule: "London session", state: "aligned", evidence: "41 trades inside session" },
  { rule: "Maximum 2 trades/day", state: "diverged", evidence: "6 sessions exceeded limit" },
  { rule: "1% risk limit", state: "diverged", evidence: "5 trades above threshold" },
  { rule: "Confirmation condition", state: "unknown", evidence: "Data not available" }
];

const demoVersions: StrategyVersion[] = [
  { version: "v2", status: "current", approvalStatus: "approved", date: "September 30" },
  { version: "v1", status: "previous", approvalStatus: "approved", date: "August 10" }
];

// Components
const StateBadge = ({ state }: { state: AuditState }) => {
  const config = {
    aligned: {
      icon: CheckCircle2,
      label: "Aligned",
      className: "bg-green-500/10 border-green-500/30 text-green-400"
    },
    diverged: {
      icon: AlertTriangle,
      label: "Diverged",
      className: "bg-orange-500/10 border-orange-500/30 text-orange-400"
    },
    unknown: {
      icon: HelpCircle,
      label: "Unknown",
      className: "bg-gray-500/10 border-gray-500/30 text-gray-400"
    }
  };

  const { icon: Icon, label, className } = config[state];

  return (
    <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider", className)}>
      <Icon className="w-3 h-3" />
      <span>{label}</span>
    </div>
  );
};

const StatusBadge = ({ status, label }: { status: "approved" | "ready" | "pending" | "draft" | "empty" | "not_analyzed"; label?: string }) => {
  const config = {
    approved: "bg-green-500/10 border-green-500/30 text-green-400",
    ready: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    pending: "bg-orange-500/10 border-orange-500/30 text-orange-400",
    draft: "bg-gray-500/10 border-gray-500/30 text-gray-400",
    empty: "bg-gray-500/10 border-gray-500/30 text-gray-500",
    not_analyzed: "bg-gray-500/10 border-gray-500/30 text-gray-400"
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider", config[status])}>
      {status === "approved" && <CheckCircle2 className="w-3 h-3" />}
      {status === "ready" && <FileText className="w-3 h-3" />}
      {status === "pending" && <Clock className="w-3 h-3" />}
      <span>{label || status.replace("_", " ")}</span>
    </div>
  );
};

const Card = ({ 
  children, 
  className,
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={cn(
      "bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-8",
      className
    )}
  >
    {children}
  </motion.div>
);

const CardHeader = ({ 
  icon: Icon, 
  title, 
  badge 
}: { 
  icon: React.ElementType; 
  title: string;
  badge?: React.ReactNode;
}) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      <h3 className="text-sm font-bold tracking-wider uppercase text-gray-400">{title}</h3>
    </div>
    {badge}
  </div>
);

const StatRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-medium text-white">{value}</span>
  </div>
);

const ActionButton = ({ 
  children, 
  variant = "primary",
  onClick,
  className
}: { 
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  className?: string;
}) => {
  if (variant === "primary") {
    return (
      <GradientBorder
        gradient="from-orange-500 via-red-500 to-orange-600"
        containerClassName={cn("rounded-xl p-[1px] w-full", className)}
      >
        <button
          onClick={onClick}
          className="w-full py-3 bg-[#0F0F0F] text-white text-sm font-medium rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2"
        >
          {children}
        </button>
      </GradientBorder>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2",
        variant === "secondary"
          ? "bg-white/5 border border-white/10 text-white hover:bg-white/10"
          : "border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
      )}
    >
      {children}
    </button>
  );
};

// Main Dashboard Component
export const Dashboard = () => {
  const [dashboardState, setDashboardState] = useState<DashboardState>("audit_available");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setDashboardState("audit_available");
    }, 3000);
  };

  const getNextAction = () => {
    switch (dashboardState) {
      case "no_strategy":
        return {
          message: "Start with your strategy.",
          action: "IMPORT STRATEGY",
          icon: FileDown
        };
      case "no_data":
        return {
          message: "Now show us what actually happened.",
          action: "UPLOAD CSV",
          icon: Upload
        };
      case "ready_to_analyze":
        return {
          message: "Your data is ready to compare.",
          action: "ANALYZE MY TRADING",
          icon: BarChart3
        };
      case "audit_available":
        return {
          message: "Your latest audit is ready to review.",
          action: "VIEW AUDIT",
          icon: Eye
        };
      case "review_pending":
        return {
          message: "You have findings waiting for review.",
          action: "REVIEW FINDINGS",
          icon: AlertTriangle
        };
      case "strategy_updated":
        return {
          message: "Your strategy has a new version.",
          action: "VIEW STRATEGY V2",
          icon: Layers
        };
    }
  };

  const nextAction = getNextAction();

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">
              LBES MIRROR
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Your strategy, reflected in your trading.
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
            Compare your documented strategy with your actual trading history and review what the data shows.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Strategy Card */}
          <Card delay={0.1}>
            <CardHeader 
              icon={FileText} 
              title="Current Strategy"
              badge={<StatusBadge status="approved" />}
            />
            
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-white mb-2">{demoStrategy.name}</h4>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{demoStrategy.market}</span>
                <span>•</span>
                <span>{demoStrategy.timeframe}</span>
                <span>•</span>
                <span>{demoStrategy.rulesCount} rules</span>
              </div>
            </div>

            <ActionButton variant="outline">
              <Eye className="w-4 h-4" />
              <RollingText text="View Strategy" />
            </ActionButton>
          </Card>

          {/* Trading History Card */}
          <Card delay={0.2}>
            <CardHeader 
              icon={Upload} 
              title="Trading History"
              badge={<StatusBadge status="ready" />}
            />
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-400">{demoTradingData.dateRange}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-white font-medium">{demoTradingData.tradeCount} trades</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500 uppercase">{demoTradingData.source}</span>
              </div>
            </div>

            <ActionButton variant="outline">
              <Upload className="w-4 h-4" />
              <RollingText text="Upload New CSV" />
            </ActionButton>
          </Card>

          {/* Audit Status Card */}
          <Card delay={0.3}>
            <CardHeader 
              icon={BarChart3} 
              title="Strategy Audit"
              badge={dashboardState === "audit_available" ? <StatusBadge status="approved" label="Ready" /> : <StatusBadge status="not_analyzed" />}
            />
            
            {dashboardState === "audit_available" ? (
              <>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-400">Last audit: {demoAudit.date}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-2xl font-bold text-white">{demoAudit.tradesAnalyzed}</span>
                      <span className="text-xs text-gray-500 block">trades analyzed</span>
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-white">{demoAudit.rulesChecked}</span>
                      <span className="text-xs text-gray-500 block">rules checked</span>
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-green-400">{demoAudit.aligned}</span>
                      <span className="text-xs text-gray-500 block">aligned</span>
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-orange-400">{demoAudit.needReview}</span>
                      <span className="text-xs text-gray-500 block">need review</span>
                    </div>
                  </div>
                </div>

                <ActionButton variant="primary">
                  <Eye className="w-4 h-4" />
                  <RollingText text="View Audit" />
                </ActionButton>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-400 mb-6">
                  Your strategy and trading history are ready.
                </p>

                <ActionButton variant="primary" onClick={handleAnalyze}>
                  <BarChart3 className="w-4 h-4" />
                  <RollingText text="Analyze My Trading" />
                </ActionButton>
              </>
            )}
          </Card>
        </div>

        {/* Next Action Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={dashboardState}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-8" delay={0.4}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <nextAction.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">NEXT ACTION</p>
                    <p className="text-lg font-medium text-white">{nextAction.message}</p>
                  </div>
                </div>

                <GradientBorder
                  gradient="from-blue-500 via-blue-600 to-blue-500"
                  containerClassName="rounded-xl p-[1px] flex-shrink-0"
                >
                  <button className="px-8 py-3 bg-[#0F0F0F] text-white text-sm font-medium rounded-xl hover:bg-black transition-colors flex items-center gap-2">
                    <RollingText text={nextAction.action} />
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </GradientBorder>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Latest Audit Summary */}
        {dashboardState === "audit_available" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-white">Latest Audit</h2>
            </div>

            <Card>
              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-2xl md:text-3xl font-bold text-white block">{demoAudit.tradesAnalyzed}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Trades Analyzed</span>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-2xl md:text-3xl font-bold text-white block">{demoAudit.rulesChecked}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Rules Checked</span>
                </div>
                <div className="text-center p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                  <span className="text-2xl md:text-3xl font-bold text-green-400 block">{demoAudit.aligned}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Aligned</span>
                </div>
                <div className="text-center p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                  <span className="text-2xl md:text-3xl font-bold text-orange-400 block">{demoAudit.needReview}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Need Review</span>
                </div>
              </div>

              {/* Rule Findings */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold tracking-wider uppercase text-gray-500 mb-4">Rule Comparison</h4>
                {demoFindings.map((finding, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 gap-3"
                  >
                    <div className="flex items-center gap-4">
                      <StateBadge state={finding.state} />
                      <span className="text-sm font-medium text-white">{finding.rule}</span>
                    </div>
                    <span className="text-xs text-gray-500">{finding.evidence}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 flex justify-center">
                <ActionButton variant="secondary">
                  <Eye className="w-4 h-4" />
                  <RollingText text="View Full Audit" />
                </ActionButton>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Strategy History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Layers className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-white">Strategy History</h2>
          </div>

          <Card>
            <div className="space-y-4">
              {demoVersions.map((version, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold",
                      version.status === "current" 
                        ? "bg-blue-500/10 border border-blue-500/20 text-blue-400" 
                        : "bg-white/5 border border-white/10 text-gray-500"
                    )}>
                      {version.version}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white capitalize">{version.status}</span>
                        {version.approvalStatus === "approved" && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{version.date}</span>
                    </div>
                  </div>

                  <button className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Trust Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-gray-600 max-w-lg mx-auto">
            Mirror reports historical evidence from your strategy definition and available trading data.
            It does not provide trade signals, personalized investment recommendations, or guarantees of future performance.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

