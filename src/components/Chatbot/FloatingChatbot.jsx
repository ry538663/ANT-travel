import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, HelpCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_DATA } from '../../utils/mockData';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Namaste! 🙏 Welcome to Ant Travels support. I am your AI travel companion. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickReplies = [
    { label: "Cancellation Policy", query: "cancellation" },
    { label: "Track My Bus", query: "track booking" },
    { label: "Discount Offers", query: "coupon offers" },
    { label: "Support Hotline", query: "contact phone number" }
  ];

  const getSystemResponse = (userInput) => {
    const cleanInput = userInput.toLowerCase().trim();
    
    // Check against FAQ keywords
    for (let faq of FAQ_DATA) {
      const match = faq.keywords.some(keyword => cleanInput.includes(keyword));
      if (match) {
        return faq.answer;
      }
    }

    // Default simulated LLM fallback
    return `As the Ant Travels AI assistant, I can assist you with details regarding our luxury fleet, route availability, cancellation guidelines, and refund status. 

For your query regarding "${userInput}", let me guide you:
- For booking details or status queries, navigate to the **My Bookings / Track Booking** tab.
- For direct ticket cancellations, enter your Booking ID in the tracking page. Cancelling 24 hours prior offers a 90% refund.
- You can reach our support office directly at **+91 98765 43210** or email **info@anttravels.com** for emergency billing.

Is there any specific route (e.g. Delhi to Jaipur, Mumbai to Pune) or coupon you would like to know about?`;
  };

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    // Append user message
    const userMsg = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Trigger typing state
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const replyText = getSystemResponse(textToSend);
      const botMsg = {
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat window console */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-[340px] sm:w-[380px] h-[500px] bg-white border border-slate-200/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col mb-4"
          >
            {/* Header */}
            <div className="bg-indigo-900 text-white p-4 flex justify-between items-center shadow-sm shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-800 flex items-center justify-center border border-indigo-700">
                  <Bot className="h-4.5 w-4.5 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-bold text-xs font-display">Ant Travels Assistant</h3>
                  <span className="text-[9px] text-green-400 font-bold block">Online • Instant Answers</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-indigo-200 hover:text-white transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, index) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div key={index} className={`flex ${isBot ? 'justify-start' : 'justify-end'} gap-2.5`}>
                    {isBot && (
                      <div className="w-7 h-7 rounded-full bg-indigo-900 flex items-center justify-center text-orange-400 text-xs shrink-0 shadow-sm">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                    )}
                    <div className="max-w-[75%] space-y-1">
                      <div className={`rounded-2xl py-2 px-3.5 text-xs shadow-sm whitespace-pre-line leading-relaxed ${
                        isBot 
                          ? 'bg-white text-slate-800 border border-slate-200/50' 
                          : 'bg-indigo-600 text-white font-medium'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-slate-400 pl-1 font-semibold">{msg.time}</span>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator bubble */}
              {isTyping && (
                <div className="flex justify-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-indigo-900 flex items-center justify-center text-orange-400 text-xs shrink-0">
                    <Bot className="h-3.5 w-3.5 animate-pulse" />
                  </div>
                  <div className="bg-white border border-slate-200/50 rounded-2xl py-2 px-3.5 shadow-sm">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 py-2 border-t border-slate-100 bg-white flex gap-1.5 overflow-x-auto hide-scrollbar shrink-0">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(reply.query)}
                  className="bg-slate-50 hover:bg-indigo-50 border border-slate-200/70 hover:border-indigo-200 text-slate-650 hover:text-indigo-600 text-[10px] py-1.5 px-3 rounded-full font-bold transition-all whitespace-nowrap shrink-0"
                >
                  {reply.label}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} 
              className="p-3 border-t border-slate-100 bg-white flex gap-2 shrink-0"
            >
              <input
                type="text"
                placeholder="Ask about refunds, cancellation, codes..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200/70 rounded-2xl py-2 px-3.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-500 placeholder-slate-400"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-8.5 h-8.5 w-9 h-9 rounded-2xl bg-indigo-600 hover:bg-indigo-750 hover:bg-indigo-700 text-white flex items-center justify-center transition-colors shadow shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-700 hover:from-indigo-755 text-white flex items-center justify-center shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transition-all transform hover:scale-105"
        title="AI Help Desk"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border border-indigo-600 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border border-indigo-600" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default FloatingChatbot;
