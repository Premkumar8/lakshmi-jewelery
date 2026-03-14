import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Mail, 
  Settings, 
  TrendingUp, 
  TrendingDown, 
  Send, 
  Search, 
  Plus, 
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Sparkles
} from "lucide-react";
import { 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  Timestamp, 
  where 
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { GoogleGenAI } from "@google/genai";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell
} from "recharts";

// Types
interface Sale {
  id: string;
  customerName: string;
  totalAmount: number;
  date: string;
  status: string;
}

interface Purchase {
  id: string;
  vendorName: string;
  totalAmount: number;
  date: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpent: number;
}

interface SentMail {
  id: string;
  customerEmail: string;
  subject: string;
  sentAt: string;
  status: string;
}

const MOCK_SALES: Sale[] = [
  { id: "s1", customerName: "Ramesh Kumar", totalAmount: 125000, date: new Date().toISOString(), status: "completed" },
  { id: "s2", customerName: "Priya Sharma", totalAmount: 85000, date: new Date().toISOString(), status: "pending" },
  { id: "s3", customerName: "Anjali Devi", totalAmount: 210000, date: new Date().toISOString(), status: "completed" },
  { id: "s4", customerName: "Suresh Raina", totalAmount: 45000, date: new Date(Date.now() - 86400000).toISOString(), status: "completed" },
  { id: "s5", customerName: "M.S. Dhoni", totalAmount: 320000, date: new Date(Date.now() - 172800000).toISOString(), status: "completed" },
];

const MOCK_PURCHASES: Purchase[] = [
  { id: "p1", vendorName: "MMTC-PAMP", totalAmount: 1500000, date: new Date().toISOString() },
  { id: "p2", vendorName: "Brinks Global", totalAmount: 450000, date: new Date().toISOString() },
  { id: "p3", vendorName: "Bullion India", totalAmount: 250000, date: new Date(Date.now() - 86400000).toISOString() },
];

const MOCK_CUSTOMERS: Customer[] = [
  { id: "c1", name: "Ramesh Kumar", email: "ramesh@example.com", phone: "9840012345", totalSpent: 125000 },
  { id: "c2", name: "Priya Sharma", email: "priya@example.com", phone: "9840054321", totalSpent: 85000 },
  { id: "c3", name: "Anjali Devi", email: "anjali@example.com", phone: "9840099999", totalSpent: 210000 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [reportTimeFrame, setReportTimeFrame] = useState<"day" | "month" | "year">("month");
  const [sales, setSales] = useState<Sale[]>(MOCK_SALES);
  const [purchases, setPurchases] = useState<Purchase[]>(MOCK_PURCHASES);
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [mails, setMails] = useState<SentMail[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Calculate P&L data based on time frame
  const getPnLData = () => {
    const now = new Date();
    let filteredSales = sales;
    let filteredPurchases = purchases;
    let timeSeries: { name: string; revenue: number; expenses: number; profit: number }[] = [];

    if (reportTimeFrame === "day") {
      const today = now.toISOString().split('T')[0];
      filteredSales = sales.filter(s => s.date.startsWith(today));
      filteredPurchases = purchases.filter(p => p.date.startsWith(today));
      
      // Mock hourly data for day
      for (let i = 0; i < 24; i += 4) {
        const hour = `${i}:00`;
        const s = filteredSales.filter(sale => new Date(sale.date).getHours() >= i && new Date(sale.date).getHours() < i + 4).reduce((a, b) => a + b.totalAmount, 0);
        const p = filteredPurchases.filter(pur => new Date(pur.date).getHours() >= i && new Date(pur.date).getHours() < i + 4).reduce((a, b) => a + b.totalAmount, 0);
        timeSeries.push({ name: hour, revenue: s, expenses: p, profit: s - p });
      }
    } else if (reportTimeFrame === "month") {
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      filteredSales = sales.filter(s => {
        const d = new Date(s.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      });
      filteredPurchases = purchases.filter(p => {
        const d = new Date(p.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      });

      // Mock weekly data for month
      for (let i = 1; i <= 4; i++) {
        const week = `Week ${i}`;
        const s = filteredSales.filter((_, idx) => (idx % 4) + 1 === i).reduce((a, b) => a + b.totalAmount, 0);
        const p = filteredPurchases.filter((_, idx) => (idx % 4) + 1 === i).reduce((a, b) => a + b.totalAmount, 0);
        timeSeries.push({ name: week, revenue: s, expenses: p, profit: s - p });
      }
    } else if (reportTimeFrame === "year") {
      const currentYear = now.getFullYear();
      filteredSales = sales.filter(s => new Date(s.date).getFullYear() === currentYear);
      filteredPurchases = purchases.filter(p => new Date(p.date).getFullYear() === currentYear);

      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      months.forEach((month, idx) => {
        const s = filteredSales.filter(sale => new Date(sale.date).getMonth() === idx).reduce((a, b) => a + b.totalAmount, 0);
        const p = filteredPurchases.filter(pur => new Date(pur.date).getMonth() === idx).reduce((a, b) => a + b.totalAmount, 0);
        timeSeries.push({ name: month, revenue: s, expenses: p, profit: s - p });
      });
    }

    const totalRevenue = filteredSales.reduce((acc, s) => acc + s.totalAmount, 0);
    const totalExpenses = filteredPurchases.reduce((acc, p) => acc + p.totalAmount, 0);
    const netProfit = totalRevenue - totalExpenses;

    return {
      revenue: totalRevenue,
      expenses: totalExpenses,
      profit: netProfit,
      timeSeries
    };
  };

  const pnl = getPnLData();

  const seedData = async () => {
    try {
      const salesRef = collection(db, "sales");
      const customersRef = collection(db, "customers");
      const purchasesRef = collection(db, "purchases");
      const mailsRef = collection(db, "mails");

      await addDoc(salesRef, { customerName: "John Doe", totalAmount: 45000, date: new Date().toISOString(), status: "completed" });
      await addDoc(salesRef, { customerName: "Jane Smith", totalAmount: 12000, date: new Date().toISOString(), status: "pending" });
      await addDoc(salesRef, { customerName: "Rahul Dravid", totalAmount: 85000, date: new Date(Date.now() - 86400000).toISOString(), status: "completed" });
      await addDoc(salesRef, { customerName: "Virat Kohli", totalAmount: 150000, date: new Date(Date.now() - 172800000).toISOString(), status: "completed" });
      
      await addDoc(customersRef, { name: "John Doe", email: "john@example.com", phone: "9876543210", totalSpent: 45000 });
      
      await addDoc(purchasesRef, { vendorName: "Gold Bullion Co", totalAmount: 500000, date: new Date().toISOString() });
      await addDoc(purchasesRef, { vendorName: "MMTC", totalAmount: 200000, date: new Date(Date.now() - 86400000).toISOString() });
      await addDoc(mailsRef, { customerEmail: "john@example.com", subject: "Welcome to Lakshmi Jewelery", sentAt: new Date().toISOString(), status: "sent" });
      
      alert("Data seeded successfully! Please refresh or switch tabs.");
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  };

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesSnap = await getDocs(query(collection(db, "sales"), orderBy("date", "desc"), limit(10)));
        const purchasesSnap = await getDocs(query(collection(db, "purchases"), orderBy("date", "desc"), limit(10)));
        const customersSnap = await getDocs(query(collection(db, "customers"), limit(10)));
        const mailsSnap = await getDocs(query(collection(db, "mails"), orderBy("sentAt", "desc"), limit(10)));

        setSales(salesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Sale)));
        setPurchases(purchasesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Purchase)));
        setCustomers(customersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Customer)));
        setMails(mailsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as SentMail)));
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // AI Insight Generator
  const generateAiInsight = async () => {
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this business data for Lakshmi Jewelery:
          Sales Total: ₹${sales.reduce((acc, s) => acc + s.totalAmount, 0)}
          Purchases Total: ₹${purchases.reduce((acc, p) => acc + p.totalAmount, 0)}
          Customers: ${customers.length}
          Provide a brief, professional profit/loss insight and one strategic recommendation.`,
      });
      setAiInsight(response.text);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const SidebarItem = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-6 py-4 transition-all ${
        activeTab === id 
          ? "bg-amber-500 text-black font-bold" 
          : "text-white/60 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon size={20} />
      <span className="text-sm uppercase tracking-widest">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col">
        <div className="p-8 border-b border-white/10">
          <h1 className="text-xl font-serif tracking-tighter">
            LAKSHMI <span className="text-amber-500 italic">ADMIN</span>
          </h1>
        </div>
        <nav className="flex-1 py-8">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem id="sales" icon={ShoppingCart} label="Sales" />
          <SidebarItem id="purchases" icon={Package} label="Purchases" />
          <SidebarItem id="customers" icon={Users} label="Customers" />
          <SidebarItem id="reports" icon={BarChart3} label="P&L Reports" />
          <SidebarItem id="mails" icon={Mail} label="Mail Center" />
        </nav>
        <div className="p-8 border-t border-white/10">
          <SidebarItem id="settings" icon={Settings} label="Settings" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-serif mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className="text-white/40 text-sm">Welcome back, Admin</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={seedData}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              <Plus size={18} className="text-amber-500" />
              <span className="text-xs uppercase tracking-widest font-bold">Seed Data</span>
            </button>
            <button 
              onClick={generateAiInsight}
              disabled={isAiLoading}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-2 hover:bg-white/10 transition-all disabled:opacity-50"
            >
              <Sparkles size={18} className="text-amber-500" />
              <span className="text-xs uppercase tracking-widest font-bold">AI Insight</span>
            </button>
            <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold">
              PS
            </div>
          </div>
        </header>

        {/* AI Insight Banner */}
        <AnimatePresence>
          {aiInsight && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12 p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl relative overflow-hidden group"
            >
              <div className="flex items-start gap-4 relative z-10">
                <Sparkles size={24} className="text-amber-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-amber-500 font-bold uppercase tracking-widest text-[10px] mb-2">AI Business Intelligence</h4>
                  <p className="text-sm text-white/80 leading-relaxed italic">{aiInsight}</p>
                </div>
              </div>
              <button 
                onClick={() => setAiInsight(null)}
                className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
              >
                <Plus size={20} className="rotate-45" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Content */}
        {activeTab === "dashboard" && (
          <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Sales" value="₹12,45,000" trend="+12.5%" isUp={true} />
              <StatCard title="Total Purchases" value="₹8,12,000" trend="-2.4%" isUp={false} />
              <StatCard title="Total Customers" value="1,240" trend="+5.2%" isUp={true} />
              <StatCard title="Net Profit" value="₹4,33,000" trend="+18.1%" isUp={true} />
            </div>

            {/* Recent Sales Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
              <div className="p-8 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-serif text-xl">Recent Sales</h3>
                <button 
                  onClick={() => setActiveTab("sales")}
                  className="text-amber-500 text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:underline"
                >
                  View All <ChevronRight size={14} />
                </button>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-white/40 border-b border-white/10">
                    <th className="px-8 py-4">Customer</th>
                    <th className="px-8 py-4">Amount</th>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {sales.slice(0, 5).map((sale) => (
                    <tr key={sale.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-8 py-6 font-medium">{sale.customerName}</td>
                      <td className="px-8 py-6 font-mono text-amber-500">₹{sale.totalAmount.toLocaleString()}</td>
                      <td className="px-8 py-6 text-white/40 text-sm">{new Date(sale.date).toLocaleDateString()}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold ${
                          sale.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "sales" && (
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-8 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-serif text-xl">Sales Ledger</h3>
              <div className="flex gap-4">
                <div className="relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input 
                    type="text" 
                    placeholder="Search sales..." 
                    className="bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-2 text-sm focus:outline-none focus:border-amber-500 transition-all"
                  />
                </div>
                <button className="p-2 bg-amber-500 text-black rounded-full hover:bg-amber-400 transition-all">
                  <Plus size={20} />
                </button>
              </div>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-white/40 border-b border-white/10">
                  <th className="px-8 py-4">Order ID</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Amount</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6 text-xs font-mono text-white/40">#{sale.id.slice(0, 8)}</td>
                    <td className="px-8 py-6 font-medium">{sale.customerName}</td>
                    <td className="px-8 py-6 font-mono text-amber-500">₹{sale.totalAmount.toLocaleString()}</td>
                    <td className="px-8 py-6 text-white/40 text-sm">{new Date(sale.date).toLocaleDateString()}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold ${
                        sale.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "purchases" && (
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-8 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-serif text-xl">Inventory Purchases</h3>
              <div className="flex gap-4">
                <div className="relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input 
                    type="text" 
                    placeholder="Search purchases..." 
                    className="bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-2 text-sm focus:outline-none focus:border-amber-500 transition-all"
                  />
                </div>
                <button className="p-2 bg-amber-500 text-black rounded-full hover:bg-amber-400 transition-all">
                  <Plus size={20} />
                </button>
              </div>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-white/40 border-b border-white/10">
                  <th className="px-8 py-4">Purchase ID</th>
                  <th className="px-8 py-4">Vendor</th>
                  <th className="px-8 py-4">Amount</th>
                  <th className="px-8 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {purchases.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6 text-xs font-mono text-white/40">#{purchase.id.slice(0, 8)}</td>
                    <td className="px-8 py-6 font-medium">{purchase.vendorName}</td>
                    <td className="px-8 py-6 font-mono text-amber-500">₹{purchase.totalAmount.toLocaleString()}</td>
                    <td className="px-8 py-6 text-white/40 text-sm">{new Date(purchase.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "customers" && (
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-8 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-serif text-xl">Customer Directory</h3>
              <div className="flex gap-4">
                <div className="relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input 
                    type="text" 
                    placeholder="Search customers..." 
                    className="bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-2 text-sm focus:outline-none focus:border-amber-500 transition-all"
                  />
                </div>
                <button className="p-2 bg-amber-500 text-black rounded-full hover:bg-amber-400 transition-all">
                  <Plus size={20} />
                </button>
              </div>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-white/40 border-b border-white/10">
                  <th className="px-8 py-4">Name</th>
                  <th className="px-8 py-4">Email</th>
                  <th className="px-8 py-4">Total Spent</th>
                  <th className="px-8 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6 font-medium">{customer.name}</td>
                    <td className="px-8 py-6 text-white/40 text-sm">{customer.email}</td>
                    <td className="px-8 py-6 font-mono text-amber-500">₹{customer.totalSpent.toLocaleString()}</td>
                    <td className="px-8 py-6">
                      <button className="text-[10px] uppercase tracking-widest font-bold hover:text-amber-500 transition-colors">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "mails" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <h3 className="font-serif text-xl mb-8">Compose New Mail</h3>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Recipient Email</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-500 transition-all" placeholder="customer@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Subject</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-500 transition-all" placeholder="Exclusive Offer for You" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Message</label>
                    <textarea rows={6} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-500 transition-all resize-none" placeholder="Write your message here..."></textarea>
                  </div>
                  <button className="w-full py-4 bg-amber-500 text-black text-sm uppercase tracking-widest font-bold rounded-xl hover:bg-amber-400 transition-all flex items-center justify-center gap-2">
                    <Send size={18} /> Send Message
                  </button>
                </form>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <h3 className="font-serif text-xl mb-8">Recent Activity</h3>
                <div className="space-y-6">
                  {mails.map((mail) => (
                    <div key={mail.id} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-amber-500 transition-colors">
                        <Mail size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold mb-1">{mail.customerEmail}</h4>
                        <p className="text-xs text-white/40 truncate w-40">{mail.subject}</p>
                        <span className="text-[10px] text-white/20 mt-2 block">{new Date(mail.sentAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h3 className="font-serif text-3xl mb-2">Financial Performance</h3>
                <p className="text-white/40 text-sm italic">Real-time tracking of revenue, expenses, and net yield.</p>
              </div>
              <div className="flex bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-xl">
                {(["day", "month", "year"] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setReportTimeFrame(tf)}
                    className={`px-8 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${
                      reportTimeFrame === tf ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20" : "text-white/40 hover:text-white"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Creative Widgets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Trend Widget */}
              <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-[2rem] p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:bg-amber-500/10 transition-all duration-700" />
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">Performance Index</span>
                    </div>
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-[10px] uppercase tracking-widest text-white/40">Revenue</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500" />
                        <span className="text-[10px] uppercase tracking-widest text-white/40">Expenses</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={pnl.timeSeries}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#ffffff20" 
                          fontSize={10} 
                          tickLine={false} 
                          axisLine={false} 
                          tick={{ fill: '#ffffff40' }}
                          dy={10}
                        />
                        <YAxis 
                          stroke="#ffffff20" 
                          fontSize={10} 
                          tickLine={false} 
                          axisLine={false} 
                          tickFormatter={(value) => `₹${value / 1000}k`}
                          tick={{ fill: '#ffffff40' }}
                          dx={-10}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '16px', backdropFilter: 'blur(20px)' }}
                          itemStyle={{ fontSize: '12px' }}
                          cursor={{ stroke: '#ffffff10', strokeWidth: 1 }}
                          formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#10b981" 
                          strokeWidth={3} 
                          dot={false}
                          activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="expenses" 
                          stroke="#f43f5e" 
                          strokeWidth={3} 
                          dot={false}
                          activeDot={{ r: 6, strokeWidth: 0, fill: '#f43f5e' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Side Stats Bento */}
              <div className="space-y-6">
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[2rem] p-8 flex flex-col justify-between h-[200px] group hover:bg-emerald-500/10 transition-all">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
                      <TrendingUp size={20} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-emerald-500/60 font-bold">Gross Inflow</span>
                  </div>
                  <div className="text-3xl font-mono font-bold">₹{pnl.revenue.toLocaleString()}</div>
                </div>

                <div className="bg-rose-500/5 border border-rose-500/10 rounded-[2rem] p-8 flex flex-col justify-between h-[200px] group hover:bg-rose-500/10 transition-all">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4">
                      <TrendingDown size={20} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-rose-500/60 font-bold">Total Outflow</span>
                  </div>
                  <div className="text-3xl font-mono font-bold">₹{pnl.expenses.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Creative Profit Widget */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-amber-500 rounded-[2rem] p-12 flex flex-col md:flex-row justify-between items-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 text-black">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black mb-4 block">Net Yield Surplus</span>
                  <h4 className="text-6xl font-mono font-black tracking-tighter mb-2">₹{pnl.profit.toLocaleString()}</h4>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-black text-white rounded-full text-[10px] font-bold">
                      {pnl.profit >= 0 ? '+' : ''}{((pnl.profit / (pnl.expenses || 1)) * 100).toFixed(1)}% MARGIN
                    </div>
                    <span className="text-xs font-medium opacity-60">vs previous {reportTimeFrame}</span>
                  </div>
                </div>
                <div className="relative z-10 mt-8 md:mt-0">
                  <div className="w-32 h-32 rounded-full border-[12px] border-black/10 flex items-center justify-center relative">
                    <div className="text-2xl font-black text-black">
                      {Math.min(100, Math.max(0, Math.round((pnl.profit / (pnl.revenue || 1)) * 100)))}%
                    </div>
                    <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
                      <circle 
                        cx="64" cy="64" r="58" 
                        fill="transparent" 
                        stroke="black" 
                        strokeWidth="12" 
                        strokeDasharray="364.4" 
                        strokeDashoffset={364.4 - (364.4 * Math.min(100, Math.max(0, Math.round((pnl.profit / (pnl.revenue || 1)) * 100)))) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-10 flex flex-col justify-center text-center group hover:border-amber-500/50 transition-all">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/40 mx-auto mb-6 group-hover:text-amber-500 transition-colors">
                  <BarChart3 size={32} />
                </div>
                <h4 className="font-serif text-xl mb-2">Audit Ready</h4>
                <p className="text-white/40 text-sm mb-8">Generate a cryptographically signed financial audit for the current period.</p>
                <button className="w-full py-4 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all">
                  Sign & Export
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value, trend, isUp }: { title: string, value: string, trend: string, isUp: boolean }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-amber-500/50 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{title}</span>
        <div className={`flex items-center gap-1 text-[10px] font-bold ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
      </div>
      <div className="text-2xl font-mono font-bold group-hover:text-amber-500 transition-colors">{value}</div>
    </div>
  );
}
