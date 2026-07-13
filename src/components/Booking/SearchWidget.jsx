import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, ArrowRightLeft, Search, AlertCircle } from 'lucide-react';
import { CITIES } from '../../utils/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const SearchWidget = ({ initialFrom = '', initialTo = '', initialDate = '' }) => {
  const navigate = useNavigate();
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [date, setDate] = useState(initialDate || new Date().toISOString().split('T')[0]);

  const [showFromDrop, setShowFromDrop] = useState(false);
  const [showToDrop, setShowToDrop] = useState(false);
  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');
  const [error, setError] = useState('');

  const fromRef = useRef(null);
  const toRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const clickOutside = (e) => {
      if (fromRef.current && !fromRef.current.contains(e.target)) {
        setShowFromDrop(false);
      }
      if (toRef.current && !toRef.current.contains(e.target)) {
        setShowToDrop(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  const filteredFromCities = CITIES.filter(city => 
    city.toLowerCase().includes(fromSearch.toLowerCase()) && city !== to
  );

  const filteredToCities = CITIES.filter(city => 
    city.toLowerCase().includes(toSearch.toLowerCase()) && city !== from
  );

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setError('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!from) {
      setError('Please select a starting city.');
      return;
    }
    if (!to) {
      setError('Please select a destination city.');
      return;
    }
    if (from === to) {
      setError('Source and destination cannot be the same.');
      return;
    }
    if (!date) {
      setError('Please select a journey date.');
      return;
    }

    setError('');
    navigate(`/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`);
  };

  // Get tomorrow's date for placeholder min constraints
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <form onSubmit={handleSearch} className="bg-white rounded-3xl p-5 md:p-6 shadow-xl border border-slate-100/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* From City Selection */}
          <div ref={fromRef} className="relative lg:col-span-4 bg-slate-50 hover:bg-slate-100/70 border border-slate-200/50 rounded-2xl p-3.5 transition-colors cursor-pointer" onClick={() => setShowFromDrop(true)}>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-indigo-600 shrink-0" />
              <div className="flex-1 text-left">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">From</span>
                <input
                  type="text"
                  placeholder="Select Departure City"
                  value={showFromDrop ? fromSearch : from}
                  onChange={(e) => {
                    setFromSearch(e.target.value);
                    if (!showFromDrop) setShowFromDrop(true);
                  }}
                  className="w-full bg-transparent border-none p-0 text-slate-800 font-semibold focus:outline-none focus:ring-0 placeholder-slate-400 text-sm sm:text-base"
                />
              </div>
            </div>
            
            {/* Dropdown list */}
            <AnimatePresence>
              {showFromDrop && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-100 shadow-xl rounded-2xl max-h-60 overflow-y-auto z-50 py-2"
                >
                  {filteredFromCities.length > 0 ? (
                    filteredFromCities.map(city => (
                      <button
                        key={city}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFrom(city);
                          setFromSearch('');
                          setShowFromDrop(false);
                          setError('');
                        }}
                        className="w-full px-4 py-2.5 text-left hover:bg-indigo-50 hover:text-indigo-600 font-medium text-sm text-slate-700 transition-colors"
                      >
                        {city}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-slate-400 text-center">No cities found</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Swap Button */}
          <div className="lg:col-span-1 flex justify-center">
            <button
              type="button"
              onClick={handleSwap}
              className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-indigo-600 shadow-sm transition-all duration-300 transform hover:rotate-180 shrink-0"
              title="Swap Cities"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </button>
          </div>

          {/* To City Selection */}
          <div ref={toRef} className="relative lg:col-span-4 bg-slate-50 hover:bg-slate-100/70 border border-slate-200/50 rounded-2xl p-3.5 transition-colors cursor-pointer" onClick={() => setShowToDrop(true)}>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-orange-500 shrink-0" />
              <div className="flex-1 text-left">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">To</span>
                <input
                  type="text"
                  placeholder="Select Destination City"
                  value={showToDrop ? toSearch : to}
                  onChange={(e) => {
                    setToSearch(e.target.value);
                    if (!showToDrop) setShowToDrop(true);
                  }}
                  className="w-full bg-transparent border-none p-0 text-slate-800 font-semibold focus:outline-none focus:ring-0 placeholder-slate-400 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Dropdown list */}
            <AnimatePresence>
              {showToDrop && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-100 shadow-xl rounded-2xl max-h-60 overflow-y-auto z-50 py-2"
                >
                  {filteredToCities.length > 0 ? (
                    filteredToCities.map(city => (
                      <button
                        key={city}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTo(city);
                          setToSearch('');
                          setShowToDrop(false);
                          setError('');
                        }}
                        className="w-full px-4 py-2.5 text-left hover:bg-indigo-50 hover:text-indigo-600 font-medium text-sm text-slate-700 transition-colors"
                      >
                        {city}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-slate-400 text-center">No cities found</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Date Picker */}
          <div className="lg:col-span-3 bg-slate-50 hover:bg-slate-100/70 border border-slate-200/50 rounded-2xl p-3.5 transition-colors">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-indigo-600 shrink-0" />
              <div className="flex-1 text-left">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Date of Journey</span>
                <input
                  type="date"
                  value={date}
                  min={todayStr}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-slate-800 font-semibold focus:outline-none focus:ring-0 text-sm sm:text-base cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-4 flex items-center gap-2 text-red-500 text-xs font-semibold"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <Search className="h-5 w-5" />
            <span>Search Buses</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchWidget;
