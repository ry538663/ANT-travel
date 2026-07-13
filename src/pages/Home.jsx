import React, { useState, useEffect } from 'react';
import { ShieldCheck, Truck, Clock, Headphones, Award, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchWidget from '../components/Booking/SearchWidget';
import { POPULAR_ROUTES, OFFERS, TESTIMONIALS } from '../utils/mockData';
import SafeImage from '../components/Common/SafeImage';
import Fleet from './Fleet';

const Home = () => {
  const [copiedCode, setCopiedCode] = useState('');
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [currentHeroImageIdx, setCurrentHeroImageIdx] = useState(0);

  const HERO_IMAGES = [
    '/img/1.png',
    '/img/2.png',
    '/img/3.png',
    '/img/4.png',
    '/img/5.png',
    '/img/6.jpeg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImageIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 3000);
  };

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-black pt-20 pb-28 md:pt-24 md:pb-36 lg:pt-28 lg:pb-40 text-white">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroImageIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HERO_IMAGES[currentHeroImageIdx]})` }}
            />
          </AnimatePresence>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-3xl mx-auto mb-10 md:mb-14"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-black/60 border border-slate-750/50 text-indigo-300 drop-shadow-md">
              <Award className="h-3.5 w-3.5" /> India's Most Trusted Bus Partner Since 2009
            </span>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight tracking-tight text-white"
              style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.95), 0 4px 20px rgba(0,0,0,0.8)' }}
            >
              Travel in Pure <span className="text-indigo-300">Luxury</span> & <span className="text-orange-400">Comfort</span>
            </h1>
            <p className="text-white text-sm md:text-lg max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-medium">
              Book tickets across 500+ premium routes featuring high-end Scania & Volvo multi-axle sleeper coaches with guaranteed safety.
            </p>
          </motion.div>

          {/* Search Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full relative z-20"
          >
            <SearchWidget />
          </motion.div>
        </div>
      </section>

      {/* 2. Popular Routes Section */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-10">
            <div>
              <span className="text-indigo-600 font-bold uppercase tracking-wider text-xs block mb-1">Top Journeys</span>
              <h2 className="text-3xl font-extrabold font-display text-slate-900">Popular Routes</h2>
            </div>
            <p className="text-slate-500 text-sm max-w-md">
              Check out our most frequent routes travelers love. Book tickets starting as low as ₹299.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {POPULAR_ROUTES.map((route, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-white border border-slate-200/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-32 overflow-hidden bg-slate-100">
                  <SafeImage
                    src={route.image}
                    alt={`${route.from} to ${route.to}`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    type="route"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <span className="absolute bottom-2.5 left-3.5 font-semibold text-white text-xs bg-slate-900/60 backdrop-blur-sm py-0.5 px-2 rounded-full">
                    {route.time}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between font-bold text-slate-800 text-sm mb-1">
                      <span>{route.from}</span>
                      <span className="text-slate-400 font-normal">→</span>
                      <span>{route.to}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">Daily Direct Luxury Service</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Fares from</span>
                      <span className="font-extrabold text-indigo-600 text-sm">₹{route.price}</span>
                    </div>
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-orange-50 hover:bg-orange-500 hover:text-white text-orange-600 text-xs font-bold py-1.5 px-3 rounded-lg transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Showcase Section */}
      <section className="bg-slate-50 border-y border-slate-200/50">
        <Fleet />
      </section>

      {/* 3. Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-xs block mb-1">Ant Travels Difference</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900">Why Travel With Us?</h2>
            <p className="text-slate-500 text-sm md:text-base mt-2">
              We focus on safety, luxurious amenities, punctuality, and client-first booking cancellation guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-5 shadow-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Safety Certified Fleet</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                All buses undergo rigorous mechanical fitness inspections. Outfitted with GPS tracking systems and safety speed limiters.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 mb-5 shadow-sm">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Luxury Amenities</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Enjoy complimentary Wi-Fi, USB charging sockets, clean blankets, pillow sets, water bottles, and fully flat sleeping berths.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-5 shadow-sm">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Guaranteed Punctuality</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                98% on-time departure and arrival rate across all routes. Real-time updates pushed directly to passenger mobile numbers.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 mb-5 shadow-sm">
                <Headphones className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">24/7 Hotline Support</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Call our support helpline +91 98765 43210 anytime. Talk to our floating AI bot for cancel, refund or booking FAQs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Offers & Discount Banner */}
      <section className="py-12 bg-slate-50 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="absolute right-0 top-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute left-0 bottom-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="space-y-3 max-w-xl text-center lg:text-left relative z-10">
              <span className="bg-orange-500/20 text-orange-400 font-bold px-3 py-1 rounded-full text-xs border border-orange-500/20 inline-block">
                Exclusive Travel Discounts
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold font-display">Save Big On Intercity Booking</h3>
              <p className="text-indigo-200 text-sm leading-relaxed">
                Planning a trip with friends or visiting home for the holidays? Use code <span className="font-semibold text-white">ANTFIRST</span> to get a flat 15% discount instantly.
              </p>
            </div>

            {/* Offer Coupon Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:max-w-md relative z-10">
              {OFFERS.slice(0, 2).map((offer, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-orange-400 font-extrabold text-lg block">{offer.discount}</span>
                    <p className="text-xs text-indigo-100 mt-1">{offer.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono text-white text-xs bg-slate-900/60 py-1 px-2.5 rounded font-bold border border-slate-800">
                      {offer.code}
                    </span>
                    <button
                      onClick={() => handleCopyCode(offer.code)}
                      className="text-white hover:text-orange-400 text-xs flex items-center gap-1 font-semibold"
                    >
                      {copiedCode === offer.code ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials Slider */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-indigo-600 font-bold uppercase tracking-wider text-xs block mb-1">Client Feedback</span>
          <h2 className="text-3xl font-extrabold font-display text-slate-900 mb-12">What Our Passengers Say</h2>

          <div className="relative min-h-[220px] flex items-center justify-center">
            {TESTIMONIALS.map((item, index) => (
              <div
                key={item.id}
                className={`transition-all duration-500 absolute w-full max-w-2xl px-4 ${
                  index === activeReviewIndex 
                    ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto' 
                    : 'opacity-0 translate-x-12 scale-95 pointer-events-none'
                }`}
              >
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 relative">
                  <div className="flex justify-center gap-1 mb-4 text-orange-500">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-slate-600 italic text-sm md:text-base leading-relaxed mb-6">
                    "{item.text}"
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <SafeImage
                      src={item.avatar}
                      alt={item.name}
                      className="w-11 h-11 rounded-full border border-slate-200 object-cover shrink-0 animate-pulse"
                      type="avatar"
                    />
                    <div className="text-left">
                      <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                      <p className="text-xs text-indigo-600 font-medium">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider buttons */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={prevReview}
              className="w-9 h-9 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
            >
              ←
            </button>
            <span className="text-xs text-slate-400 font-medium">
              {activeReviewIndex + 1} / {TESTIMONIALS.length}
            </span>
            <button
              onClick={nextReview}
              className="w-9 h-9 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* 6. Download App Banner */}
      <section className="py-16 md:py-20 bg-gradient-to-tr from-indigo-50 to-indigo-100 border-t border-indigo-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5 text-center lg:text-left">
              <span className="text-indigo-600 font-extrabold uppercase tracking-wider text-xs block">Coming Soon</span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900">
                Download the Ant Travels Mobile App
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Stay updated on bookings, get alerts when your bus departs, communicate directly with the driver, and download offline tickets. Pre-register for early access perks.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-3">
                <a href="#" className="transform hover:-translate-y-0.5 transition-transform">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                    className="h-11"
                  />
                </a>
                <a href="#" className="transform hover:-translate-y-0.5 transition-transform">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="App Store"
                    className="h-11"
                  />
                </a>
              </div>
            </div>

            {/* QR Mockup visual container */}
            <div className="flex justify-center">
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-indigo-100/80 flex flex-col sm:flex-row items-center gap-6 max-w-sm sm:max-w-md">
                {/* Simulated QR Code SVG */}
                <div className="w-32 h-32 bg-slate-50 border border-slate-100 rounded-xl p-2 flex flex-col justify-between shadow-inner shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-slate-800">
                    <rect x="0" y="0" width="25" height="25" fill="currentColor" />
                    <rect x="5" y="5" width="15" height="15" fill="white" />
                    <rect x="75" y="0" width="25" height="25" fill="currentColor" />
                    <rect x="80" y="5" width="15" height="15" fill="white" />
                    <rect x="0" y="75" width="25" height="25" fill="currentColor" />
                    <rect x="5" y="80" width="15" height="15" fill="white" />
                    {/* Random pixels */}
                    <rect x="35" y="10" width="10" height="5" fill="currentColor" />
                    <rect x="50" y="15" width="5" height="15" fill="currentColor" />
                    <rect x="65" y="20" width="10" height="10" fill="currentColor" />
                    <rect x="10" y="35" width="5" height="20" fill="currentColor" />
                    <rect x="25" y="45" width="15" height="5" fill="currentColor" />
                    <rect x="45" y="35" width="10" height="10" fill="currentColor" />
                    <rect x="55" y="50" width="20" height="5" fill="currentColor" />
                    <rect x="35" y="65" width="15" height="15" fill="currentColor" />
                    <rect x="65" y="75" width="5" height="15" fill="currentColor" />
                    <rect x="80" y="65" width="10" height="10" fill="currentColor" />
                  </svg>
                </div>
                <div className="text-center sm:text-left space-y-1.5">
                  <h4 className="font-bold text-slate-800 text-sm">Scan to Pre-Register</h4>
                  <p className="text-xs text-slate-500">Scan this QR code with your mobile camera to register for a 20% discount on launching day.</p>
                  <span className="inline-block text-[10px] bg-green-50 text-green-700 font-bold py-0.5 px-2 rounded-full border border-green-200">
                    2,400+ pre-registered
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
