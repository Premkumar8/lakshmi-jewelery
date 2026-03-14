import { Search, ShoppingBag, User, Menu, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const TAMIL_LABEL = "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD";

export default function Navbar() {
  const [lang, setLang] = useState<"EN" | "TM">("EN");

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button className="lg:hidden p-2 hover:bg-black/5 rounded-full transition-colors">
            <Menu size={20} />
          </button>
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/" className="text-[11px] uppercase tracking-[0.2em] font-medium hover:text-amber-600 transition-colors">Collections</Link>
            <Link to="/investment" className="text-[11px] uppercase tracking-[0.2em] font-medium hover:text-amber-600 transition-colors">Investment</Link>
            <a href="/#gold-exchange" className="text-[11px] uppercase tracking-[0.2em] font-medium hover:text-amber-600 transition-colors">Exchange</a>
            <a href="#" className="text-[11px] uppercase tracking-[0.2em] font-medium hover:text-amber-600 transition-colors">Gifting</a>
          </div>
        </div>

        <Link to="/" className="flex flex-col items-center">
          <h1 className="text-2xl font-serif tracking-tighter text-black">
            LAKSHMI <span className="text-amber-600 italic">JEWELERY</span>
          </h1>
          <span className="text-[8px] uppercase tracking-[0.4em] text-black/40 -mt-1">Excellence Since 1985</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-black/5 rounded-full p-1 mr-2">
            <button
              onClick={() => setLang("EN")}
              className={`px-3 py-1 text-[9px] font-bold rounded-full transition-all ${lang === "EN" ? "bg-white text-black shadow-sm" : "text-black/40 hover:text-black"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("TM")}
              className={`px-3 py-1 text-[9px] font-bold rounded-full transition-all ${lang === "TM" ? "bg-white text-black shadow-sm" : "text-black/40 hover:text-black"}`}
            >
              {TAMIL_LABEL}
            </button>
          </div>

          <button className="p-2 hover:bg-black/5 rounded-full transition-colors hidden sm:block">
            <Search size={20} />
          </button>
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <Heart size={20} />
          </button>
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <User size={20} />
          </button>
          <button className="p-2 bg-black text-white rounded-full hover:bg-black/80 transition-colors relative">
            <ShoppingBag size={18} />
            <span className="absolute -top-1 -right-1 bg-amber-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
