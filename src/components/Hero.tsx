import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    subtitle: "The Heritage Collection",
    title: "Timeless",
    titleAccent: "Elegance",
    desc: "Discover our curated selection of handcrafted masterpieces, where tradition meets contemporary design.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000",
    cta: "Explore Gold",
    secondaryCta: "Diamond Guide",
    accentColor: "text-amber-400"
  },
  {
    id: 2,
    subtitle: "Exclusive Festival Offer",
    title: "Pure Gold",
    titleAccent: "Pure Silver",
    desc: "Celebrate the season with our special offer. Buy 10g of 24K Gold and receive 40g of Pure Silver absolutely free.",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=2000",
    cta: "Claim Offer",
    secondaryCta: "View Rates",
    accentColor: "text-emerald-400"
  },
  {
    id: 3,
    subtitle: "Bridal Season 2024",
    title: "Royal",
    titleAccent: "Weddings",
    desc: "Exquisite temple jewelry crafted for the modern bride. Make your special day truly unforgettable.",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=2000",
    cta: "Bridal Catalog",
    secondaryCta: "Book Appointment",
    accentColor: "text-rose-400"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[85vh] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover opacity-70"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="text-[12px] uppercase tracking-[0.3em] text-white/80 font-semibold mb-4 block">
              {slides[current].subtitle}
            </span>
            <h2 className="text-6xl md:text-8xl font-serif text-white leading-[0.9] mb-8">
              {slides[current].title} <br />
              <span className={`italic ${slides[current].accentColor}`}>{slides[current].titleAccent}</span>
            </h2>
            <p className="text-lg text-white/90 mb-10 max-w-md font-light leading-relaxed">
              {slides[current].desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white text-black text-sm uppercase tracking-widest font-semibold hover:bg-amber-400 transition-all flex items-center gap-2 group">
                {slides[current].cta}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-white/30 text-white text-sm uppercase tracking-widest font-semibold hover:bg-white/10 transition-all">
                {slides[current].secondaryCta}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 left-4 right-4 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-1 transition-all duration-500 rounded-full ${current === idx ? 'w-12 bg-amber-500' : 'w-4 bg-white/20'}`}
            />
          ))}
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={prev}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
