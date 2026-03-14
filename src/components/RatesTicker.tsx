import { motion } from "motion/react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { MetalRate } from "../types";

const rates: MetalRate[] = [
  { metal: "Gold", purity: "24K", rate: 7250, change: 1.2 },
  { metal: "Gold", purity: "22K", rate: 6650, change: -0.5 },
  { metal: "Silver", purity: "999", rate: 92, change: 0.8 },
  { metal: "Platinum", purity: "950", rate: 3200, change: 0.2 },
];

export default function RatesTicker() {
  return (
    <div className="bg-[#1a1a1a] text-white py-2 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-medium text-white/50">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Market Rates
        </div>
        <div className="flex gap-8 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[...rates, ...rates].map((rate, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-[11px] font-semibold tracking-wider">
                  {rate.metal} {rate.purity}
                </span>
                <span className="text-[11px] font-mono">₹{rate.rate.toLocaleString()}/gm</span>
                <span className={`flex items-center gap-1 text-[10px] ${rate.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {rate.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {Math.abs(rate.change)}%
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
