import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-serif tracking-tighter text-black mb-6">
              LAKSHMI <span className="text-amber-600 italic">JEWELERY</span>
            </h2>
            <p className="text-black/50 text-sm leading-relaxed mb-8">
              Crafting excellence since 1985. We take pride in our heritage and commitment to providing the finest jewelry to our customers.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-black mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {['Our Story', 'Store Locator', 'Gold Rate', 'Savings Schemes', 'Careers', 'Contact Us'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-black/50 hover:text-amber-600 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-black mb-8">Customer Care</h4>
            <ul className="space-y-4">
              {['Track Order', 'Return Policy', 'Shipping Info', 'Jewelry Care', 'FAQs', 'Certificate Check'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-black/50 hover:text-amber-600 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-black mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin size={20} className="text-amber-600 shrink-0" />
                <span className="text-sm text-black/50 leading-relaxed">
                  715A, 7th Floor, Phase-2, <br />
                  Spencer Plaza, Chennai - 600002
                </span>
              </li>
              <li className="flex gap-4">
                <Phone size={20} className="text-amber-600 shrink-0" />
                <span className="text-sm text-black/50">+91 44 2849 0000</span>
              </li>
              <li className="flex gap-4">
                <Mail size={20} className="text-amber-600 shrink-0" />
                <span className="text-sm text-black/50">support@lakshmijewelery.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-black/40">
            © 2026 Lakshmi Jewelery Private Limited. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] uppercase tracking-widest text-black/40 hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] uppercase tracking-widest text-black/40 hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
