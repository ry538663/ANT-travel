import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Common Components
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import FloatingChatbot from './components/Chatbot/FloatingChatbot';

// Pages
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import TrackBooking from './pages/TrackBooking';
import Services from './pages/Services';
import Fleet from './pages/Fleet';
import Offers from './pages/Offers';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 font-sans antialiased text-slate-800">
        {/* Navigation Bar */}
        <Navbar />

        {/* Dynamic Page Views */}
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/track" element={<TrackBooking />} />
            <Route path="/services" element={<Services />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Catch-all fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Floating AI Support Desk Widget */}
        <FloatingChatbot />

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
