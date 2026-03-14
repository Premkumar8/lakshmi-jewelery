import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  TrendingUp, 
  Calculator, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Wallet,
  CreditCard,
  UserCheck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RatesTicker from "./RatesTicker";
import { useState } from "react";

export default function InvestmentPage() {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const tenure = 11; // Standard 11 month scheme

  const totalInvestment = monthlyAmount * tenure;
  const bonusAmount = monthlyAmount; // 1 month bonus
  const totalValue = totalInvestment + bonusAmount;

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      <RatesTicker />
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 bg-[#151619] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=2000" 
            alt="Gold Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[12px] uppercase tracking-[0.4em] text-amber-500 font-bold mb-6 block"
            >
              Smart Savings
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-serif leading-tight mb-8"
            >
              Invest in <span className="italic text-amber-500">Gold</span>,<br />
              Pay in <span className="italic text-amber-500">EMI</span>.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-xl leading-relaxed mb-12"
            >
              Our Swarna Lakshmi Monthly Savings Scheme helps you plan for your dream jewelry with ease. Small monthly contributions, massive rewards.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button className="px-10 py-4 bg-amber-500 text-black text-sm uppercase tracking-widest font-bold rounded-full hover:bg-amber-400 transition-all">
                Join Scheme
              </button>
              <button className="px-10 py-4 border border-white/20 text-white text-sm uppercase tracking-widest font-bold rounded-full hover:bg-white/10 transition-all">
                Download Brochure
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="py-24 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-black/5">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-20 bg-[#fdfbf7]">
                <div className="flex items-center gap-3 mb-8">
                  <Calculator className="text-amber-600" size={24} />
                  <h2 className="text-3xl font-serif">EMI Calculator</h2>
                </div>
                
                <div className="space-y-12">
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-sm uppercase tracking-widest font-bold text-black/40">Monthly Contribution</label>
                      <span className="text-xl font-mono font-bold">₹{monthlyAmount.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      min="1000" 
                      max="100000" 
                      step="1000"
                      value={monthlyAmount}
                      onChange={(e) => setMonthlyAmount(parseInt(e.target.value))}
                      className="w-full h-2 bg-black/5 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                    <div className="flex justify-between mt-2 text-[10px] uppercase tracking-widest font-bold text-black/20">
                      <span>₹1,000</span>
                      <span>₹1,00,000</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="p-6 bg-white rounded-2xl border border-black/5">
                      <div className="text-[10px] uppercase tracking-widest text-black/40 mb-2">Scheme Tenure</div>
                      <div className="text-2xl font-serif">11 Months</div>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-black/5">
                      <div className="text-[10px] uppercase tracking-widest text-black/40 mb-2">Bonus Reward</div>
                      <div className="text-2xl font-serif text-emerald-600">1 Month Free</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-12 lg:p-20 bg-black text-white flex flex-col justify-center">
                <div className="space-y-8">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Total You Pay</div>
                    <div className="text-5xl font-mono font-bold">₹{totalInvestment.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-4 py-6 border-y border-white/10">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40">Lakshmi Bonus</div>
                      <div className="text-xl font-bold">+ ₹{bonusAmount.toLocaleString()}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-amber-500 mb-2">Total Maturity Value</div>
                    <div className="text-6xl font-mono font-bold text-amber-500">₹{totalValue.toLocaleString()}</div>
                  </div>
                  <p className="text-white/40 text-sm italic">
                    * Maturity value can be redeemed for any jewelry at our stores or online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-[11px] uppercase tracking-[0.3em] text-amber-600 font-bold mb-4 block">Hassle Free</span>
            <h2 className="text-4xl font-serif">Required Documents</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: UserCheck, title: "Identity Proof", docs: ["Aadhar Card", "PAN Card", "Voter ID"] },
              { icon: FileText, title: "Address Proof", docs: ["Utility Bills", "Rental Agreement", "Passport"] },
              { icon: CreditCard, title: "Bank Details", docs: ["Cancelled Cheque", "Passbook Front Page"] },
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-10 bg-[#fdfbf7] rounded-3xl border border-black/5 hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-all">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-serif mb-6">{item.title}</h3>
                <ul className="space-y-4">
                  {item.docs.map(doc => (
                    <li key={doc} className="flex items-center gap-3 text-black/60">
                      <CheckCircle2 size={16} className="text-amber-600" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-24 bg-[#fdfbf7]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Jewelry Workshop" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-amber-500 rounded-full flex flex-col items-center justify-center text-black p-8 text-center shadow-2xl">
                <span className="text-4xl font-serif font-bold">100%</span>
                <span className="text-[10px] uppercase tracking-widest font-bold">Transparency Guaranteed</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-amber-600 font-bold mb-4 block">Why Choose Us</span>
              <h2 className="text-5xl font-serif mb-12 leading-tight">Benefits of Swarna Lakshmi Scheme</h2>
              
              <div className="space-y-10">
                {[
                  { icon: Wallet, title: "Affordable Savings", desc: "Start with as low as ₹1,000 per month and build your gold corpus." },
                  { icon: Clock, title: "Flexible Payments", desc: "Pay via UPI, Net Banking, or visit any of our stores." },
                  { icon: ShieldCheck, title: "Price Protection", desc: "Lock in gold rates and protect yourself from market fluctuations." },
                ].map((benefit) => (
                  <div key={benefit.title} className="flex gap-6">
                    <div className="w-14 h-14 rounded-full bg-white border border-black/5 flex items-center justify-center shrink-0">
                      <benefit.icon className="text-amber-600" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-serif mb-2">{benefit.title}</h4>
                      <p className="text-black/50 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-16 px-10 py-5 bg-black text-white text-sm uppercase tracking-widest font-bold rounded-full hover:bg-black/80 transition-all flex items-center gap-3">
                Enroll Now <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-[0.3em] text-amber-600 font-bold mb-4 block">Social Proof</span>
            <h2 className="text-4xl font-serif">What Our Investors Say</h2>
          </div>

          <div className="relative">
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <TestimonialCarousel />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function TestimonialCarousel() {
  const testimonials = [
    {
      quote: "The Swarna Lakshmi scheme made it so easy for me to buy my daughter's wedding jewelry. The bonus month is a fantastic reward!",
      author: "Priya Sharma",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "I've been investing for 3 years now. The transparency and gold price protection give me peace of mind. Highly recommended for long-term savings.",
      author: "Rajesh Iyer",
      location: "Chennai",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "Starting with just ₹2,000 a month, I never felt the burden. Today I own a beautiful diamond set thanks to this brilliant monthly plan.",
      author: "Ananya Gupta",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="relative px-12">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "anticipate" }}
            className="text-center py-12"
          >
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-500 p-1">
                <img 
                  src={testimonials[activeIdx].image} 
                  alt={testimonials[activeIdx].author} 
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-serif italic text-black/80 leading-relaxed mb-8 max-w-2xl mx-auto">
              "{testimonials[activeIdx].quote}"
            </p>
            <div>
              <div className="font-bold text-lg">{testimonials[activeIdx].author}</div>
              <div className="text-sm uppercase tracking-widest text-amber-600 font-medium">{testimonials[activeIdx].location}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIdx === idx ? 'w-8 bg-amber-600' : 'bg-black/10 hover:bg-black/20'}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={() => setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        onClick={() => setActiveIdx((prev) => (prev + 1) % testimonials.length)}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
