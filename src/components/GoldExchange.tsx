import { motion } from "motion/react";
import { RefreshCw, Scale, ShieldCheck, Coins, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: Scale,
    title: "Transparent Valuation",
    desc: "Advanced Karatmeter testing ensures 100% accuracy in purity check."
  },
  {
    icon: Coins,
    title: "Best Market Price",
    desc: "Get the highest value for your old gold based on live market rates."
  },
  {
    icon: ShieldCheck,
    title: "Zero Deduction",
    desc: "Full value exchange for your gold with no hidden melting charges."
  },
  {
    icon: RefreshCw,
    title: "Instant Upgrade",
    desc: "Walk in with old gold, walk out with stunning new designs instantly."
  }
];

export default function GoldExchange() {
  return (
    <section id="gold-exchange" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-[11px] uppercase tracking-[0.3em] text-amber-600 font-bold mb-4 block">Exchange Program</span>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight mb-8 text-black">
              Renew Your <span className="italic text-amber-600">Heritage</span>.
            </h2>
            <p className="text-black/60 text-lg mb-12 leading-relaxed max-w-lg">
              Give your old jewelry a new life. Replace your old gold with our latest collections at the best market price, guaranteed.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                    <benefit.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-2">{benefit.title}</h4>
                    <p className="text-sm text-black/40 leading-relaxed">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="mt-16 px-10 py-5 bg-black text-white text-sm uppercase tracking-widest font-bold rounded-full hover:bg-black/80 transition-all flex items-center gap-3 group">
              Check Exchange Value
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=1000"
                alt="Gold Exchange"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-amber-500 p-8 rounded-full w-48 h-48 flex flex-col items-center justify-center text-center shadow-2xl border-4 border-white"
            >
              <span className="text-3xl font-serif font-bold text-black">100%</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-black/80">Value Realization</span>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-100 rounded-full -z-10 blur-2xl opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
