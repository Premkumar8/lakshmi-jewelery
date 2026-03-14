/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, ScrollRestoration } from "react-router-dom";
import Navbar from "./components/Navbar";
import OfferPopup from "./components/OfferPopup";
import Hero from "./components/Hero";
import RatesTicker from "./components/RatesTicker";
import Categories from "./components/Categories";
import ProductGrid from "./components/ProductGrid";
import InvestmentSection from "./components/InvestmentSection";
import GoldExchange from "./components/GoldExchange";
import Footer from "./components/Footer";
import ProductDetail from "./components/ProductDetail";
import InvestmentPage from "./components/InvestmentPage";
import { motion } from "motion/react";

function HomePage() {
  return (
    <>
      <Hero />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Categories />
      </motion.div>
      <ProductGrid title="Just Arrived" />
      <GoldExchange />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <InvestmentSection />
      </motion.div>
      <ProductGrid title="Best Sellers" />
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-white border-y border-black/5"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-amber-600 font-bold mb-4 block">Newsletter</span>
          <h2 className="text-4xl font-serif text-black mb-6">Join the Lakshmi Circle</h2>
          <p className="text-black/50 max-w-md mx-auto mb-10 leading-relaxed">
            Subscribe to receive exclusive offers, early access to new collections, and jewelry care tips.
          </p>
          <form className="max-w-md mx-auto flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 bg-[#fdfbf7] border border-black/5 rounded-full text-sm focus:outline-none focus:border-amber-600 transition-colors"
            />
            <button className="px-8 py-4 bg-black text-white text-sm uppercase tracking-widest font-bold rounded-full hover:bg-black/80 transition-all">
              Join
            </button>
          </form>
        </div>
      </motion.section>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white font-sans selection:bg-amber-100 selection:text-amber-900">
        <Routes>
          <Route path="/" element={
            <>
              <OfferPopup />
              <RatesTicker />
              <Navbar />
              <main><HomePage /></main>
              <Footer />
            </>
          } />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/investment" element={<InvestmentPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
