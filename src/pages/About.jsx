import React from 'react';
import { Award, ShieldAlert, Heart, Trophy, Users, Map, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const stats = [
    { label: "Passengers Carried", value: "5 Million+", icon: Users },
    { label: "Active Coaches", value: "50+ Volvo/Scania", icon: Trophy },
    { label: "Intercity Routes", value: "120+ Daily", icon: Map },
    { label: "Years of Service", value: "17+ Years", icon: Award }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-indigo-650 text-indigo-650 text-indigo-650 text-indigo-600 font-bold uppercase tracking-wider text-xs block mb-1">Our Journey</span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900">About Ant Travels</h1>
        <p className="text-slate-500 text-sm md:text-base mt-2">
          Providing premium intercity travel and passenger logistical solutions since 2009.
        </p>
      </div>

      {/* History & Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-5">
          <h2 className="text-2xl font-bold font-display text-slate-800">Our Legacy: Since 2009</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Ant Travels was founded in 2009 with a simple, singular vision: to redefine intercity bus travel in India. Replacing standard uncomfortable buses, we introduced state-of-the-art luxury sleeper coaches featuring air suspension, individual charging ports, and certified safety parameters.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            What started as a single route between Delhi and Jaipur has now grown into a comprehensive logistics and passenger travel network servicing millions of satisfied customers across Northern, Western, and Southern states.
          </p>
          <div className="bg-slate-50 border border-slate-200/50 p-5 rounded-2xl flex gap-3 text-slate-700 text-xs">
            <ShieldAlert className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-800 font-bold mb-0.5">Strict Safety Protocol</strong>
              <span>Every single bus driver undergoes double-shift breathing analysis checkups, and coaches are tracked 24/7 in our secure centralized control room.</span>
            </div>
          </div>
        </div>

        {/* Stats visual Grid */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200/50 p-6 rounded-3xl shadow-sm text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mx-auto">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-extrabold text-2xl text-slate-900 font-display">{stat.value}</div>
                <div className="text-xs font-semibold text-slate-450 text-slate-500">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Values Section */}
      <section className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200/50 text-center">
        <h2 className="text-2xl font-bold font-display text-slate-800 mb-10">Our Core Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Customer First</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We offer instant cancellations, direct 90% refunds before 24 hours of travel, and round-the-clock support hotlines to protect your peace of mind.
            </p>
          </div>

          <div className="space-y-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-650 text-indigo-600 flex items-center justify-center mx-auto mb-4">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Eco-Conscious Fleet</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our modern engines meet strict BS6 emission criteria, keeping particulate pollution and carbon emissions at the minimum possible margins.
            </p>
          </div>

          <div className="space-y-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Luxury Standards</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Air suspension seating, private berths, premium pillows, double noise-insulated cabins, and free mineral water on all trips.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
