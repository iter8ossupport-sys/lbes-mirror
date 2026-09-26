import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, CheckCircle2, X, Link2, Clock } from "lucide-react";
import { GradientBorder } from "./ui/GradientBorder";
import { RollingText } from "./ui/RollingText";

interface FileInfo {
  name: string;
  size: string;
  tradeCount: number;
  dateRange: string;
}

export const TradingHistoryInput = () => {
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    // Simulate file processing
    const fakeTradeCount = Math.floor(Math.random() * 100) + 20;
    const fakeDateRange = "Sep 01 – Sep 30";
    
    setSelectedFile({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      tradeCount: fakeTradeCount,
      dateRange: fakeDateRange,
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".csv")) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
              YOUR TRADING HISTORY
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
          Now show us what actually happened.
        </motion.h2>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Upload your trading history and Mirror will compare it with the strategy you defined.
        </motion.p>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          {!selectedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={handleUploadClick}
              className={`relative flex flex-col items-center justify-center p-12 md:p-16 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
                isDragging
                  ? "bg-blue-500/10 border-blue-500/50"
                  : "bg-[#0A0A0A] border-white/10 hover:border-white/30 hover:bg-white/[0.02]"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleInputChange}
                className="hidden"
              />

              {/* Upload Icon */}
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>

              {/* Upload Text */}
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                Upload your trading history
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Drag and drop or choose a CSV
              </p>

              {/* File Type Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-300">CSV</span>
              </div>

              {/* Supported Fields */}
              <p className="text-xs text-gray-600 mt-6 text-center">
                Examples of useful fields:<br />
                <span className="text-gray-500">Date · Time · Symbol · Entry · Exit · Size</span>
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* File Selected Card */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Trading history ready
                      </h3>
                      <p className="text-sm text-gray-500">{selectedFile.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-500 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* File Stats */}
                <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Trades detected</p>
                    <p className="text-lg font-semibold text-white">{selectedFile.tradeCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Date range</p>
                    <p className="text-lg font-semibold text-white">{selectedFile.dateRange}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">File size</p>
                    <p className="text-lg font-semibold text-white">{selectedFile.size}</p>
                  </div>
                </div>
              </div>

              {/* Analyze Button */}
              <GradientBorder
                gradient="from-orange-500 via-red-500 to-orange-600"
                containerClassName="rounded-xl p-[1px] w-full"
              >
                <button className="w-full py-4 bg-[#0F0F0F] text-white font-medium rounded-xl hover:bg-black transition-colors relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <RollingText text="Analyze My Trading" />
                  </span>
                </button>
              </GradientBorder>
            </div>
          )}

          {/* Privacy Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xs text-gray-600 text-center mt-6 max-w-md mx-auto"
          >
            Mirror compares the strategy you provide with the trading history you upload.
          </motion.p>
        </motion.div>

        {/* Broker Connection - Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-2xl mx-auto mt-12"
        >
          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 opacity-60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    Connect Account
                  </h4>
                  <p className="text-xs text-gray-500">
                    MT4 · MT5 · cTrader
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-[10px] font-bold tracking-wider uppercase text-gray-500">
                  Coming Soon
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-4 pl-14">
              Read-only account connection for continuous trading history.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
