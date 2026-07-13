import React, { useState } from 'react';
import { Tag, Calendar, Copy, Check, Info } from 'lucide-react';
import { OFFERS } from '../utils/mockData';
import { motion } from 'framer-motion';

const Offers = () => {
  const [copiedCode, setCopiedCode] = useState('');

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-indigo-650 text-indigo-650 text-indigo-650 text-indigo-600 font-bold uppercase tracking-wider text-xs block mb-1">Deals & Coupons</span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900">Active Promo Offers</h1>
        <p className="text-slate-500 text-sm md:text-base mt-2">
          Apply these coupon promo codes during checkout on the Search results page to access instant flat or percentage discounts on bookings.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {OFFERS.map((offer, index) => (
          <motion.div
            key={offer.code}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            {/* Banner style card top */}
            <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white p-6 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-24 h-24 bg-orange-500/15 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4.5 w-4.5 text-orange-400" />
                <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-300">Ant Travels Deal</span>
              </div>
              <h2 className="text-2xl font-black font-display text-orange-400">{offer.discount}</h2>
              <p className="text-indigo-100 text-xs mt-1.5 leading-relaxed">{offer.description}</p>
            </div>

            {/* Bottom details */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <Calendar className="h-4 w-4 text-indigo-600" />
                <span>Valid till: <strong className="text-slate-800">{offer.validTill}</strong></span>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-[11px] text-slate-500 flex gap-2">
                <Info className="h-4.5 w-4.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{offer.terms}</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Coupon Code</span>
                  <span className="font-mono font-extrabold text-sm text-slate-900">{offer.code}</span>
                </div>
                
                <button
                  onClick={() => handleCopyCode(offer.code)}
                  className={`text-xs font-bold py-2.5 px-5 rounded-xl border transition-all flex items-center gap-1.5 ${
                    copiedCode === offer.code
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-indigo-50 border-indigo-150 text-indigo-600 hover:bg-indigo-600 hover:text-white'
                  }`}
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
