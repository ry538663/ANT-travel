import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Compass, Calendar, Gift, Info, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'My Bookings', path: '/track' },
    { name: 'Services', path: '/services' },
    { name: 'Fleet', path: '/fleet' },
    { name: 'Offers', path: '/offers' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Top Bar for Support */}
      <div className="bg-indigo-900 text-indigo-100 text-xs py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5 text-orange-400" />
          <span>24/7 Hotline: <span className="font-semibold text-white">+91 98765 43210</span></span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <Link to="/about" className="hover:text-white transition-colors">Safety First Policy</Link>
          <span className="text-indigo-400">|</span>
          <Link to="/contact" className="hover:text-white transition-colors">Help & FAQs</Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3' 
            : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-orange-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 transform group-hover:scale-105 transition-transform duration-300">
                <span className="font-display font-extrabold text-xl tracking-tighter">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg sm:text-xl leading-none text-slate-900 tracking-tight">
                  ANT <span className="text-orange-500">TRAVELS</span>
                </span>
                <span className="text-[10px] text-slate-500 tracking-wider font-semibold">THE LUXURY WAY</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 relative ${
                      isActive 
                        ? 'text-indigo-600 bg-indigo-50/50' 
                        : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-4 right-4 h-0.5 bg-indigo-600 rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Call to action button */}
            <div className="hidden lg:flex items-center">
              <Link
                to="/"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-150 transition-all duration-300 hover:shadow-indigo-200 hover:-translate-y-0.5"
              >
                Book Tickets
              </Link>
            </div>

            {/* Mobile Hamburger Menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 focus:outline-none transition-colors"
                aria-expanded="false"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-2 pt-3 pb-4 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                        isActive
                          ? 'text-indigo-600 bg-indigo-50/70'
                          : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                <div className="pt-4 pb-2 px-4">
                  <Link
                    to="/"
                    className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-3 rounded-xl shadow-lg transition-all"
                  >
                    Book Tickets Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
