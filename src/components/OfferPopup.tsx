import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles } from "lucide-react";

export default function OfferPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500); // Show after 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-8 left-8 z-[100] max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-amber-100 p-6 relative overflow-hidden group">
            {/* Decorative background */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-50 rounded-full group-hover:scale-150 transition-transform duration-700" />
            
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors z-20"
              aria-label="Close offer"
            >
              <X size={18} className="text-black/60" />
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white">
                  <Sparkles size={16} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-600">Special Offer</span>
              </div>

              <h3 className="text-xl font-serif text-black mb-2">Akshaya Tritiya <br /><span className="italic text-amber-600">Celebrations</span></h3>
              
              <p className="text-sm text-black/60 mb-6 leading-relaxed">
                Book your gold today and get <span className="font-bold text-black">Flat 25% OFF</span> on making charges for all jewelry.
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-black/30">Valid Until</span>
                  <span className="text-xs font-bold text-black">May 15, 2024</span>
                </div>
                <button className="px-6 py-2 bg-black text-white text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-black/80 transition-all">
                  Claim Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
