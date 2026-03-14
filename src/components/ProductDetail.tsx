import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { PRODUCTS } from "../constants";
import { ArrowLeft, ShoppingBag, Heart, Share2, Shield, Truck, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RatesTicker from "./RatesTicker";
import { useState } from "react";

const CURRENCY_SYMBOL = "\u20B9";

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((item) => item.id === id);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
          <Link to="/" className="text-amber-600 underline">Return Home</Link>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

  const nextImage = () => setActiveImageIdx((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      <RatesTicker />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12 lg:py-24">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-black/40 hover:text-black mb-12 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-6">
            <div className="relative group">
              <motion.div
                key={activeImageIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative"
              >
                <img
                  src={images[activeImageIdx]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.preventDefault(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-black hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => { e.preventDefault(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-black hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-black/5 hidden md:block z-10"
              >
                <div className="text-[10px] uppercase tracking-widest text-black/40 mb-2">Certified Purity</div>
                <div className="flex items-center gap-2">
                  <Shield size={20} className="text-amber-600" />
                  <span className="font-serif text-lg">BIS Hallmarked</span>
                </div>
              </motion.div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-24 aspect-square rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImageIdx === idx ? "border-amber-600" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-[12px] uppercase tracking-[0.4em] text-amber-600 font-bold mb-4 block">
                {product.category} Collection
              </span>
              <h1 className="text-5xl md:text-7xl font-serif text-black leading-tight mb-6">
                {product.name}
              </h1>

              <div className="flex items-center gap-6 mb-10">
                <span className="text-4xl font-mono font-medium">{CURRENCY_SYMBOL}{product.price.toLocaleString()}</span>
                <div className="h-8 w-[1px] bg-black/10" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-black/40">Weight</span>
                  <span className="font-bold">{product.weight}</span>
                </div>
              </div>

              <p className="text-black/60 text-lg leading-relaxed mb-12 max-w-lg">
                Exquisitely crafted with precision and passion. This masterpiece from our {product.category} collection embodies the perfect blend of traditional heritage and modern sophistication.
              </p>

              <div className="flex flex-col gap-4 mb-12">
                <button className="w-full py-5 bg-black text-white text-sm uppercase tracking-[0.2em] font-bold rounded-full hover:bg-black/80 transition-all flex items-center justify-center gap-3 group">
                  <ShoppingBag size={18} />
                  Add to Shopping Bag
                  <div className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300">
                    <ArrowLeft className="rotate-180" size={16} />
                  </div>
                </button>
                <div className="flex gap-4">
                  <button className="flex-1 py-4 border border-black/10 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2">
                    <Heart size={18} />
                    Wishlist
                  </button>
                  <button className="w-14 h-14 border border-black/10 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-12 border-t border-black/5">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                    <Truck size={20} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                    <RotateCcw size={20} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold">15 Day Returns</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                    <Shield size={20} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Lifetime Buyback</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
