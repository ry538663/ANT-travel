import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Calendar, Filter, Users, Shield, Tag, ChevronDown, Check, Loader2, Sparkles, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_BUSES, getSeatMapForBus, OFFERS, MOCK_TICKETS } from '../utils/mockData';
import SearchWidget from '../components/Booking/SearchWidget';
import { useAuth } from '../context/AuthContext';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser, addBooking } = useAuth();

  const fromVal = searchParams.get('from') || '';
  const toVal = searchParams.get('to') || '';
  const dateVal = searchParams.get('date') || '';

  const [loading, setLoading] = useState(true);
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [seatMap, setSeatMap] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [activeDeck, setActiveDeck] = useState('Lower'); // Lower/Upper for sleepers

  // Filters
  const [acFilter, setAcFilter] = useState('all'); // all, ac, non-ac
  const [typeFilter, setTypeFilter] = useState('all'); // all, sleeper, seater
  const [sortOrder, setSortOrder] = useState('price-low'); // price-low, price-high, rating

  // Booking Flow details
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedBoarding, setSelectedBoarding] = useState('');
  const [selectedDropping, setSelectedDropping] = useState('');
  
  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  // Payment simulation
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMode, setPaymentMode] = useState('card'); // card, upi, wallet
  const [cardNo, setCardNo] = useState('');
  const [cardName, setCardName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [bookingSuccessTicket, setBookingSuccessTicket] = useState(null);

  // Simulate loading state on search change
  useEffect(() => {
    setLoading(true);
    setSelectedBus(null);
    setSelectedSeats([]);
    setPassengerDetails([]);
    setBookingSuccessTicket(null);
    setShowPayment(false);

    const timer = setTimeout(() => {
      // Find matching buses
      const filtered = MOCK_BUSES.filter(bus => 
        bus.from.toLowerCase() === fromVal.toLowerCase() && 
        bus.to.toLowerCase() === toVal.toLowerCase()
      );
      setBuses(filtered);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [fromVal, toVal, dateVal]);

  // Load seat map when bus is chosen
  const handleSelectBus = (bus) => {
    if (selectedBus?.id === bus.id) {
      setSelectedBus(null);
      setSelectedSeats([]);
      setPassengerDetails([]);
    } else {
      setSelectedBus(bus);
      const seats = getSeatMapForBus(bus.id, bus.layout);
      setSeatMap(seats);
      setSelectedSeats([]);
      setPassengerDetails([]);
      setSelectedBoarding(bus.boardingPoints[0]);
      setSelectedDropping(bus.droppingPoints[0]);
    }
  };

  const handleSeatClick = (seat) => {
    if (seat.isBooked) return;

    const isAlreadySelected = selectedSeats.find(s => s.id === seat.id);
    if (isAlreadySelected) {
      const updated = selectedSeats.filter(s => s.id !== seat.id);
      setSelectedSeats(updated);
      setPassengerDetails(passengerDetails.filter(p => p.seatId !== seat.id));
    } else {
      if (selectedSeats.length >= 6) {
        alert('You can book a maximum of 6 seats at once.');
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
      setPassengerDetails([...passengerDetails, {
        seatId: seat.id,
        seatName: seat.name,
        name: '',
        age: '',
        gender: 'Male'
      }]);
    }
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengerDetails];
    updated[index][field] = value;
    setPassengerDetails(updated);
  };

  const applyPromo = () => {
    setPromoError('');
    const code = promoCode.toUpperCase().trim();
    const offer = OFFERS.find(o => o.code === code);
    
    if (!offer) {
      setPromoError('Invalid promo code.');
      setAppliedPromo(null);
      return;
    }
    
    // Apply dummy validation logic
    if (code === 'FESTIVE20') {
      const subtotal = selectedSeats.reduce((acc, seat) => acc + selectedBus.price + seat.price, 0);
      if (subtotal < 999) {
        setPromoError('Minimum booking value for FESTIVE20 is ₹999.');
        setAppliedPromo(null);
        return;
      }
    }

    setAppliedPromo(offer);
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
  };

  const getPriceCalculation = () => {
    if (!selectedBus) return { subtotal: 0, discount: 0, total: 0 };
    const subtotal = selectedSeats.reduce((acc, seat) => acc + selectedBus.price + seat.price, 0);
    
    let discount = 0;
    if (appliedPromo) {
      if (appliedPromo.code === 'ANTFIRST') {
        discount = Math.min(Math.round(subtotal * 0.15), 150);
      } else if (appliedPromo.code === 'FESTIVE20') {
        discount = Math.round(subtotal * 0.20);
      } else if (appliedPromo.code === 'WEEKENDSLAY') {
        discount = 100;
      } else if (appliedPromo.code === 'CORPANT') {
        discount = Math.round(subtotal * 0.10);
      }
    }
    
    return { subtotal, discount, total: subtotal - discount };
  };

  const proceedToCheckout = (e) => {
    e.preventDefault();
    // Validate passengers
    for (let p of passengerDetails) {
      if (!p.name.trim()) {
        alert('Please fill name for seat ' + p.seatName);
        return;
      }
      if (!p.age || isNaN(p.age) || p.age <= 0) {
        alert('Please enter a valid age for seat ' + p.seatName);
        return;
      }
    }
    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      alert('Please enter a valid mobile number.');
      return;
    }

    setShowPayment(true);
  };

  const simulatePaymentSubmit = (e) => {
    e.preventDefault();
    setProcessingPayment(true);

    setTimeout(() => {
      setProcessingPayment(false);
      // Generate standard ticket reference
      const bId = 'ANT' + Math.floor(10000 + Math.random() * 90000);
      const calc = getPriceCalculation();
      
      const newTicket = {
        bookingId: bId,
        phone,
        from: selectedBus.from,
        to: selectedBus.to,
        date: dateVal,
        busOperator: selectedBus.operator,
        busType: selectedBus.type,
        departure: selectedBus.departure,
        arrival: selectedBus.arrival,
        boardingPoint: selectedBoarding,
        droppingPoint: selectedDropping,
        seats: selectedSeats.map(s => s.name),
        passengers: passengerDetails.map(p => ({ name: p.name, age: parseInt(p.age), gender: p.gender })),
        fare: calc.total,
        status: 'Confirmed',
        gpsStatus: 'Scheduled',
        checkpoint: 'Ticket Booked! Happy Journey.'
      };

      // Add to mock tickets global db
      MOCK_TICKETS[bId] = newTicket;
      
      // If user is logged in, save to their account
      if (currentUser) {
        addBooking({
          id: bId,
          busId: selectedBus.id,
          busName: selectedBus.operator + ' ' + selectedBus.type,
          from: selectedBus.from,
          to: selectedBus.to,
          date: dateVal,
          time: selectedBus.departure,
          seats: selectedSeats.map(s => s.name),
          totalAmount: calc.total,
          status: 'Confirmed',
          gpsStatus: 'Scheduled'
        });
      }
      
      setBookingSuccessTicket(newTicket);
      setShowPayment(false);
    }, 2000);
  };

  // Filter & Sort Buses
  const getFilteredAndSortedBuses = () => {
    let result = [...buses];

    // AC Filter
    if (acFilter === 'ac') {
      result = result.filter(b => b.type.toLowerCase().includes('ac'));
    } else if (acFilter === 'non-ac') {
      result = result.filter(b => !b.type.toLowerCase().includes('ac'));
    }

    // Seater/Sleeper Filter
    if (typeFilter === 'seater') {
      result = result.filter(b => b.layout === 'seater');
    } else if (typeFilter === 'sleeper') {
      result = result.filter(b => b.layout === 'sleeper');
    }

    // Sort
    if (sortOrder === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  };

  const processedBuses = getFilteredAndSortedBuses();
  const calculation = getPriceCalculation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner Widget search overlay */}
      <div className="bg-slate-900 rounded-3xl p-6 mb-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-orange-400 font-bold uppercase tracking-wider text-xs block mb-1">Journey Search</span>
            <h1 className="text-2xl font-bold font-display flex items-center gap-2">
              <span>{fromVal || 'Select Origin'}</span>
              <span className="text-orange-500">→</span>
              <span>{toVal || 'Select Destination'}</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300 font-semibold bg-white/10 py-1.5 px-3.5 rounded-xl border border-white/10 shrink-0">
            <Calendar className="h-4 w-4 text-orange-400" />
            <span>{dateVal ? new Date(dateVal).toDateString() : 'Select Date'}</span>
          </div>
        </div>
        <SearchWidget initialFrom={fromVal} initialTo={toVal} initialDate={dateVal} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Filters Sidebar */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wider">
              <Filter className="h-4 w-4 text-indigo-600" /> Filters
            </h3>
            <button 
              onClick={() => { setAcFilter('all'); setTypeFilter('all'); setSortOrder('price-low'); }}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Reset All
            </button>
          </div>

          {/* AC / Non AC */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Bus Coach Type</h4>
            <div className="grid grid-cols-3 gap-2">
              {['all', 'ac', 'non-ac'].map(mode => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setAcFilter(mode)}
                  className={`text-xs py-2 rounded-lg font-semibold border transition-all ${
                    acFilter === mode 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-600 font-bold' 
                      : 'border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-slate-50'
                  }`}
                >
                  {mode.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Seater / Sleeper */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Seat Map Style</h4>
            <div className="grid grid-cols-3 gap-2">
              {['all', 'seater', 'sleeper'].map(mode => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setTypeFilter(mode)}
                  className={`text-xs py-2 rounded-lg font-semibold border transition-all ${
                    typeFilter === mode 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-600 font-bold' 
                      : 'border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-slate-50'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Sorting options */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Sort Result</h4>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-700 focus:outline-none focus:border-indigo-500"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Safety Rating</option>
            </select>
          </div>
        </div>

        {/* Results List */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* SUCCESS SCREEN */}
          {bookingSuccessTicket && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-550/10 border-2 border-emerald-400 bg-emerald-50 rounded-3xl p-6 md:p-8 text-slate-800 space-y-6 relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Check className="h-6 w-6" strokeWidth={3} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-emerald-800 font-display">Booking Confirmed!</h2>
                  <p className="text-sm text-emerald-700">Thank you for booking with Ant Travels. Details have been emailed.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Booking ID</span>
                  <span className="font-extrabold text-slate-900 font-mono text-base">{bookingSuccessTicket.bookingId}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Bus Coach / Operator</span>
                  <span className="font-bold text-slate-800 text-sm">{bookingSuccessTicket.busOperator}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Seats Booked</span>
                  <span className="font-extrabold text-indigo-600 text-sm font-mono">{bookingSuccessTicket.seats.join(', ')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Departure</span>
                  <span className="font-bold text-slate-800 text-sm">{bookingSuccessTicket.departure} ({dateVal})</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Boarding Terminal</span>
                  <span className="font-bold text-slate-800 text-xs">{bookingSuccessTicket.boardingPoint}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Fare Paid</span>
                  <span className="font-extrabold text-slate-900 text-sm">₹{bookingSuccessTicket.fare}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate(`/track?id=${bookingSuccessTicket.bookingId}&phone=${bookingSuccessTicket.phone}`)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 px-6 rounded-xl shadow transition-all"
                >
                  Track Live GPS Status
                </button>
                <button
                  onClick={() => setBookingSuccessTicket(null)}
                  className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold py-2.5 px-6 rounded-xl transition-all"
                >
                  Book Another Ticket
                </button>
              </div>
            </motion.div>
          )}

          {/* SKELETON LOADING STATE */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white border border-slate-200/50 p-6 rounded-2xl shadow-sm space-y-4 animate-pulse">
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-slate-200 rounded w-1/3" />
                    <div className="h-5 bg-slate-200 rounded w-1/12" />
                  </div>
                  <div className="grid grid-cols-4 gap-4 pt-3 border-t border-slate-100">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                    <div className="h-4 bg-slate-200 rounded w-2/3" />
                    <div className="h-4 bg-slate-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : processedBuses.length > 0 ? (
            processedBuses.map((bus) => {
              const isExpanded = selectedBus?.id === bus.id;
              return (
                <div 
                  key={bus.id} 
                  className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
                    isExpanded ? 'ring-2 ring-indigo-500 border-transparent shadow-md' : 'border-slate-200/70 hover:border-slate-350'
                  }`}
                >
                  {/* Bus Card Basic info */}
                  <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-extrabold text-slate-800 text-base md:text-lg tracking-tight">{bus.operator}</h3>
                        <span className="inline-block text-[10px] bg-slate-150 text-slate-600 bg-slate-100 font-bold py-0.5 px-2 rounded border border-slate-200">
                          {bus.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                        <span>Departs: <strong className="text-slate-800">{bus.departure}</strong></span>
                        <span>•</span>
                        <span>Duration: <strong>{bus.duration}</strong></span>
                        <span>•</span>
                        <span>Arrives: <strong>{bus.arrival}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
                      {/* Price & Rating */}
                      <div className="text-left md:text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Fares starting</span>
                        <span className="font-extrabold text-indigo-600 text-lg md:text-xl">₹{bus.price}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold text-xs py-1 px-2.5 rounded-lg">
                          ★ {bus.rating}
                        </div>
                        <button
                          onClick={() => handleSelectBus(bus)}
                          className={`font-semibold text-sm py-2.5 px-5 rounded-xl transition-all ${
                            isExpanded 
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100 hover:shadow-indigo-200'
                          }`}
                        >
                          {isExpanded ? 'Close Map' : 'Select Seats'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Visual Seat Selection Area */}
                  <AnimatePresence>
                    {isExpanded && !bookingSuccessTicket && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-slate-100 bg-slate-50 overflow-hidden"
                      >
                        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                          
                          {/* Seat Map Selector */}
                          <div className="lg:col-span-7 space-y-6">
                            <div className="flex justify-between items-center pb-3 border-b border-slate-200/50">
                              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1.5">
                                <Users className="h-4 w-4 text-indigo-600" /> Interactive Seat Layout
                              </h4>
                              {bus.layout === 'sleeper' && (
                                <div className="flex bg-slate-200/80 p-0.5 rounded-lg">
                                  {['Lower', 'Upper'].map(deck => (
                                    <button
                                      key={deck}
                                      onClick={() => setActiveDeck(deck)}
                                      className={`text-xs font-bold px-3 py-1.5 rounded-md transition-all ${
                                        activeDeck === deck ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                                      }`}
                                    >
                                      {deck} Deck
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Driver and Cabin Reference */}
                            <div className="border border-slate-200 bg-white rounded-2xl p-6 relative">
                              <div className="absolute right-4 top-4 flex flex-col items-center border border-slate-200/70 p-2 rounded-lg text-slate-400 bg-slate-50">
                                <div className="w-8 h-8 rounded-full border-2 border-slate-300 border-t-indigo-500 border-r-indigo-500 transform rotate-45 mb-1 flex items-center justify-center text-[10px] font-extrabold text-indigo-600">D</div>
                                <span className="text-[9px] uppercase font-bold">Driver Cabin</span>
                              </div>

                              {/* Layout Rendering */}
                              <div className="flex flex-col gap-4 max-w-sm mx-auto pt-10">
                                {bus.layout === 'sleeper' ? (
                                  // Sleeper layout 2+1
                                  <div className="grid grid-cols-3 gap-y-3.5 gap-x-6">
                                    {/* Column labels A, B, C */}
                                    {seatMap
                                      .filter(seat => seat.deck === activeDeck)
                                      .map((seat) => {
                                        const isSelected = selectedSeats.find(s => s.id === seat.id);
                                        return (
                                          <button
                                            key={seat.id}
                                            disabled={seat.isBooked}
                                            onClick={() => handleSeatClick(seat)}
                                            className={`relative h-20 rounded-lg flex flex-col justify-between p-2 border transition-all ${
                                              seat.isBooked
                                                ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'
                                                : isSelected
                                                ? 'bg-orange-500 border-orange-600 text-white font-bold shadow-md shadow-orange-100'
                                                : 'bg-white border-slate-250 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/50'
                                            } ${seat.col === 2 ? 'mr-6' : ''}`}
                                          >
                                            <span className="text-[10px] font-semibold block">{seat.name}</span>
                                            <div className="w-full h-2 rounded bg-current/25" />
                                            <span className="text-[8px] uppercase tracking-wider font-bold">Sleeper</span>
                                          </button>
                                        );
                                      })}
                                  </div>
                                ) : (
                                  // Seater layout 2x2
                                  <div className="grid grid-cols-4 gap-y-3 gap-x-3.5">
                                    {seatMap.map((seat) => {
                                      const isSelected = selectedSeats.find(s => s.id === seat.id);
                                      return (
                                        <button
                                          key={seat.id}
                                          disabled={seat.isBooked}
                                          onClick={() => handleSeatClick(seat)}
                                          className={`relative h-11 rounded-lg flex flex-col justify-between p-1.5 border text-xs transition-all ${
                                            seat.isBooked
                                              ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'
                                              : isSelected
                                              ? 'bg-orange-500 border-orange-600 text-white font-bold shadow-md'
                                              : 'bg-white border-slate-250 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/50'
                                          } ${seat.col === 2 ? 'mr-6' : ''}`}
                                        >
                                          <span className="text-[9px] font-semibold">{seat.name}</span>
                                          <div className="w-full h-1 bg-current/20 rounded-full" />
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>

                              {/* Legenda color codes */}
                              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-5 border-t border-slate-100 text-xs text-slate-500 font-semibold">
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-white border border-slate-250 rounded" />
                                  <span>Available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-slate-200 border border-slate-300 rounded" />
                                  <span>Booked</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-orange-500 border border-orange-600 rounded" />
                                  <span>Selected</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Passenger Form & Checkout Sidebar */}
                          <div className="lg:col-span-5 space-y-6">
                            <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider pb-3 border-b border-slate-200/50">
                              Checkout Summary
                            </h4>

                            {selectedSeats.length === 0 ? (
                              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 text-sm">
                                <Users className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                                Please select at least one seat from the map to continue.
                              </div>
                            ) : (
                              <form onSubmit={proceedToCheckout} className="space-y-6">
                                {/* Passenger Input Blocks */}
                                <div className="space-y-4">
                                  {passengerDetails.map((passenger, index) => (
                                    <div key={passenger.seatId} className="bg-white p-4 border border-slate-200 rounded-2xl space-y-3 shadow-sm">
                                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                                        <span className="text-xs font-extrabold text-indigo-600 uppercase font-mono">Seat {passenger.seatName}</span>
                                        <span className="text-[10px] text-slate-400 font-semibold bg-slate-50 px-2 py-0.5 rounded border border-slate-200">Passenger {index + 1}</span>
                                      </div>
                                      <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
                                        <div className="sm:col-span-3">
                                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Full Name</label>
                                          <input
                                            type="text"
                                            required
                                            value={passenger.name}
                                            onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                                            placeholder="Enter passenger name"
                                            className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:border-indigo-500"
                                          />
                                        </div>
                                        <div className="sm:col-span-1.5 sm:col-span-1">
                                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Age</label>
                                          <input
                                            type="number"
                                            required
                                            min="1"
                                            max="120"
                                            value={passenger.age}
                                            onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                                            placeholder="24"
                                            className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:border-indigo-500"
                                          />
                                        </div>
                                        <div className="sm:col-span-2">
                                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Gender</label>
                                          <select
                                            value={passenger.gender}
                                            onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                                            className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:border-indigo-500"
                                          >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Contact Details */}
                                <div className="bg-white p-4 border border-slate-200 rounded-2xl space-y-3.5 shadow-sm">
                                  <h5 className="font-bold text-slate-700 text-xs uppercase tracking-wider pb-1.5 border-b border-slate-100 flex items-center gap-1.5">
                                    <Shield className="h-4 w-4 text-indigo-650 text-indigo-600" /> Contact Notification Details
                                  </h5>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Email ID</label>
                                      <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="passenger@domain.com"
                                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:border-indigo-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Mobile Phone</label>
                                      <input
                                        type="tel"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="9876543210"
                                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:border-indigo-500"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Boarding and Dropping points selection */}
                                <div className="bg-white p-4 border border-slate-200 rounded-2xl space-y-3.5 shadow-sm">
                                  <h5 className="font-bold text-slate-700 text-xs uppercase tracking-wider pb-1.5 border-b border-slate-100">
                                    Boarding & Dropping Terminals
                                  </h5>
                                  <div className="grid grid-cols-1 gap-3">
                                    <div>
                                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Select Boarding Point</label>
                                      <select
                                        value={selectedBoarding}
                                        onChange={(e) => setSelectedBoarding(e.target.value)}
                                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:border-indigo-500"
                                      >
                                        {bus.boardingPoints.map((bp, i) => (
                                          <option key={i} value={bp}>{bp}</option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Select Dropping Point</label>
                                      <select
                                        value={selectedDropping}
                                        onChange={(e) => setSelectedDropping(e.target.value)}
                                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:border-indigo-500"
                                      >
                                        {bus.droppingPoints.map((dp, i) => (
                                          <option key={i} value={dp}>{dp}</option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                {/* Promo Code application */}
                                <div className="bg-white p-4 border border-slate-200 rounded-2xl shadow-sm space-y-3">
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      placeholder="COUPON CODE"
                                      value={promoCode}
                                      onChange={(e) => setPromoCode(e.target.value)}
                                      className="flex-1 text-xs font-bold font-mono tracking-wider bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 uppercase focus:outline-none"
                                    />
                                    <button
                                      type="button"
                                      onClick={applyPromo}
                                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 px-4 rounded-lg transition-colors shrink-0"
                                    >
                                      Apply
                                    </button>
                                  </div>
                                  {promoError && <p className="text-[10px] text-red-500 font-bold">{promoError}</p>}
                                  {appliedPromo && (
                                    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-2.5 flex items-center justify-between">
                                      <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-semibold">
                                        <Tag className="h-4 w-4 text-indigo-600 shrink-0" />
                                        <span>Code <strong className="font-mono text-indigo-900">{appliedPromo.code}</strong> Applied</span>
                                      </div>
                                      <button 
                                        type="button" 
                                        onClick={removePromo} 
                                        className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  )}
                                </div>

                                {/* Calculation details & Checkout Button */}
                                <div className="bg-indigo-900 text-indigo-100 rounded-2xl p-5 space-y-3.5 shadow-md">
                                  <div className="flex justify-between text-xs">
                                    <span>Subtotal ({selectedSeats.length} seats)</span>
                                    <span>₹{calculation.subtotal}</span>
                                  </div>
                                  {calculation.discount > 0 && (
                                    <div className="flex justify-between text-xs text-orange-300">
                                      <span>Promo discount</span>
                                      <span>- ₹{calculation.discount}</span>
                                    </div>
                                  )}
                                  <div className="flex justify-between font-bold text-sm text-white pt-2.5 border-t border-indigo-850 border-white/10">
                                    <span>Total Payable Fare</span>
                                    <span className="text-base text-orange-400 font-extrabold">₹{calculation.total}</span>
                                  </div>

                                  <button
                                    type="submit"
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-3 rounded-xl shadow-lg transition-all duration-200 mt-2 flex items-center justify-center gap-1.5 hover:-translate-y-0.5"
                                  >
                                    <span>Proceed to Payment</span>
                                  </button>
                                </div>
                              </form>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="bg-white border border-slate-200/50 p-12 rounded-3xl text-center shadow-sm">
              <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-bold text-slate-800 text-lg mb-1">No Buses Found</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                We couldn't find any direct buses matching this route on the selected date. Try searching for active routes like <strong>New Delhi ↔ Jaipur</strong> or <strong>Mumbai ↔ Pune</strong>.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* PAYMENT MODAL MOCK */}
      <AnimatePresence>
        {showPayment && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100"
            >
              <div className="bg-indigo-900 p-5 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-orange-400" />
                  <span className="font-bold font-display text-base">Razorpay Checkout Gateway</span>
                </div>
                <button 
                  onClick={() => setShowPayment(false)}
                  className="text-indigo-200 hover:text-white text-xs font-bold"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={simulatePaymentSubmit} className="p-6 space-y-6">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Merchant</span>
                    <span className="font-bold text-slate-800 text-sm">Ant Travels Private Ltd.</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Amount to Pay</span>
                    <span className="font-extrabold text-indigo-600 text-lg">₹{calculation.total}</span>
                  </div>
                </div>

                {/* Tab selector for mode */}
                <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl">
                  {['card', 'upi', 'wallet'].map(mode => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setPaymentMode(mode)}
                      className={`text-xs font-bold py-2 rounded-lg transition-all capitalize ${
                        paymentMode === mode ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {paymentMode === 'card' && (
                    <>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Card Number</label>
                        <input
                          type="text"
                          required
                          placeholder="4111 2222 3333 4444"
                          maxLength={19}
                          value={cardNo}
                          onChange={(e) => setCardNo(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                          className="w-full text-xs font-bold font-mono tracking-wider bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-700 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            required
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-700 text-center focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">CVV Code</label>
                          <input
                            type="password"
                            required
                            placeholder="•••"
                            maxLength={3}
                            className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-700 text-center focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          required
                          placeholder="AS WRITTEN ON CARD"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value.toUpperCase())}
                          className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-700 focus:outline-none"
                        />
                      </div>
                    </>
                  )}

                  {paymentMode === 'upi' && (
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">UPI Address (VPA)</label>
                      <input
                        type="text"
                        required
                        placeholder="username@okaxis"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-700 focus:outline-none"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">A request will be sent to your UPI app.</p>
                    </div>
                  )}

                  {paymentMode === 'wallet' && (
                    <div className="space-y-3">
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Select Wallet Provider</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Paytm', 'PhonePe', 'Amazon Pay', 'Google Pay'].map(prov => (
                          <label key={prov} className="border border-slate-200 rounded-xl p-3.5 flex items-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors">
                            <input type="radio" name="wallet-prov" defaultChecked={prov === 'Paytm'} className="text-indigo-600 focus:ring-0" />
                            <span className="text-xs font-bold text-slate-700">{prov}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={processingPayment}
                  className="w-full bg-emerald-500 hover:bg-emerald-650 hover:bg-emerald-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {processingPayment ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                      <span>Authorizing transaction...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 text-orange-300" />
                      <span>Pay ₹{calculation.total} Securely</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchResults;
