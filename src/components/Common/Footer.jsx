import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-orange-500 flex items-center justify-center text-white font-extrabold text-lg">
                A
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                ANT <span className="text-orange-500">TRAVELS</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Experience the pinnacle of intercity bus travel. Since 2009, Ant Travels has been delivering ultra-luxury, safety, and reliability across North and Western India.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-orange-400 transition-colors">Book Bus Tickets</Link></li>
              <li><Link to="/track" className="hover:text-orange-400 transition-colors">Track Booking Status</Link></li>
              <li><Link to="/services" className="hover:text-orange-400 transition-colors">Our Travel Services</Link></li>
              <li><Link to="/fleet" className="hover:text-orange-400 transition-colors">Luxury Fleet & Coach</Link></li>
              <li><Link to="/offers" className="hover:text-orange-400 transition-colors">Discount Promo Codes</Link></li>
              <li><Link to="/about" className="hover:text-orange-400 transition-colors">About Ant Travels</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-3.5">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>123, Ant Tower, Sector 62, Noida, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-indigo-400 shrink-0" />
                <span className="hover:text-white transition-colors">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                <a href="mailto:info@anttravels.com" className="hover:text-white transition-colors">info@anttravels.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Newsletter</h3>
            <p className="text-sm text-slate-400">Subscribe for the latest offers, route updates, and priority booking.</p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-4 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-green-400 flex items-center gap-1 animate-pulse">
                <ShieldCheck className="h-3.5 w-3.5" /> Subscribed successfully! Check your inbox.
              </p>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Ant Travels Private Limited. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-slate-400 font-semibold bg-slate-850 py-1 px-2.5 rounded border border-slate-800">
              <ShieldCheck className="h-3.5 w-3.5 text-orange-400" /> Razorpay Secured
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
