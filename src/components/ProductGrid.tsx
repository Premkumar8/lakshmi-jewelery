import { motion } from "motion/react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../constants";

const CURRENCY_SYMBOL = "\u20B9";

export default function ProductGrid({ title }: { title: string }) {
  return (
    <section className="py-24 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex items-center justify-between mb-12"
        >
          <h2 className="text-3xl font-serif text-black">{title}</h2>
          <button className="text-[11px] uppercase tracking-widest font-bold text-amber-600 border-b border-amber-600 pb-1 hover:text-amber-700 transition-colors">
            View All
          </button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative aspect-square bg-white rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-amber-50 transition-colors" onClick={(e) => e.preventDefault()}>
                      <Heart size={18} className="text-black" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-amber-50 transition-colors" onClick={(e) => e.preventDefault()}>
                      <ShoppingBag size={18} className="text-black" />
                    </button>
                  </div>
                  {product.weight && (
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full">
                      <span className="text-[10px] text-white font-medium tracking-wider">{product.weight}</span>
                    </div>
                  )}
                </div>
              </Link>

              <div className="px-2">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className={i < Math.floor(product.rating || 0) ? "fill-amber-400 text-amber-400" : "text-gray-300"} />
                  ))}
                  <span className="text-[10px] text-black/40 ml-1">({product.rating})</span>
                </div>
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-serif text-black mb-1 group-hover:text-amber-600 transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-mono font-medium">{CURRENCY_SYMBOL}{product.price.toLocaleString()}</span>
                  <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold">{product.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
