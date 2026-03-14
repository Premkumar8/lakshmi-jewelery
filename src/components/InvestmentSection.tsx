import { motion } from "motion/react";
import { ShieldCheck, Zap, TrendingUp, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Zap, title: "Quick Buy", desc: "Buy digital gold in 3 clicks. Start with just ₹10." },
  { icon: TrendingUp, title: "SIP Plans", desc: "Automated monthly savings in 24K pure gold." },
  { icon: ShieldCheck, title: "100% Secure", desc: "Stored in insured, world-class vaults." },
  { icon: Smartphone, title: "Live Tracking", desc: "Monitor your gold portfolio in real-time." },
];

export default function InvestmentSection() {
  return (
    <section className="py-24 bg-[#151619] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-amber-500 font-bold mb-4 block">Future Proof</span>
            <h2 className="text-5xl font-serif leading-tight mb-8">
              Invest in <span className="italic text-amber-500">Digital Gold</span> <br />
              Secure Your Future.
            </h2>
            <p className="text-white/60 text-lg mb-12 max-w-lg leading-relaxed">
              Experience the modern way of saving. Buy, sell, or redeem your gold for physical jewelry anytime, anywhere.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((f, idx) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <f.icon className="text-amber-500" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{f.title}</h4>
                    <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link to="/investment">
              <button className="mt-12 px-10 py-4 bg-amber-500 text-black text-sm uppercase tracking-widest font-bold hover:bg-amber-400 transition-all rounded-full">
                Start Investing Now
              </button>
            </Link>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 relative">
              <img
                src="https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=800"
                alt="Digital Gold Investment"
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151619] via-transparent to-transparent" />
              
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-white/60">Portfolio Value</span>
                  <TrendingUp size={16} className="text-emerald-400" />
                </div>
                <div className="text-3xl font-mono font-bold mb-2">₹4,25,800</div>
                <div className="text-[10px] text-emerald-400 font-bold">+12.4% this month</div>
                <div className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-amber-500"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
