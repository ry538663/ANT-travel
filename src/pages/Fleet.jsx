import React, { useState } from 'react';
import { ShieldCheck, Info, Users, Tag, Calendar, Search, MapPin, CheckCircle, RefreshCw, X, MessageSquare, HelpCircle, PhoneCall, Route, Landmark } from 'lucide-react';
import { FLEET } from '../utils/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import SafeImage from '../components/Common/SafeImage';

const Fleet = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Enquiry Modal States
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tripDate, setTripDate] = useState('');
  const [source, setSource] = useState('Noida');
  const [destination, setDestination] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [receiptCode, setReceiptCode] = useState('');

  // Detailed Rates Modal States
  const [activeDetailsVehicle, setActiveDetailsVehicle] = useState(null);
  const [activeFaqIdx, setActiveFaqIdx] = useState(null);

  // Filter vehicles based on active tab and search query
  const filteredFleet = FLEET.filter(vehicle => {
    const matchesCategory = filterCategory === 'all' || vehicle.category === filterCategory;
    const matchesSearch = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          vehicle.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !destination.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const code = 'ANTR-' + Math.floor(100000 + Math.random() * 900000);
      setReceiptCode(code);
      setEnquirySuccess(true);
      
      // Reset inputs
      setName('');
      setPhone('');
      setTripDate('');
      setDestination('');
    }, 1500);
  };

  const handleCloseModal = () => {
    setSelectedVehicle(null);
    setEnquirySuccess(false);
  };

  // Static benefits list for Why Choose us matching Screenshot 1 & 2
  const whyChooseAntTravels = [
    "Professional Chauffeurs",
    "Sanitized Vehicles",
    "24x7 Customer Support",
    "GPS Enabled Cars",
    "Transparent Pricing",
    "Airport Meet & Greet",
    "Corporate Billing",
    "On-Time Pickup",
    "Luxury Fleet",
    "Delhi NCR Coverage"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Title & Noida banner */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-150 text-indigo-750 text-indigo-650 text-indigo-600 animate-pulse">
          <MapPin className="h-3.5 w-3.5 text-orange-500" /> Best Tourist Transport Operator in Noida & Delhi NCR
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
          Luxury Bus & Car Rental Fleet
        </h1>
        <p className="text-slate-500 text-sm md:text-base">
          Rent our premium Swift, Innova, Fortuner cabs, luxury Tempo Travellers, or multi-axle Volvo & Scania buses from Noida Sector 61, 62, 63, and Delhi NCR for outstation tours, events, or Char Dham pilgrimages.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        
        {/* Category Switches */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Fleet' },
            { id: 'cars', label: 'Sedans & SUVs' },
            { id: 'travellers', label: 'Tempo Travellers' },
            { id: 'coaches', label: 'Buses & Coaches' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                filterCategory === tab.id
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow shadow-indigo-100'
                  : 'bg-slate-50 border-slate-200/65 text-slate-600 hover:border-slate-300 hover:bg-slate-100/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:max-w-xs shrink-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search vehicle model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500 text-slate-700 placeholder-slate-405"
          />
        </div>

      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredFleet.length > 0 ? (
          filteredFleet.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
              className="bg-white border border-slate-200/55 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-350 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Photo Box */}
              <div className="relative h-44 bg-slate-50 overflow-hidden shrink-0">
                <SafeImage
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
                  type={vehicle.category === 'cars' ? 'car' : 'bus'}
                />
                
                {/* Rate Tag */}
                <div className="absolute bottom-3 left-3 bg-slate-900/70 backdrop-blur-sm text-white font-extrabold text-[10px] py-1 px-2.5 rounded-lg border border-slate-750">
                  {vehicle.rate.includes('/km') ? `Starting ${vehicle.rate}` : vehicle.rate}
                </div>

                {/* Capacity Badge */}
                <div className="absolute top-3 right-3 bg-orange-500 text-white font-bold text-[9px] py-0.5 px-2 rounded-full flex items-center gap-1 shadow-sm">
                  <Users className="h-3 w-3" />
                  <span>{vehicle.capacity}</span>
                </div>
              </div>

              {/* Specs & Description */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-1">
                    <div className="flex-1">
                      <span className="text-[9px] text-indigo-650 font-bold uppercase tracking-wider block">{vehicle.type}</span>
                      <h3 className="font-bold text-slate-800 text-sm tracking-tight line-clamp-1 group-hover:text-indigo-600 transition-colors mt-0.5">
                        {vehicle.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                    {vehicle.description}
                  </p>
                </div>

                {/* Quick links to rates or features */}
                <div className="mt-2.5">
                  <button 
                    onClick={() => setActiveDetailsVehicle(vehicle)}
                    className="text-[10px] font-extrabold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 hover:underline"
                  >
                    <Info className="h-3.5 w-3.5 shrink-0" /> View Detailed Rates & T&C
                  </button>
                </div>

                {/* Amenities List tags */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                  {vehicle.amenities.slice(0, 3).map((amenity, idx) => (
                    <span key={idx} className="bg-slate-50 text-slate-550 border border-slate-150 rounded px-1.5 py-0.5 text-[8.5px] font-bold text-slate-500">
                      {amenity}
                    </span>
                  ))}
                  {vehicle.amenities.length > 3 && (
                    <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 rounded px-1.5 py-0.5 text-[8.5px] font-bold">
                      +{vehicle.amenities.length - 3} More
                    </span>
                  )}
                </div>

                {/* Enquiry Action Button */}
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-755 text-white text-xs font-bold py-2.5 rounded-xl transition-all duration-300 shadow-sm text-center"
                  >
                    Rent Now
                  </button>
                  <button
                    onClick={() => setActiveDetailsVehicle(vehicle)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl transition-all duration-300 text-center"
                  >
                    View Rates
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-white border border-slate-200/50 rounded-3xl">
            <Search className="h-10 w-10 text-slate-350 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700 text-sm">No Vehicles Found</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">Try resetting the search parameter query or switching tabs.</p>
          </div>
        )}
      </div>

      {/* NOIDA ADVANTAGE BANNER */}
      <section className="mt-16 bg-gradient-to-tr from-indigo-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg">
        <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 max-w-2xl text-center md:text-left">
          <h3 className="font-bold text-lg md:text-xl font-display">Bus Rental Noida Sector 61, 62, 63 shuttle service</h3>
          <p className="text-indigo-200 text-xs leading-relaxed">
            We provide contracted fleet operations for local corporate parks and employee home drops in Noida IT Hub sectors. Regular sanitizations, GPS logs, and back-up driver networks are active.
          </p>
        </div>
        <a
          href="tel:+919876543210"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-3 px-6 rounded-xl transition-all shrink-0 shadow-lg"
        >
          Book Noida Office Cab Contracts
        </a>
      </section>

      {/* 1. DETAILED RATES & T&C MODAL (Matching Uploaded Screenshots) */}
      <AnimatePresence>
        {activeDetailsVehicle && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-5xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col"
            >
              {/* Header */}
              <div className="bg-indigo-900 text-white p-5 flex justify-between items-center sticky top-0 z-10 shrink-0">
                <div>
                  <span className="text-[10px] text-orange-400 font-extrabold uppercase tracking-wider block">{activeDetailsVehicle.type}</span>
                  <h3 className="font-bold font-display text-base sm:text-lg">{activeDetailsVehicle.name} - Pricing & Info</h3>
                </div>
                <button 
                  onClick={() => { setActiveDetailsVehicle(null); setActiveFaqIdx(null); }}
                  className="p-1 rounded-full hover:bg-white/10 text-indigo-250 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Body Content */}
              <div className="p-6 overflow-y-auto space-y-8 flex-1">
                
                {/* Intro summary block */}
                <div className="bg-indigo-50 border border-indigo-100/50 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-5">
                  <SafeImage
                    src={activeDetailsVehicle.image}
                    alt={activeDetailsVehicle.name}
                    className="w-full sm:w-40 h-28 object-cover rounded-xl shadow-sm shrink-0"
                    type={activeDetailsVehicle.category === 'cars' ? 'car' : 'bus'}
                  />
                  <div className="space-y-1.5 text-center sm:text-left">
                    <h4 className="font-extrabold text-indigo-905 text-indigo-900 text-sm tracking-tight">Looking for a reliable {activeDetailsVehicle.name}?</h4>
                    <p className="text-slate-650 text-slate-600 text-xs leading-relaxed">
                      ANT Travels provides premium chauffeur-driven cab and bus hiring services for outstation tourist visits, airport terminal pickups, railway drops, wedding transportation, and corporate tours. Rates are competitive and include trained professional chauffeurs.
                    </p>
                  </div>
                </div>

                {/* Main 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Pricing Tables & Benefits */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* pricing table */}
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                        <Tag className="h-4.5 w-4.5 text-orange-500" /> Indicative Rental Charges
                      </h4>
                      {activeDetailsVehicle.rentalDetails ? (
                        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-200 font-extrabold text-slate-700">
                                <th className="p-3">Service</th>
                                <th className="p-3">Package</th>
                                <th className="p-3 text-right">Starting Price</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
                              {activeDetailsVehicle.rentalDetails.pricingTable.map((row, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                                  <td className="p-3 font-bold text-slate-800">{row.service}</td>
                                  <td className="p-3 text-slate-500">{row.package}</td>
                                  <td className="p-3 text-right text-orange-600 font-extrabold font-mono">{row.price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center text-slate-400 text-xs">
                          Pricing packages are dynamic. Click 'Rent Now' to get direct hourly quotes.
                        </div>
                      )}
                      <p className="text-[10px] text-slate-400 italic mt-2.5 leading-relaxed">
                        * Note: Indicative rates only. Parking charges, toll tax, state tax, and driver allowance (Rs.500/day for outstation) are charged extra wherever applicable. Rates may vary during peak seasons and festivals.
                      </p>
                    </div>

                    {/* Why Choose Us matching Screenshot 1/2 */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
                        <ShieldCheck className="h-4.5 w-4.5 text-indigo-650 text-indigo-605 text-indigo-600" /> Why Choose ANT Travels
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 font-semibold">
                        {whyChooseAntTravels.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Services, Routes, FAQs */}
                  <div className="lg:col-span-5 space-y-6">
                    {/* Services and Routes */}
                    {activeDetailsVehicle.rentalDetails && (
                      <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl space-y-5">
                        {/* Services List */}
                        <div className="space-y-2.5">
                          <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                            <Landmark className="h-4 w-4 text-indigo-600" /> Our Rental Services
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-600">
                            {activeDetailsVehicle.rentalDetails.services.map((srv, idx) => (
                              <div key={idx} className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0" />
                                <span>{srv}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Popular Routes */}
                        <div className="space-y-2.5 pt-3 border-t border-slate-200">
                          <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                            <Route className="h-4 w-4 text-indigo-600" /> Route Information Popular Routes
                          </h5>
                          <div className="flex flex-wrap gap-1.5">
                            {activeDetailsVehicle.rentalDetails.routes.map((route, idx) => (
                              <span key={idx} className="bg-white border border-slate-200 rounded-lg py-1 px-2 text-[10px] font-bold text-slate-700">
                                {route}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* FAQ list matching Screenshot 2/3 */}
                    {activeDetailsVehicle.rentalDetails && (
                      <div className="space-y-3">
                        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
                          <HelpCircle className="h-4.5 w-4.5 text-indigo-650 text-indigo-600" /> Frequently Asked Questions
                        </h4>
                        <div className="space-y-2 text-xs">
                          {activeDetailsVehicle.rentalDetails.faqs.map((faq, idx) => {
                            const isFaqActive = activeFaqIdx === idx;
                            return (
                              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => setActiveFaqIdx(isFaqActive ? null : idx)}
                                  className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100/50 font-extrabold text-slate-800 flex justify-between items-center transition-colors"
                                >
                                  <span>{faq.q}</span>
                                  <span>{isFaqActive ? '−' : '+'}</span>
                                </button>
                                {isFaqActive && (
                                  <div className="p-3.5 border-t border-slate-100 bg-white font-medium text-slate-550 leading-relaxed text-slate-550 text-slate-650 text-slate-500">
                                    {faq.a}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Contact Details Matching Screenshot 3 */}
                    <div className="bg-indigo-900 text-indigo-100 p-5 rounded-2xl space-y-4 shadow-sm">
                      <div className="flex items-center gap-2 border-b border-indigo-850 border-white/10 pb-2">
                        <PhoneCall className="h-4.5 w-4.5 text-orange-400" />
                        <span className="font-bold text-xs uppercase tracking-wider text-white">Contact for Bookings</span>
                      </div>
                      <div className="text-xs space-y-2">
                        <p className="font-bold text-white">ANT TRAVELS PVT. LTD.</p>
                        <p><strong>Hotlines:</strong> +91 9811992203, 9811448977, 9811992209</p>
                        <p><strong>Toll-Free:</strong> 1800 1027 408</p>
                        <p><strong>Email:</strong> <a href="mailto:booking@anttravels.com" className="text-orange-400 font-semibold hover:underline">booking@anttravels.com</a></p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedVehicle(activeDetailsVehicle);
                          setActiveDetailsVehicle(null);
                          setActiveFaqIdx(null);
                        }}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl transition-all shadow text-center"
                      >
                        Enquire Instantly
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QUICK ENQUIRY POPUP MODAL */}
      <AnimatePresence>
        {selectedVehicle && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100"
            >
              {/* Modal Header */}
              <div className="bg-indigo-900 text-white p-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-orange-400" />
                  <span className="font-bold text-sm font-display">Fleet Hire Enquiry</span>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="p-1 rounded-full hover:bg-white/10 text-indigo-200 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                
                {/* Vehicle Selection summary banner */}
                <div className="bg-slate-50 border border-slate-200/50 p-3 rounded-2xl flex items-center gap-3.5 mb-6">
                  <SafeImage
                    src={selectedVehicle.image}
                    alt={selectedVehicle.name}
                    className="w-14 h-14 object-cover rounded-xl shrink-0"
                    type={selectedVehicle.category === 'cars' ? 'car' : 'bus'}
                  />
                  <div>
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase block">{selectedVehicle.type}</span>
                    <h4 className="font-bold text-slate-800 text-xs tracking-tight">{selectedVehicle.name}</h4>
                    <span className="text-[10px] text-indigo-650 text-indigo-600 font-bold block mt-0.5">Rate: {selectedVehicle.rate}</span>
                  </div>
                </div>

                {/* Switch between success vs submission form */}
                {!enquirySuccess ? (
                  <form onSubmit={handleEnquirySubmit} className="space-y-4">
                    <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-2.5">
                      <label className="block text-[10px] uppercase font-bold text-slate-455 text-slate-400 mb-1 pl-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-transparent border-none p-0 text-xs font-semibold text-slate-850 focus:outline-none"
                      />
                    </div>

                    <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-2.5">
                      <label className="block text-[10px] uppercase font-bold text-slate-455 text-slate-400 mb-1 pl-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="10 digit mobile"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-transparent border-none p-0 text-xs font-semibold text-slate-850 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-2.5">
                        <label className="block text-[10px] uppercase font-bold text-slate-455 text-slate-400 mb-1 pl-1">Trip Date</label>
                        <input
                          type="date"
                          required
                          value={tripDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setTripDate(e.target.value)}
                          className="w-full bg-transparent border-none p-0 text-xs font-semibold text-slate-850 focus:outline-none"
                        />
                      </div>
                      <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-2.5">
                        <label className="block text-[10px] uppercase font-bold text-slate-455 text-slate-400 mb-1 pl-1">Source City</label>
                        <select
                          value={source}
                          onChange={(e) => setSource(e.target.value)}
                          className="w-full bg-transparent border-none p-0 text-xs font-semibold text-slate-850 focus:outline-none cursor-pointer"
                        >
                          <option value="Noida">Noida</option>
                          <option value="New Delhi">New Delhi</option>
                          <option value="Gurugram">Gurugram</option>
                          <option value="Ghaziabad">Ghaziabad</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-2.5">
                      <label className="block text-[10px] uppercase font-bold text-slate-455 text-slate-400 mb-1 pl-1">Destination City</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jaipur, Agra, Char Dham Pilgrimage"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full bg-transparent border-none p-0 text-xs font-semibold text-slate-850 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-orange-500 hover:bg-orange-655 hover:bg-orange-600 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5"
                    >
                      {submitting ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin text-white" />
                          <span>Submitting quote request...</span>
                        </>
                      ) : (
                        <span>Request Custom Package Quote</span>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-4 py-4"
                  >
                    <div className="w-12 h-12 bg-emerald-550/10 text-emerald-600 bg-emerald-550 rounded-2xl flex items-center justify-center mx-auto shadow border border-emerald-100 bg-emerald-100">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm font-display">Enquiry Submitted!</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                        Our Noida logistics booking representative will review and call you back in 15 minutes with customized rates.
                      </p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/50 p-3 rounded-2xl font-mono text-xs font-extrabold text-slate-800">
                      Reference Code: {receiptCode}
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="bg-indigo-650 bg-indigo-600 hover:bg-indigo-750 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-all"
                    >
                      Close Receipt
                    </button>
                  </motion.div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Fleet;
