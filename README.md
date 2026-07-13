# Ant Travels — Premium Intercity Bus Ticket Booking Website

A modern, production-ready travel booking and charter agency website for **Ant Travels** (originally replacing an old ASP.NET 2009 portal). Built using the latest modern React stack and high-fidelity CSS styling.

---

## 🚀 Tech Stack & Package Matrix

- **Framework Core**: React.js (v19) via Vite
- **Styling Pipeline**: Tailwind CSS (v3) + PostCSS + Autoprefixer
- **Navigation Router**: React Router DOM (v6)
- **Visual Animations**: Framer Motion
- **Icon Assets**: Lucide React
- **Payment Verification Mock**: Razorpay simulated checkout gateway
- **AI Support Assistant**: Keyword NLP matcher + context-simulated conversational LLM agent

---

## 📂 Codebase Directory Layout

```
/Users/rohityadav/Documents/ANT BUS/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── README.md
├── src/
│   ├── main.jsx
│   ├── index.css
│   ├── App.jsx
│   ├── App.css (Cleared)
│   ├── components/
│   │   ├── Common/
│   │   │   ├── Navbar.jsx        <- Responsive sticky menu with contact hotline highlight
│   │   │   ├── Footer.jsx        <- Link grids, secure payment badge, newsletter form
│   │   │   └── GlassCard.jsx     <- Custom glassmorphism layout card container
│   │   ├── Booking/
│   │   │   └── SearchWidget.jsx  <- Auto-suggestion city inputs, date checker & validation
│   │   └── Chatbot/
│   │       └── FloatingChatbot.jsx <- Collapsible conversation support console with FAQs
│   ├── pages/
│   │   ├── Home.jsx              <- Animated hero, top routes grid, client reviews, banners
│   │   ├── SearchResults.jsx     <- Skeleton screens, filters, interactive seat map & payment
│   │   ├── TrackBooking.jsx      <- Ticket tracking, live progress checkpoints, cancellations
│   │   ├── Services.jsx          <- Descriptive list of travel services
│   │   ├── Fleet.jsx             <- Grid displaying luxury coach specs and amenities
│   │   ├── Offers.jsx            <- active deals with copyable voucher codes
│   │   ├── About.jsx             <- History since 2009, organizational stats, core values
│   │   └── Contact.jsx           <- Direct details, validated input form, simulated HQ map
│   └── utils/
│       └── mockData.js           <- Master cities, route prices, bus lists, FAQ data
```

---

## 🛠️ Getting Started & Setup Instructions

### 1. Install Project Dependencies
Run the installation command in your workspace directory to download all required modules:
```bash
npm install
```

### 2. Launch Local Development Server
Start the Vite dev server locally to preview the website interface:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser.

### 3. Build Production Bundle
To compile and optimize the site for production hosting deployment:
```bash
npm run build
```
This outputs production assets to the `dist/` directory.

---

## 💡 Key Interactive Features

1. **Interactive Booking Engine**: Search for valid routes (e.g. `New Delhi` to `Jaipur` or `Mumbai` to `Pune`). View listings, filter by AC or sleeper coach, toggle decks, select seats visually, apply promo `ANTFIRST`, and complete mock Razorpay checkouts.
2. **Real-time GPS Tracking**: Enter Booking ID `ANT10293` or `ANT39201` and phone number on the Track Booking page to monitor transit checkpoints and active route coordinates.
3. **Cancel & Refund Estimation**: Simulated cancellation panels calculate standard deductions and refunds in real time.
4. **Contextual FAQ Chatbot**: Use the bottom-right bubble to chat with the support AI. Supports one-click buttons or direct typing questions about cancellations, luggage, contact details, or active discount codes.
