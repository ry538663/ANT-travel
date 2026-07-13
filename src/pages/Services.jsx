import React from 'react';
import * as Icons from 'lucide-react';
import { SERVICES } from '../utils/mockData';
import { motion } from 'framer-motion';

const Services = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-indigo-600 font-bold uppercase tracking-wider text-xs block mb-1">Our Solutions</span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900">Services Offered</h1>
        <p className="text-slate-500 text-sm md:text-base mt-2">
          From luxury coach transit to corporate partnerships and last-mile connectivity, we address all your travel requirements.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, index) => {
          // Dynamic icon loader from Lucide React
          const IconComponent = Icons[service.icon] || Icons.HelpCircle;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-indigo-650 text-indigo-600 mb-6 shadow-sm">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-indigo-600">
                <span>Learn more details</span>
                <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">→</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Call to action panel */}
      <div className="mt-20 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl flex flex-col lg:flex-row justify-between items-center gap-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-3 max-w-xl text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl font-extrabold font-display">Need a Specialized Private Charter?</h2>
          <p className="text-indigo-200 text-sm leading-relaxed">
            Rent our luxury Volvo and Scania coaches for weddings, institutional corporate outings, and customized leisure group excursions with professional drivers.
          </p>
        </div>
        <div className="flex gap-4 shrink-0 flex-wrap justify-center">
          <a
            href="mailto:charter@anttravels.com?subject=Bus%20Charter%20Query"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
          >
            Email Charter Request
          </a>
          <a
            href="tel:+919876543210"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm px-6 py-3 rounded-xl transition-all"
          >
            Call Support Hotline
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;
