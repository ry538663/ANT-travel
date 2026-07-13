import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneVal, setPhoneVal] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setSubmitting(true);

    // Minor validation
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please fill out all required fields.');
      setSubmitting(false);
      return;
    }

    if (isLoginTab) {
      // Login flow
      setTimeout(() => {
        const result = login(email, password);
        setSubmitting(false);
        if (result.success) {
          setSuccessMsg('Logged in successfully!');
          setTimeout(() => {
            onClose();
            // reset
            setEmail('');
            setPassword('');
          }, 1000);
        } else {
          setErrorMsg(result.message);
        }
      }, 1000);
    } else {
      // Register flow
      if (!name.trim() || !phoneVal.trim()) {
        setErrorMsg('Please enter your full name and phone number.');
        setSubmitting(false);
        return;
      }

      setTimeout(() => {
        const result = register(name, email, phoneVal, password);
        setSubmitting(false);
        if (result.success) {
          setSuccessMsg('Account created successfully!');
          setTimeout(() => {
            onClose();
            // reset
            setName('');
            setEmail('');
            setPhoneVal('');
            setPassword('');
          }, 1000);
        } else {
          setErrorMsg(result.message);
        }
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white border border-slate-200 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Banner */}
        <div className="bg-indigo-900 text-white p-6 pt-8 text-center relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
          <h3 className="font-display font-extrabold text-2xl tracking-tight">
            ANT <span className="text-orange-400">TRAVELS</span>
          </h3>
          <p className="text-[10px] text-indigo-200 tracking-widest font-bold uppercase mt-0.5">THE LUXURY WAY</p>
        </div>

        {/* Tabs switcher */}
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          <button
            onClick={() => {
              setIsLoginTab(true);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              isLoginTab 
                ? 'border-indigo-600 text-indigo-650 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setIsLoginTab(false);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              !isLoginTab 
                ? 'border-indigo-600 text-indigo-650 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          
          {/* Notification Messages */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs py-3 px-4 rounded-xl flex items-center gap-2 mb-4">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
              <span className="font-semibold leading-relaxed">{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-xs py-3 px-4 rounded-xl flex items-center gap-2 mb-4">
              <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
              <span className="font-semibold leading-relaxed">{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name (Register tab only) */}
            {!isLoginTab && (
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-bold text-slate-400 pl-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-slate-400 pl-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Phone Number (Register tab only) */}
            {!isLoginTab && (
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-bold text-slate-400 pl-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 9811992203"
                    value={phoneVal}
                    onChange={(e) => setPhoneVal(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-slate-400 pl-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-indigo-650 hover:bg-indigo-700 bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow shadow-indigo-100 hover:shadow-md transition-all flex justify-center items-center gap-2 mt-6"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>{isLoginTab ? 'Sign In to Account' : 'Create Customer Account'}</span>
              )}
            </button>

          </form>

          {/* Quick instructions indicator */}
          {isLoginTab && (
            <div className="mt-5 text-center">
              <p className="text-[10px] text-slate-500">
                Want to test? Use default login:
                <span className="font-bold text-indigo-600 block mt-0.5">rohit@gmail.com / password123</span>
              </p>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;
