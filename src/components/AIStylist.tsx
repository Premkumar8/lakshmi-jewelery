import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Send, X, Bot, User } from "lucide-react";

export default function AIStylist() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Namaste! I am your Lakshmi Jewelry Stylist. How can I help you find the perfect piece today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: "You are a luxury jewelry stylist for 'Lakshmi Jewelery'. You are polite, knowledgeable about gold, diamonds, and traditional Indian jewelry (like Temple jewelry). Provide styling advice, explain jewelry care, or help users choose pieces for occasions like weddings or festivals. You also know about our 'Old Gold Exchange' program, our 'Buy 10g Gold, Get 40g Silver' offer, and our current 'Akshaya Tritiya' celebration offer: 'Flat 25% OFF on making charges for all jewelry'. Keep responses concise and elegant.",
        }
      });

      const aiText = response.text || "I apologize, I'm having trouble connecting right now. Please try again later.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, I encountered an error. Please ensure your API key is configured." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-black text-amber-500 rounded-full shadow-2xl flex items-center justify-center group border border-amber-500/20"
      >
        <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">AI</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-28 right-8 z-50 w-[400px] h-[550px] bg-white rounded-3xl shadow-2xl border border-black/5 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-black text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                  <Bot size={20} className="text-black" />
                </div>
                <div>
                  <h3 className="font-serif text-lg leading-none mb-1">AI Stylist</h3>
                  <span className="text-[10px] uppercase tracking-widest text-amber-500/80 font-bold">Online Now</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#fdfbf7]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-black text-white rounded-tr-none' 
                      : 'bg-white text-black shadow-sm border border-black/5 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-black/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask for styling advice..."
                  className="w-full pl-6 pr-14 py-4 bg-[#fdfbf7] border border-black/5 rounded-full text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black text-amber-500 rounded-full flex items-center justify-center hover:bg-black/80 transition-all disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
