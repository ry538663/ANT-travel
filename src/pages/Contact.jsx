import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please fill in your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!subject.trim()) {
      setError('Please specify a subject.');
      return;
    }
    if (!message.trim() || message.length < 10) {
      setError('Message should be at least 10 characters long.');
      return;
    }

    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-indigo-650 text-indigo-650 text-indigo-650 text-indigo-650 text-indigo-600 font-bold uppercase tracking-wider text-xs block mb-1">Get In Touch</span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900">Contact Us</h1>
        <p className="text-slate-500 text-sm md:text-base mt-2">
          Have queries regarding booking cancellations, luggage policies, or route tie-ups? Drop us a message or call our 24/7 support line.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Contact Cards */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-1">Phone Number</h3>
              <p className="text-xs text-slate-650 text-slate-650 text-slate-500 font-semibold leading-relaxed">
                +91 98765 43210 (24x7 Customer Support Hotline)
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 shadow-sm">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-1">Support Email</h3>
              <p className="text-xs text-slate-650 text-slate-650 text-slate-500 font-semibold leading-relaxed">
                info@anttravels.com<br />billing@anttravels.com
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-1">Corporate Office</h3>
              <p className="text-xs text-slate-650 text-slate-650 text-slate-500 font-semibold leading-relaxed">
                123, Ant Tower, Sector 62, Noida, Uttar Pradesh, India
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-8 bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-2.5">
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 pl-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-sm font-semibold text-slate-800 focus:outline-none"
                />
              </div>
              <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-2.5">
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 pl-1">Email ID</label>
                <input
                  type="email"
                  required
                  placeholder="passenger@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-sm font-semibold text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-2.5">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 pl-1">Subject</label>
              <input
                type="text"
                required
                placeholder="Booking Query / Corporate Charter / Refund status"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-transparent border-none p-0 text-sm font-semibold text-slate-800 focus:outline-none"
              />
            </div>

            <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-2.5">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 pl-1">Message Description</label>
              <textarea
                required
                rows={5}
                placeholder="Describe your query in detail (minimum 10 characters)..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border-none p-0 text-sm font-semibold text-slate-800 focus:outline-none resize-none"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs font-semibold flex items-center gap-1">
                <ShieldAlert className="h-4 w-4" />
                <span>{error}</span>
              </p>
            )}

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold py-3 px-4 rounded-xl flex items-center gap-2"
                >
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-600" />
                  <span>Your message has been sent successfully. Our support desk will reach out in 24 hours.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-8 rounded-2xl shadow transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Corporate Map embedding */}
      <div className="mt-20 space-y-4">
        <h3 className="font-bold text-slate-800 text-base font-display">Corporate Office Location</h3>
        <div className="rounded-3xl border border-slate-200/60 overflow-hidden h-96 shadow-md bg-slate-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5620245229797!2d77.36224377626207!3d28.612911975675677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce561c569ffcd%3A0xb60657eea5234f2a!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1783958000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ant Travels Noida Location"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>

    </div>
  );
};

export default Contact;
