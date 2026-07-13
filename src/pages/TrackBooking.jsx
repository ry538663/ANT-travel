import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Compass, AlertTriangle, CheckCircle, RefreshCw, XCircle, ShieldAlert, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_TICKETS } from '../utils/mockData';
import { useAuth } from '../context/AuthContext';

const TrackBooking = () => {
  const { currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const queryId = searchParams.get('id') || '';
  const queryPhone = searchParams.get('phone') || '';

  const [bookingId, setBookingId] = useState(queryId);
  const [phone, setPhone] = useState(queryPhone);
  
  const [ticket, setTicket] = useState(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  // Cancellation states
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelledTicket, setCancelledTicket] = useState(false);

  useEffect(() => {
    if (queryId && queryPhone) {
      handleSearch(null, queryId, queryPhone);
    }
  }, [queryId, queryPhone]);

  const handleSearch = (e, bId = bookingId, ph = phone) => {
    if (e) e.preventDefault();
    setError('');
    setTicket(null);
    setSearched(true);

    if (!bId.trim()) {
      setError('Please enter a valid Booking ID.');
      return;
    }
    if (!ph.trim()) {
      setError('Please enter your registered phone number.');
      return;
    }

    const uppercaseId = bId.toUpperCase().trim();
    const cleanPhone = ph.trim();

    // Look up in mock ticket db
    const found = MOCK_TICKETS[uppercaseId];

    if (found && found.phone === cleanPhone) {
      setTicket(found);
      setSearchParams({ id: uppercaseId, phone: cleanPhone });
    } else {
      setError('No matching booking found. Double check your Booking ID and Phone Number.');
    }
  };

  const simulateCancelBooking = () => {
    setCancelling(true);
    setTimeout(() => {
      setCancelling(false);
      // Update ticket status
      const updated = {
        ...ticket,
        status: 'Cancelled',
        checkpoint: 'Booking has been cancelled. Refund of ₹' + Math.round(ticket.fare * 0.9) + ' (90%) processed to source bank account.'
      };
      // Save back in global DB
      MOCK_TICKETS[ticket.bookingId] = updated;
      setTicket(updated);
      setCancelledTicket(true);
      setShowCancelModal(false);
    }, 1800);
  };

  // Get active step index for progress tracker stepper
  const getStepIndex = (status, gpsStatus) => {
    if (status === 'Cancelled') return -1;
    if (gpsStatus === 'Scheduled') return 0;
    if (gpsStatus === 'In Transit') return 1;
    if (gpsStatus === 'Arrived' || gpsStatus === 'Completed') return 2;
    return 0;
  };

  const stepIndex = ticket ? getStepIndex(ticket.status, ticket.gpsStatus) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-orange-500 font-bold uppercase tracking-wider text-xs block mb-1">Live Tracking</span>
        <h1 className="text-3xl font-extrabold font-display text-slate-900">Track Your Journey</h1>
        <p className="text-slate-500 text-sm mt-1">
          Monitor your bus live GPS coordinate location, verify boarding details, or cancel your booking ticket.
        </p>
      </div>

      {/* Customer Profile Banner */}
      {currentUser && (
        <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 p-6 rounded-3xl text-white mb-8 border border-slate-800 shadow relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
          <h2 className="text-lg font-bold font-display leading-tight">Customer Dashboard</h2>
          <p className="text-[11px] text-indigo-200 mt-1">
            Hello, <span className="text-white font-bold">{currentUser.name}</span>. Manage your ticket bookings and active rental inquiries below.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
            <div>
              <span className="text-[9px] uppercase font-bold text-indigo-300 tracking-wider block">Registered Email</span>
              <span className="text-xs font-semibold block truncate mt-0.5">{currentUser.email}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-indigo-300 tracking-wider block">Phone Number</span>
              <span className="text-xs font-semibold block mt-0.5">{currentUser.phone}</span>
            </div>
          </div>
        </div>
      )}

      {/* Active History Grid */}
      {currentUser && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Left: Bookings */}
          <div className="md:col-span-7 space-y-4">
            <h3 className="font-bold text-slate-800 text-xs font-display flex items-center gap-1.5 uppercase tracking-wider">
              <Calendar className="h-4.5 w-4.5 text-indigo-650 text-indigo-600" />
              <span>Your Booked Tickets ({currentUser.bookings.length})</span>
            </h3>
            
            {currentUser.bookings.length === 0 ? (
              <div className="bg-white border border-slate-200/50 p-6 rounded-2xl text-center">
                <p className="text-xs text-slate-500 font-medium">You haven't booked any bus tickets yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {currentUser.bookings.map((b) => (
                  <div 
                    key={b.id} 
                    className="bg-white border border-slate-200/50 p-4 rounded-2xl flex items-center justify-between shadow-sm hover:border-indigo-200 transition-colors"
                  >
                    <div className="pr-2 truncate">
                      <span className="text-[9px] font-bold text-indigo-650 text-indigo-600 bg-indigo-50 py-0.5 px-2 rounded-lg uppercase tracking-wider">{b.id}</span>
                      <h4 className="font-bold text-slate-800 text-xs mt-2">{b.from} → {b.to}</h4>
                      <p className="text-[10px] text-slate-500 mt-1 truncate">{b.busName} • {b.date}</p>
                    </div>
                    <button
                      onClick={() => {
                        setBookingId(b.id);
                        setPhone(currentUser.phone);
                        handleSearch(null, b.id, currentUser.phone);
                      }}
                      className="bg-indigo-50 border border-indigo-100 hover:bg-indigo-100/70 text-indigo-650 text-indigo-600 font-bold text-xs py-2 px-3 rounded-xl transition-all shrink-0"
                    >
                      Track GPS
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Inquiries */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-bold text-slate-800 text-xs font-display flex items-center gap-1.5 uppercase tracking-wider">
              <MapPin className="h-4.5 w-4.5 text-orange-500" />
              <span>Hire Inquiries ({currentUser.inquiries.length})</span>
            </h3>
            
            {currentUser.inquiries.length === 0 ? (
              <div className="bg-white border border-slate-200/50 p-6 rounded-2xl text-center">
                <p className="text-xs text-slate-500 font-medium">No active rental requests found.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {currentUser.inquiries.map((inq) => (
                  <div 
                    key={inq.id} 
                    className="bg-white border border-slate-200/50 p-4 rounded-2xl shadow-sm space-y-2.5"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-slate-800 text-xs truncate leading-snug">{inq.vehicleName}</h4>
                        <span className="text-[9px] text-slate-500 block mt-0.5 truncate">Date: {inq.date} • Dest: {inq.destination}</span>
                      </div>
                      <span className="text-[8px] font-bold text-orange-650 text-orange-500 bg-orange-50 py-0.5 px-2 rounded-full shrink-0 uppercase tracking-wider">
                        {inq.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Query Form */}
      <h3 className="font-bold text-slate-800 text-xs font-display flex items-center gap-1.5 uppercase tracking-wider mb-3">
        <Search className="h-4.5 w-4.5 text-slate-500" />
        <span>Search Booking Manually</span>
      </h3>
      <form onSubmit={(e) => handleSearch(e)} className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200/60 shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-5 bg-slate-50 border border-slate-200/50 rounded-2xl p-2.5">
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 pl-1">Booking ID</label>
            <input
              type="text"
              placeholder="e.g. ANT10293"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              className="w-full bg-transparent border-none p-0 text-sm font-bold font-mono text-slate-800 uppercase focus:outline-none"
            />
          </div>
          <div className="md:col-span-5 bg-slate-50 border border-slate-200/50 rounded-2xl p-2.5">
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 pl-1">Phone Number</label>
            <input
              type="tel"
              placeholder="Registered Mobile"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-transparent border-none p-0 text-sm font-bold text-slate-800 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-2xl shadow transition-all flex items-center justify-center gap-1.5 hover:-translate-y-0.5"
            >
              <Search className="h-4.5 w-4.5" />
              <span>Track</span>
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-xs font-semibold mt-3 flex items-center gap-1">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </form>

      {/* Ticket Details Panel */}
      {ticket && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Main Ticket Info Card */}
          <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-md">
            {/* Header banner */}
            <div className="bg-slate-900 text-white p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-[10px] text-orange-400 uppercase font-extrabold block">Booking Reference</span>
                <span className="font-mono font-extrabold text-lg">{ticket.bookingId}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold py-1 px-3 rounded-full border ${
                  ticket.status === 'Confirmed'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : ticket.status === 'Cancelled'
                    ? 'bg-red-50 text-red-750 text-red-600 border-red-200'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                }`}>
                  Ticket {ticket.status}
                </span>
                {ticket.status === 'Confirmed' && (
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="text-xs text-red-400 hover:text-red-500 font-semibold bg-white/10 hover:bg-white/20 py-1.5 px-3 rounded-lg border border-white/10 transition-colors"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>

            {/* Content info */}
            <div className="p-6 space-y-6">
              {/* Route line */}
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Boarding City</span>
                  <span className="font-extrabold text-slate-800 text-base">{ticket.from}</span>
                </div>
                <div className="flex flex-col items-center flex-1 mx-4">
                  <span className="text-[9px] text-slate-400 font-bold mb-1">JOURNEY DATE: {ticket.date}</span>
                  <div className="w-full h-0.5 bg-slate-200 relative">
                    <div className="absolute top-1/2 left-0 w-2.5 h-2.5 bg-indigo-600 border-2 border-white rounded-full transform -translate-y-1/2" />
                    <div className="absolute top-1/2 right-0 w-2.5 h-2.5 bg-orange-500 border-2 border-white rounded-full transform -translate-y-1/2" />
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Dropping City</span>
                  <span className="font-extrabold text-slate-800 text-base">{ticket.to}</span>
                </div>
              </div>

              {/* Grid details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Operator</span>
                  <span className="font-bold text-slate-800">{ticket.busOperator}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Scheduled Times</span>
                  <span className="font-bold text-slate-800">{ticket.departure} ↔ {ticket.arrival}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Seats Reserved</span>
                  <span className="font-bold text-indigo-600 font-mono">{ticket.seats.join(', ')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Amount Paid</span>
                  <span className="font-extrabold text-slate-800">₹{ticket.fare}</span>
                </div>
              </div>

              {/* Passenger Lists */}
              <div className="border-t border-slate-100 pt-4">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-2">Passenger Information</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {ticket.passengers.map((p, idx) => (
                    <div key={idx} className="bg-slate-50/50 border border-slate-150 p-3.5 rounded-xl text-xs flex items-center justify-between">
                      <div className="font-bold text-slate-700">{p.name} ({p.gender})</div>
                      <div className="text-slate-500 font-semibold">Age: {p.age}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stepper visual Tracker (if not cancelled) */}
          {ticket.status !== 'Cancelled' ? (
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-md space-y-6">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="h-4.5 w-4.5 text-indigo-600" /> Live GPS Transit Status
              </h3>

              {/* Steps Layout */}
              <div className="relative flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 md:pt-4">
                {/* Connecting Line (Desktop) */}
                <div className="absolute top-[28px] left-8 right-8 h-0.5 bg-slate-200 hidden md:block z-0">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-500" 
                    style={{ width: `${stepIndex === 0 ? 0 : stepIndex === 1 ? 50 : 100}%` }}
                  />
                </div>

                {/* Step 1: Booked */}
                <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2.5 z-10 w-full md:w-1/3 text-left md:text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold text-xs ${
                    stepIndex >= 0 ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300 text-slate-400'
                  }`}>
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">Ticket Scheduled</h4>
                    <p className="text-[10px] text-slate-400">Ready at Kashmere Gate</p>
                  </div>
                </div>

                {/* Step 2: Transit */}
                <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2.5 z-10 w-full md:w-1/3 text-left md:text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold text-xs ${
                    stepIndex >= 1 ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300 text-slate-400'
                  }`}>
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">In Transit</h4>
                    <p className="text-[10px] text-slate-400">GPS location active</p>
                  </div>
                </div>

                {/* Step 3: Arrived */}
                <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2.5 z-10 w-full md:w-1/3 text-left md:text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold text-xs ${
                    stepIndex >= 2 ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300 text-slate-400'
                  }`}>
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">Arrived</h4>
                    <p className="text-[10px] text-slate-400">Swargate / Sindhi Camp</p>
                  </div>
                </div>
              </div>

              {/* Status Alert Checkpoint details */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex gap-3 text-indigo-800 text-xs">
                <MapPin className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[9px] text-indigo-500 block">Current Checkpoint</span>
                  <p className="font-semibold leading-relaxed">{ticket.checkpoint}</p>
                </div>
              </div>

              {/* Mock Map Image */}
              {ticket.gpsStatus === 'In Transit' && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 h-64 relative bg-slate-100 shadow-inner flex items-center justify-center">
                  {/* Decorative Map Simulation Grid */}
                  <svg className="absolute inset-0 w-full h-full text-slate-200 pointer-events-none" fill="none">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    {/* Simulated road line */}
                    <path d="M 0 100 Q 150 50 300 150 T 600 80 T 900 120" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
                    <path d="M 0 100 Q 150 50 300 150 T 600 80 T 900 120" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6" />
                  </svg>
                  
                  {/* Pin representing bus */}
                  <div className="relative z-10 flex flex-col items-center animate-bounce">
                    <div className="bg-indigo-600 text-white font-bold text-[9px] py-1 px-2.5 rounded-full shadow-lg border border-white flex items-center gap-1 leading-none mb-1">
                      <RefreshCw className="h-2.5 w-2.5 animate-spin" /> Bus Location Active
                    </div>
                    <div className="w-4 h-4 bg-indigo-600 rounded-full border-2 border-white shadow flex items-center justify-center" />
                  </div>

                  <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] py-1 px-2.5 rounded-lg border border-slate-700">
                    GPS Coordinates: {ticket.gpsLatLng.lat.toFixed(4)}° N, {ticket.gpsLatLng.lng.toFixed(4)}° E
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 text-slate-800 flex gap-3 text-sm">
              <XCircle className="h-5 w-5 text-red-650 text-red-650 text-red-650 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-red-800">Booking Cancelled</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{ticket.checkpoint}</p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* SEARCH EMPTY STATE */}
      {!ticket && searched && !error && (
        <div className="bg-white border border-slate-200/50 p-12 rounded-3xl text-center shadow-sm">
          <Search className="h-10 w-10 text-slate-300 mx-auto mb-4" />
          <h3 className="font-bold text-slate-800 text-base mb-1">Booking Not Found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            We couldn't locate any ticket with details matching Booking ID. Verify spelling or check coupon confirmation email.
          </p>
        </div>
      )}

      {/* CANCELLATION MODAL */}
      <AnimatePresence>
        {showCancelModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-6"
            >
              <div className="flex items-center gap-2.5 text-red-650 text-red-650 text-red-650 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="font-bold font-display text-base text-slate-900">Cancel Booking Reservation?</h3>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed space-y-3.5">
                <p>Are you sure you want to cancel booking <strong>{ticket.bookingId}</strong>? This action cannot be undone.</p>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Fare Paid</span>
                    <span className="font-bold text-slate-800">₹{ticket.fare}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Est. Refund</span>
                    <span className="font-extrabold text-emerald-600">₹{Math.round(ticket.fare * 0.9)} (90%)</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">Based on guidelines, cancellation before 24 hours of departure qualifies for 90% refund credit.</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-all"
                >
                  Keep Booking
                </button>
                <button
                  onClick={simulateCancelBooking}
                  disabled={cancelling}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-1"
                >
                  {cancelling ? (
                    <>
                      <RefreshCw className="h-3 w-3 animate-spin text-white" />
                      <span>Cancelling...</span>
                    </>
                  ) : (
                    <span>Confirm Cancel</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrackBooking;
