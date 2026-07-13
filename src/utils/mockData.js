// Mock Data for Ant Travels Website

export const CITIES = [
  "New Delhi",
  "Jaipur",
  "Mumbai",
  "Pune",
  "Bengaluru",
  "Chennai",
  "Hyderabad",
  "Ahmedabad",
  "Agra",
  "Manali"
];

export const POPULAR_ROUTES = [
  { from: "New Delhi", to: "Jaipur", price: "499", time: "5h 30m", image: "https://images.unsplash.com/photo-1477584322813-ac7c2a7e7514?auto=format&fit=crop&w=400&q=80" },
  { from: "Mumbai", to: "Pune", price: "299", time: "3h 15m", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80" },
  { from: "Bengaluru", to: "Chennai", price: "599", time: "6h 00m", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80" },
  { from: "New Delhi", to: "Manali", price: "999", time: "11h 45m", image: "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=400&q=80" },
  { from: "Bengaluru", to: "Hyderabad", price: "699", time: "8h 15m", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=400&q=80" }
];

export const OFFERS = [
  {
    code: "ANTFIRST",
    discount: "Flat 15% OFF",
    description: "Get 15% off up to ₹150 on your first booking with us.",
    validTill: "31st Dec 2026",
    terms: "No minimum booking value. Valid for new users only."
  },
  {
    code: "FESTIVE20",
    discount: "Save 20%",
    description: "Special festive discount on bookings above ₹999.",
    validTill: "30th Nov 2026",
    terms: "Minimum ticket value of ₹999 required."
  },
  {
    code: "WEEKENDSLAY",
    discount: "Flat ₹100 Off",
    description: "Slash weekend ticket prices on selected routes.",
    validTill: "31st Oct 2026",
    terms: "Valid on Saturday and Sunday journeys only."
  },
  {
    code: "CORPANT",
    discount: "Flat 10% OFF",
    description: "Corporate tie-up offer for regular business travelers.",
    validTill: "31st Dec 2026",
    terms: "Requires verification using official corporate email ID."
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Aman Sharma",
    role: "Regular Traveler",
    rating: 5,
    text: "Ant Travels has completely transformed my weekend commutes between Delhi and Jaipur. The premium sleeper buses are exceptionally clean, and the staff is extremely professional.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 2,
    name: "Sneha Patel",
    role: "Business Consultant",
    rating: 5,
    text: "I booked an Ant Travels Scania Coach for our team retreat. Everything was seamless, the live tracking was extremely precise, and the seats were plush with reading lights and charging ports.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Tech Lead",
    rating: 4,
    text: "Very reliable service. The booking application is smooth, and the floating AI chatbot gave me prompt refund details when I had to cancel my trip last minute. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

export const SERVICES = [
  {
    id: "booking",
    title: "Bus Ticket Booking",
    description: "Easy and quick reservation system for intercity travel across India with customizable seat choices.",
    icon: "Tickets"
  },
  {
    id: "tracking",
    title: "Live Bus Tracking",
    description: "Real-time GPS tracking of your scheduled bus so you never miss your boarding or worry about delays.",
    icon: "MapPin"
  },
  {
    id: "corporate",
    title: "Corporate Travel",
    description: "Tailored transit plans, bulk invoice processing, and priority assistance for corporate teams.",
    icon: "Briefcase"
  },
  {
    id: "packages",
    title: "Tour Packages",
    description: "Curated multi-day vacation packages to popular destinations including premium stays and luxury travel.",
    icon: "Compass"
  },
  {
    id: "cabs",
    title: "Cab Booking",
    description: "Last-mile connectivity with premium local and outstation taxi pickups at major terminal drop-points.",
    icon: "Car"
  },
  {
    id: "charter",
    title: "Luxury Bus Charters",
    description: "Rent our entire ultra-luxury Volvo or Scania coach for family events, weddings, and group excursions.",
    icon: "ShieldAlert"
  }
];

export const FLEET = [
  {
    id: "swift-dzire",
    name: "Swift Dzire Car Hire in Delhi",
    category: "cars",
    type: "AC Sedan (Swift Dzire)",
    capacity: "4 Passengers + 1 Driver",
    rate: "₹11/km",
    amenities: ["AC", "Luggage Carrier", "Aux Input", "First Aid Box", "Clean Seat Covers"],
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
    description: "Compact sedan perfect for quick Delhi NCR corporate commutes or airport transfer pickups.",
    rentalDetails: {
      pricingTable: [
        { service: "Local Run", package: "8 Hours / 80 KM", price: "Rs.2,000 - 2,500" },
        { service: "Local Run", package: "12 Hours / 120 KM", price: "Rs.3,000 - 3,500" },
        { service: "Extra KM", package: "Local", price: "Rs.11/km" },
        { service: "Extra Hour", package: "Local", price: "Rs.150" },
        { service: "Airport Pickup & Drop", package: "Delhi IGI Airport", price: "Rs.1,200 - 1,500" },
        { service: "Airport Pickup & Drop", package: "Noida Jewar Airport", price: "Rs.1,800 - 2,200" },
        { service: "Railway Station Drop", package: "New Delhi Railway Station", price: "Rs.800 - 1,000" },
        { service: "Outstation Trip", package: "Per KM", price: "Rs.11/km" },
        { service: "Driver Allowance", package: "Per Day", price: "Rs.500" }
      ],
      services: [
        "Airport Pickup & Drop",
        "Corporate Car Rental",
        "Wedding Transportation",
        "Business Meetings",
        "Outstation Trips",
        "Delhi Sightseeing Tour",
        "Family Vacations",
        "VIP Guest Transportation"
      ],
      faqs: [
        { q: "Is Swift Dzire available for Noida airport pickup?", a: "Yes. We provide timely airport pickup and drop from IGI Airport and Noida Jewar Airport." },
        { q: "Can I hire a Swift Dzire for outstation trips?", a: "Yes. You can rent our cars for outstation routes like Jaipur, Agra, Haridwar, Chandigarh, and Shimila." },
        { q: "Is the driver allowance included?", a: "Driver allowance is Rs.500 per day for outstation journeys, charged extra. Local drivers are covered." }
      ],
      routes: [
        "Delhi → Jaipur", "Delhi → Agra", "Delhi → Haridwar", "Delhi → Chandigarh", "Delhi → Dehradun"
      ]
    }
  },
  {
    id: "toyota-innova",
    name: "Toyota Innova Car Rental Delhi",
    category: "cars",
    type: "Premium MPV (Toyota Innova)",
    capacity: "6-7 Passengers",
    rate: "₹15/km",
    amenities: ["Dual AC", "Music System", "GPS Tracker", "Luggage Roof Carrier", "Water Bottle"],
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=600&q=80",
    description: "The ultimate family MPV, delivering unmatched comfort for long outstation journeys and weekend tours.",
    rentalDetails: {
      pricingTable: [
        { service: "Local", package: "8 Hours / 80 KM", price: "Rs.4,000 - 4,500" },
        { service: "Local", package: "12 Hours / 120 KM", price: "Rs.5,500 - 6,500" },
        { service: "Extra KM", package: "Local", price: "Rs.22/km" },
        { service: "Extra Hour", package: "Local", price: "Rs.300" },
        { service: "Airport Pickup & Drop", package: "Delhi IGI Airport", price: "Rs.2,500 - 3,500" },
        { service: "Airport Pickup & Drop", package: "Noida Jewar Airport", price: "Rs.3,000 - 4,000" },
        { service: "Railway Station Pickup & Drop", package: "New Delhi Railway Station", price: "Rs.2,000 - 2,500" },
        { service: "Railway Station Pickup & Drop", package: "Old Delhi Railway Station", price: "Rs.2,000 - 2,500" },
        { service: "Railway Station Pickup & Drop", package: "Anand Vihar Railway Station", price: "Rs.2,000 - 2,500" },
        { service: "Railway Station Pickup & Drop", package: "Hazrat Nizamuddin Railway Station", price: "Rs.2,000 - 2,500" },
        { service: "Outstation", package: "Per KM", price: "Rs.22/km" },
        { service: "Driver Allowance", package: "Per Day", price: "Rs.500" }
      ],
      services: [
        "Airport Pickup & Drop",
        "Corporate Car Rental",
        "Wedding Transportation",
        "Business Meetings",
        "Outstation Trips",
        "Jaipur Tour",
        "Agra Tour",
        "Haridwar Rishikesh Tour",
        "Mathura Vrindavan Tour",
        "Delhi Sightseeing",
        "Family Vacation",
        "VIP Guest Transportation"
      ],
      faqs: [
        { q: "Is Toyota Innova Crysta available for airport pickup?", a: "Yes. We provide airport pickup and drop from IGI Airport Terminal 1, Terminal 2 and Terminal 3. Also Noida Airport." },
        { q: "Can I hire Innova for outstation travel?", a: "Yes. You can hire Innova Crysta for Jaipur, Agra, Haridwar, Chandigarh, Shimla, Manali and other destinations." },
        { q: "Is driver included?", a: "Yes. Professional chauffeur is included with every booking." },
        { q: "What is included in local package?", a: "8 Hours / 80 KM or 12 Hours / 120 KM. Extra hours and kilometres are charged separately." },
        { q: "Can I book for weddings?", a: "Yes. We provide Innova Crysta for weddings, corporate events and VIP guest transportation." }
      ],
      routes: [
        "Delhi → Jaipur", "Delhi → Agra", "Delhi → Haridwar", "Delhi → Rishikesh", "Delhi → Chandigarh",
        "Delhi → Shimla", "Delhi → Manali", "Delhi → Dehradun", "Delhi → Mathura", "Delhi → Vrindavan"
      ]
    }
  },
  {
    id: "toyota-fortuner",
    name: "Toyota Fortuner Hire in Delhi NCR",
    category: "cars",
    type: "Luxury SUV (Toyota Fortuner)",
    capacity: "7 Passengers",
    rate: "₹40/km",
    amenities: ["Leather Seats", "Dual Zone AC", "Touchscreen Audio", "4x4 Capability", "VIP Number"],
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
    description: "Premium high-ground SUV for executive corporate visits, weddings, and premium VIP rentals in Delhi NCR.",
    rentalDetails: {
      pricingTable: [
        { service: "Local", package: "8 Hours / 80 KM", price: "Rs.9,000 - 10,000" },
        { service: "Local", package: "12 Hours / 120 KM", price: "Rs.12,000 - 14,000" },
        { service: "Extra KM", package: "Local", price: "Rs.40/km" },
        { service: "Extra Hour", package: "Local", price: "Rs.600" },
        { service: "Airport Pickup & Drop", package: "Delhi IGI Airport", price: "Rs.5,500 - 6,500" },
        { service: "Airport Pickup & Drop", package: "Noida Jewar Airport", price: "Rs.6,000 - 7,000" },
        { service: "Railway Station Pickup & Drop", package: "New Delhi Railway Station", price: "Rs.4,500 - 5,500" },
        { service: "Outstation", package: "Per KM", price: "Rs.40/km" },
        { service: "Driver Allowance", package: "Per Day", price: "Rs.500" }
      ],
      services: [
        "Airport Pickup & Drop",
        "Corporate SUV Rental",
        "Wedding VIP Transport",
        "VIP Guest Transportation",
        "Business Delegations",
        "Outstation Luxury Trips"
      ],
      faqs: [
        { q: "Is Toyota Fortuner available for wedding transportation?", a: "Yes. We offer premium white Fortuners with professional chauffeurs decorated for VIP wedding usage." },
        { q: "What is the per kilometer outstation charge?", a: "The rate is Rs.40 per KM with a minimum daily run limit and Rs.500 driver allowance." }
      ],
      routes: [
        "Delhi → Jaipur", "Delhi → Agra", "Delhi → Haridwar", "Delhi → Dehradun", "Delhi → Chandigarh"
      ]
    }
  },
  {
    id: "taxi-service",
    name: "Taxi Service in Noida",
    category: "cars",
    type: "Standard AC Cab",
    capacity: "4 Passengers",
    rate: "₹10/km",
    amenities: ["AC", "24/7 Availability", "Professional Driver", "Luggage Space"],
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=600&q=80",
    description: "Affordable local Noida point-to-point drop taxi and corporate cab service.",
    rentalDetails: {
      pricingTable: [
        { service: "Local Noida Cab", package: "Point to Point Drop", price: "Rs.10/km" },
        { service: "Airport Transfer", package: "Noida to IGI Airport", price: "Rs.1,500" },
        { service: "Noida Station Drop", package: "Noida to NDLS Station", price: "Rs.1,000" }
      ],
      services: ["Local Point-to-Point", "Airport Commutes", "Railway Drops", "Noida local sectors transport"],
      faqs: [
        { q: "Do you offer cab pick ups from Noida Sector 62?", a: "Yes. We cover all sectors including Sector 61, 62, 63, and Greater Noida with 24x7 bookings." }
      ],
      routes: ["Noida → Delhi Airport", "Noida → New Delhi Station", "Noida → Ghaziabad", "Noida → Gurugram"]
    }
  },
  {
    id: "car-hire-noida",
    name: "Car Hire in Noida Delhi NCR",
    category: "cars",
    type: "Executive AC Sedan",
    capacity: "4 Passengers",
    rate: "₹12/km",
    amenities: ["AC", "USB Charger", "Bottled Water", "English Speaking Driver"],
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
    description: "Hourly and daily rental packages for executives and tourist travel inside Noida and Delhi NCR.",
    rentalDetails: {
      pricingTable: [
        { service: "Local Hire", package: "8 Hours / 80 KM", price: "Rs.2,200" },
        { service: "Local Hire", package: "12 Hours / 120 KM", price: "Rs.3,200" },
        { service: "Extra KM", package: "Local Run", price: "Rs.12/km" }
      ],
      services: ["Executive Cabs", "Hourly Local Rental", "Business Trips"],
      faqs: [
        { q: "Can I book the car on an hourly rental basis?", a: "Yes. We offer standard packages of 8 Hours / 80 KM and 12 Hours / 120 KM for local runs." }
      ],
      routes: ["Delhi NCR Local Runs", "Noida Local sectors"]
    }
  },
  {
    id: "char-dham-car",
    name: "Car Hire for Char Dham Yatra 2026",
    category: "cars",
    type: "Hill-Spec SUV (Innova/Crysta)",
    capacity: "6-7 Passengers",
    rate: "Custom Package",
    amenities: ["Carrier", "Hill Driving Expert Driver", "First Aid Kit", "Oxygen Bottle Placeholder", "Mineral Water"],
    image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=600&q=80",
    description: "Specially prepared vehicles with seasoned hill-drivers for the holy Char Dham pilgrimage.",
    rentalDetails: {
      pricingTable: [
        { service: "Char Dham Yatra Package", package: "10 Days Complete Tour", price: "Rs.45,000 - 55,000" },
        { service: "Do Dham Yatra Package", package: "7 Days Tour", price: "Rs.35,000 - 40,000" },
        { service: "Driver Allowance", package: "Per Day (Hills)", price: "Rs.600" }
      ],
      services: ["Char Dham Tour Package", "Kedarnath Badrinath Pilgrimage", "Uttarakhand Mountain Tours"],
      faqs: [
        { q: "Are drivers experienced in mountain driving?", a: "Yes. All our Char Dham tour captains hold hill-licensing certificates and have 10+ years of driving experience." }
      ],
      routes: ["Delhi → Haridwar → Barkot → Uttarkashi → Guptkashi → Badrinath → Rishikesh → Delhi"]
    }
  },
  {
    id: "9-seater-traveller",
    name: "9 Seater Luxury Traveller Hire",
    category: "travellers",
    type: "Luxury Minivan (9 Seater)",
    capacity: "9 Berths / Seater",
    rate: "₹22/km",
    amenities: ["Reclining Seats", "LCD Screen", "AC vents per seat", "WiFi", "Ample Cargo Space"],
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=600&q=80",
    description: "Ultra-premium tempo traveller with pushback luxury seats ideal for small family groups.",
    rentalDetails: {
      pricingTable: [
        { service: "Local Run", package: "8 Hours / 80 KM", price: "Rs.5,000 - 5,550" },
        { service: "Local Run", package: "12 Hours / 120 KM", price: "Rs.7,500 - 8,000" },
        { service: "Extra KM", package: "Local Run", price: "Rs.22/km" },
        { service: "Extra Hour", package: "Local Run", price: "Rs.300" },
        { service: "Airport Pickup & Drop", package: "Delhi IGI Airport", price: "Rs.3,500 - 4,000" },
        { service: "Outstation", package: "Per KM", price: "Rs.22/km" },
        { service: "Driver Allowance", package: "Per Day", price: "Rs.500" }
      ],
      services: ["Local & Outstation Bus Rental", "Airport Transfers", "Railway & ISBT Transfers", "Wedding Guest Transport", "Corporate Travel", "Group Weekend Trips"],
      faqs: [
        { q: "Is driver allowance included in Tempo Traveller rentals?", a: "No, outstation driver allowance is charged at Rs.500 per day. Local drivers are covered." },
        { q: "Can we use this minivan for outstation tours?", a: "Yes, our travellers are fully commercial tour-permitted for Rajasthan, Uttarakhand, and Himachal Pradesh." }
      ],
      routes: ["Delhi → Jaipur", "Delhi → Agra", "Delhi → Haridwar", "Delhi → Dehradun", "Delhi → Shimla"]
    }
  },
  {
    id: "12-seater-traveller",
    name: "12 Seater Luxury Traveller",
    category: "travellers",
    type: "Premium Traveller (12 Seater)",
    capacity: "12 Passengers",
    rate: "₹24/km",
    amenities: ["AC", "Individual Charging", "LED TV", "Reading Light", "Bluetooth Audio"],
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
    description: "Standard executive configurations for corporate outings, family tours, and airport pick-ups.",
    rentalDetails: {
      pricingTable: [
        { service: "Local Run", package: "8 Hours / 80 KM", price: "Rs.5,500 - 6,000" },
        { service: "Local Run", package: "12 Hours / 120 KM", price: "Rs.8,000 - 8,500" },
        { service: "Extra KM", package: "Local Run", price: "Rs.24/km" },
        { service: "Extra Hour", package: "Local Run", price: "Rs.350" },
        { service: "Airport Pickup & Drop", package: "Delhi IGI Airport", price: "Rs.4,000 - 4,500" },
        { service: "Outstation", package: "Per KM", price: "Rs.24/km" },
        { service: "Driver Allowance", package: "Per Day", price: "Rs.500" }
      ],
      services: ["Local & Outstation Bus Rental", "Airport Transfers", "Railway & ISBT Transfers", "Wedding & Event Transport", "Corporate Travel", "Group Tours"],
      faqs: [
        { q: "Do you offer door-to-door pickup in Noida?", a: "Yes. We offer pick-ups from Noida Sector 61, 62, 63, and surrounding locations." }
      ],
      routes: ["Delhi → Jaipur", "Delhi → Haridwar", "Delhi → Shimla", "Delhi → Dehradun"]
    }
  },
  {
    id: "17-seater-traveller",
    name: "17 Seater Luxury Traveller",
    category: "travellers",
    type: "Heavy Coach Traveller (17 Seater)",
    capacity: "17 Passengers",
    rate: "₹26/km",
    amenities: ["AC", "Rear Screen", "High Roofline", "Leg Rests", "Luggage Carrier"],
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=600&q=80",
    description: "Spacious tempo traveller featuring wider aisle gaps and individual climate settings.",
    rentalDetails: {
      pricingTable: [
        { service: "Local Run", package: "8 Hours / 80 KM", price: "Rs.6,500 - 7,000" },
        { service: "Local Run", package: "12 Hours / 120 KM", price: "Rs.9,000 - 10,000" },
        { service: "Extra KM", package: "Local Run", price: "Rs.26/km" },
        { service: "Extra Hour", package: "Local Run", price: "Rs.400" },
        { service: "Airport Pickup & Drop", package: "Delhi IGI Airport", price: "Rs.5,000 - 5,550" },
        { service: "Outstation", package: "Per KM", price: "Rs.26/km" },
        { service: "Driver Allowance", package: "Per Day", price: "Rs.500" }
      ],
      services: ["Local & Outstation Bus Rental", "Airport Transfers", "Railway & ISBT Transfers", "Wedding & Event Transport", "Corporate Travel", "Group Tours"],
      faqs: [
        { q: "Is driver allowance included?", a: "Yes, driver allowance is Rs.500 per day extra for outstation travels." }
      ],
      routes: ["Delhi → Jaipur", "Delhi → Agra", "Delhi → Dehradun", "Delhi → Manali"]
    }
  },
  {
    id: "45-seater-semi-volvo",
    name: "45 Seater Semi Volvo Bus Hire",
    category: "coaches",
    type: "Premium Semi-Sleeper Bus",
    capacity: "45 Passengers",
    rate: "₹45/km",
    amenities: ["AC", "Stereo System", "Adjustable seats", "First Aid Kit", "Fire Extinguisher"],
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
    description: "Highly budget-friendly option for marriage parties, university field tours, and mass passenger transport.",
    rentalDetails: {
      pricingTable: [
        { service: "Local Run", package: "8 Hours / 80 KM", price: "Rs.11,000 - 12,000" },
        { service: "Local Run", package: "12 Hours / 120 KM", price: "Rs.15,000 - 16,500" },
        { service: "Extra KM", package: "Local Run", price: "Rs.45/km" },
        { service: "Extra Hour", package: "Local Run", price: "Rs.800" },
        { service: "Airport Pickup & Drop", package: "Delhi IGI Airport", price: "Rs.8,500 - 9,500" },
        { service: "Outstation", package: "Per KM", price: "Rs.45/km" },
        { service: "Driver Allowance", package: "Per Day", price: "Rs.600" }
      ],
      services: [
        "Local & Outstation Bus Rental",
        "Airport Transfers (IGI & Jewar)",
        "Railway & ISBT Transfers (NDLS, Anand Vihar, Nizamuddin, Delhi ISBT)",
        "Wedding & Event Transport (Perfect for Baraat)",
        "Corporate Travel (Office Trips, Conferences)",
        "Group Tours & Weekend Trips"
      ],
      faqs: [
        { q: "What is the price of 20 to 45 seater bus rental in Delhi?", a: "The cost depends on distance, duration, and bus type (seater or sleeper). Contact us for the best quote." },
        { q: "Do you provide both Volvo and BharatBenz buses?", a: "Yes, we offer both Volvo and BharatBenz buses in seater and sleeper options." },
        { q: "Can I book a sleeper bus for outstation trips?", a: "Yes, sleeper buses are available for long-distance and overnight journeys." },
        { q: "Do you provide pickup from ISBT and railway stations?", a: "Yes, we provide pickup and drop from all major ISBT terminals and railway stations in Delhi NCR." }
      ],
      routes: [
        "Delhi to Manali", "Delhi to Jaipur", "Delhi to Agra", "Delhi to Haridwar & Rishikesh", "Delhi to Dehradun", "Delhi to Jim Corbett", "Delhi to Rajasthan Tours"
      ]
    }
  },
  {
    id: "bus-rental-delhi",
    name: "Bus Rental Delhi",
    category: "coaches",
    type: "Standard AC Bus",
    capacity: "41 Seats",
    rate: "₹42/km",
    amenities: ["AC", "Reclining Seats", "Reading Lights", "Sound System"],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
    description: "Safe and affordable intercity bus charter solution for school trips and picnic rentals in Delhi NCR.",
    rentalDetails: {
      pricingTable: [
        { service: "Local Run", package: "8 Hours / 80 KM", price: "Rs.10,000 - 11,000" },
        { service: "Local Run", package: "12 Hours / 120 KM", price: "Rs.14,000 - 15,000" },
        { service: "Extra KM", package: "Local Run", price: "Rs.42/km" },
        { service: "Extra Hour", package: "Local Run", price: "Rs.750" },
        { service: "Airport Pickup & Drop", package: "Delhi IGI Airport", price: "Rs.8,000" },
        { service: "Outstation", package: "Per KM", price: "Rs.42/km" },
        { service: "Driver Allowance", package: "Per Day", price: "Rs.600" }
      ],
      services: ["Local & Outstation Bus Rental", "Airport Transfers", "Railway & ISBT Transfers", "Wedding & Event Transport", "Corporate Travel", "Group Tours"],
      faqs: [
        { q: "What is the price of 20 to 45 seater bus rental in Delhi?", a: "The cost depends on distance, duration, and bus type (seater or sleeper). Contact us for the best quote." },
        { q: "Do you provide pickup from ISBT and railway stations?", a: "Yes, we provide pickup and drop from all major ISBT terminals and railway stations in Delhi NCR." }
      ],
      routes: ["Delhi to Jaipur", "Delhi to Agra", "Delhi to Haridwar", "Delhi to Dehradun"]
    }
  },
  {
    id: "mini-bus-char-dham",
    name: "Mini Bus On Rent for Char Dham",
    category: "travellers",
    type: "Hill-spec Mini Bus (20 Seater)",
    capacity: "20 Passengers",
    rate: "Custom Package",
    amenities: ["Double Gear System", "Roof Carrier", "Emergency Kit", "Hill Certified Captain"],
    image: "https://images.unsplash.com/photo-1517855051212-680457639029?auto=format&fit=crop&w=600&q=80",
    description: "Reliable medium-size tour coach optimized for narrow mountainous terrain in the Himalayas.",
    rentalDetails: {
      pricingTable: [
        { service: "Char Dham Yatra Package", package: "10 Days Complete Tour", price: "Rs.85,000 - 95,000" },
        { service: "Do Dham Yatra Package", package: "7 Days Tour", price: "Rs.65,000 - 75,000" },
        { service: "Driver Allowance", package: "Per Day (Hills)", price: "Rs.700" }
      ],
      services: ["Char Dham Tour Package", "Kedarnath Badrinath Pilgrimage", "Uttarakhand Mountain Tours"],
      faqs: [
        { q: "Are drivers experienced in mountain driving?", a: "Yes. All our Char Dham tour captains hold hill-licensing certificates and have 10+ years of driving experience." }
      ],
      routes: ["Delhi → Haridwar → Barkot → Uttarkashi → Guptkashi → Badrinath → Rishikesh → Delhi"]
    }
  },
  {
    id: "45-seater-bharat-benz",
    name: "45 Seater Bharat Benz Coach Hire",
    category: "coaches",
    type: "Luxury BharatBenz AC Coach",
    capacity: "45 Seats",
    rate: "₹50/km",
    amenities: ["AC", "Plush Seat Cushions", "USB Sockets", "CCTV Cameras", "GPS tracking"],
    image: "https://images.unsplash.com/photo-1562620644-656450258045?auto=format&fit=crop&w=600&q=80",
    description: "A highly robust workhorse with modern noise-isolation technology and comfortable pushback seats.",
    rentalDetails: {
      pricingTable: [
        { service: "Local Run", package: "8 Hours / 80 KM", price: "Rs.12,000 - 13,000" },
        { service: "Local Run", package: "12 Hours / 120 KM", price: "Rs.17,000 - 18,500" },
        { service: "Extra KM", package: "Local Run", price: "Rs.50/km" },
        { service: "Extra Hour", package: "Local Run", price: "Rs.900" },
        { service: "Airport Pickup & Drop", package: "Delhi IGI Airport", price: "Rs.9,500 - 10,000" },
        { service: "Outstation", package: "Per KM", price: "Rs.50/km" },
        { service: "Driver Allowance", package: "Per Day", price: "Rs.600" }
      ],
      services: ["Local & Outstation Bus Rental", "Airport Transfers", "Railway & ISBT Transfers", "Wedding & Event Transport", "Corporate Travel", "Group Tours"],
      faqs: [
        { q: "What is the price of 20 to 45 seater bus rental in Delhi?", a: "The cost depends on distance, duration, and bus type (seater or sleeper). Contact us for the best quote." },
        { q: "Do you provide both Volvo and BharatBenz buses?", a: "Yes, we offer both Volvo and BharatBenz buses in seater and sleeper options." }
      ],
      routes: ["Delhi to Manali", "Delhi to Jaipur", "Delhi to Agra", "Delhi to Rajasthan Tours"]
    }
  },
  {
    id: "volvo-washroom",
    name: "Volvo Bus with Washroom",
    category: "coaches",
    type: "Ultra Luxury Coach (with Toilet)",
    capacity: "45 Passengers",
    rate: "₹65/km",
    amenities: ["In-built Dry Washroom", "AC", "WiFi", "Refrigerator", "Individual Screens", "Blankets"],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
    description: "Ultra-luxury long-distance bus featuring an in-built restroom so you can travel without roadside stops.",
    rentalDetails: {
      pricingTable: [
        { service: "Local Run", package: "8 Hours / 80 KM", price: "Rs.15,000 - 16,500" },
        { service: "Local Run", package: "12 Hours / 120 KM", price: "Rs.21,000 - 23,000" },
        { service: "Extra KM", package: "Local Run", price: "Rs.65/km" },
        { service: "Extra Hour", package: "Local Run", price: "Rs.1,200" },
        { service: "Airport Pickup & Drop", package: "Delhi IGI Airport", price: "Rs.12,000 - 13,000" },
        { service: "Outstation", package: "Per KM", price: "Rs.65/km" },
        { service: "Driver Allowance", package: "Per Day", price: "Rs.800" }
      ],
      services: ["Local & Outstation Bus Rental", "Airport Transfers", "Railway & ISBT Transfers", "Wedding & Event Transport", "Corporate Travel", "Group Tours"],
      faqs: [
        { q: "Does the Volvo bus have a working washroom?", a: "Yes. Our premium Volvo coach features an in-built chemical dry restroom suitable for long outstation journeys." }
      ],
      routes: ["Delhi to Manali", "Delhi to Jaipur", "Delhi to Rajasthan Tours", "Delhi to Agra"]
    }
  },
  {
    id: "41-seater-volvo",
    name: "41 Seater Volvo Coach Hire",
    category: "coaches",
    type: "Luxury Volvo AC Seater",
    capacity: "41 Passengers",
    rate: "₹55/km",
    amenities: ["Air Suspension", "AC", "Pantry", "Mic Stand", "High Back seats"],
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
    description: "Executive Volvo coach popular for VIP corporate events and luxury state transport.",
    rentalDetails: {
      pricingTable: [
        { service: "Local Run", package: "8 Hours / 80 KM", price: "Rs.13,000 - 14,000" },
        { service: "Local Run", package: "12 Hours / 120 KM", price: "Rs.18,000 - 19,500" },
        { service: "Extra KM", package: "Local Run", price: "Rs.55/km" },
        { service: "Extra Hour", package: "Local Run", price: "Rs.1,000" },
        { service: "Airport Pickup & Drop", package: "Delhi IGI Airport", price: "Rs.10,000 - 11,000" },
        { service: "Outstation", package: "Per KM", price: "Rs.55/km" },
        { service: "Driver Allowance", package: "Per Day", price: "Rs.700" }
      ],
      services: ["Local & Outstation Bus Rental", "Airport Transfers", "Railway & ISBT Transfers", "Wedding & Event Transport", "Corporate Travel", "Group Tours"],
      faqs: [
        { q: "What is the price of 41 Seater Volvo?", a: "Indicative rate is Rs.55 per KM for outstation with Rs.700 daily driver allowance." }
      ],
      routes: ["Delhi to Manali", "Delhi to Jaipur", "Delhi to Agra", "Delhi to Dehradun"]
    }
  },
  {
    id: "45-seater-volvo",
    name: "45 Seater Volvo Coach Hire",
    category: "coaches",
    type: "Premium Multi-Axle Volvo Seater",
    capacity: "45 Seats",
    rate: "₹60/km",
    amenities: ["Multi-Axle Ride Comfort", "AC", "Pantry Fridge", "LED Entertainment", "Reading Lights"],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
    description: "Multi-axle suspension system offers the smoothest highway ride quality for massive groups.",
    rentalDetails: {
      pricingTable: [
        { service: "Local Run", package: "8 Hours / 80 KM", price: "Rs.14,000 - 15,000" },
        { service: "Local Run", package: "12 Hours / 120 KM", price: "Rs.19,500 - 21,000" },
        { service: "Extra KM", package: "Local Run", price: "Rs.60/km" },
        { service: "Extra Hour", package: "Local Run", price: "Rs.1,100" },
        { service: "Airport Pickup & Drop", package: "Delhi IGI Airport", price: "Rs.11,000 - 12,000" },
        { service: "Outstation", package: "Per KM", price: "Rs.60/km" },
        { service: "Driver Allowance", package: "Per Day", price: "Rs.700" }
      ],
      services: ["Local & Outstation Bus Rental", "Airport Transfers", "Railway & ISBT Transfers", "Wedding & Event Transport", "Corporate Travel", "Group Tours"],
      faqs: [
        { q: "Is the coach multi-axle?", a: "Yes, this model features multi-axle drive for maximum stability and comfort on long highways." }
      ],
      routes: ["Delhi to Manali", "Delhi to Jaipur", "Delhi to Rajasthan Tours", "Delhi to Agra"]
    }
  },
  {
    id: "22-seater-coach",
    name: "22 Seater Luxury Coach Hire",
    category: "coaches",
    type: "Luxury Executive Minibus",
    capacity: "22 Seats",
    rate: "₹35/km",
    amenities: ["AC", "Spacious Seats", "Premium Audio", "Luggage Hold", "Led Lights"],
    image: "https://images.unsplash.com/photo-1562620644-656450258045?auto=format&fit=crop&w=600&q=80",
    description: "Excellent compact luxury coach suitable for wedding transport and delegate city transfers.",
    rentalDetails: {
      pricingTable: [
        { service: "Local Run", package: "8 Hours / 80 KM", price: "Rs.8,000 - 9,000" },
        { service: "Local Run", package: "12 Hours / 120 KM", price: "Rs.11,500 - 12,500" },
        { service: "Extra KM", package: "Local Run", price: "Rs.35/km" },
        { service: "Extra Hour", package: "Local Run", price: "Rs.600" },
        { service: "Airport Pickup & Drop", package: "Delhi IGI Airport", price: "Rs.6,500 - 7,000" },
        { service: "Outstation", package: "Per KM", price: "Rs.35/km" },
        { service: "Driver Allowance", package: "Per Day", price: "Rs.500" }
      ],
      services: ["Local & Outstation Bus Rental", "Airport Transfers", "Railway & ISBT Transfers", "Wedding & Event Transport", "Corporate Travel", "Group Tours"],
      faqs: [
        { q: "Is it suitable for narrow wedding venue gates?", a: "Yes, this executive minibus is highly mobile and can access drop-points larger coaches cannot reach." }
      ],
      routes: ["Delhi to Jaipur", "Delhi to Agra", "Delhi to Haridwar", "Delhi to Chandigarh"]
    }
  },
  {
    id: "bharat-benz-delhi",
    name: "Bharat Benz Coach Hire In Delhi NCR",
    category: "coaches",
    type: "Standard BharatBenz Seater",
    capacity: "45 Seats",
    rate: "₹52/km",
    amenities: ["AC", "Reading Spotlights", "USB Charging", "Soft suspension"],
    image: "https://images.unsplash.com/photo-1562620644-656450258045?auto=format&fit=crop&w=600&q=80",
    description: "Engineered for robust long-distance reliability across North Indian terrain.",
    rentalDetails: {
      pricingTable: [
        { service: "Local Run", package: "8 Hours / 80 KM", price: "Rs.12,500 - 13,500" },
        { service: "Local Run", package: "12 Hours / 120 KM", price: "Rs.17,500 - 19,000" },
        { service: "Extra KM", package: "Local Run", price: "Rs.52/km" },
        { service: "Extra Hour", package: "Local Run", price: "Rs.900" },
        { service: "Airport Pickup & Drop", package: "Delhi IGI Airport", price: "Rs.9,500 - 10,500" },
        { service: "Outstation", package: "Per KM", price: "Rs.52/km" },
        { service: "Driver Allowance", package: "Per Day", price: "Rs.600" }
      ],
      services: ["Local & Outstation Bus Rental", "Airport Transfers", "Railway & ISBT Transfers", "Wedding & Event Transport", "Corporate Travel", "Group Tours"],
      faqs: [
        { q: "Do you offer bookings for corporate daily pick ups?", a: "Yes, we handle recurring daily staff shuttle contracts across Noida and Gurgaon." }
      ],
      routes: ["Delhi to Jaipur", "Delhi to Agra", "Delhi to Haridwar", "Delhi to Dehradun"]
    }
  },
  {
    id: "27-seater-coach",
    name: "27 Seater Luxury Coach Hire In Delhi NCR",
    category: "coaches",
    type: "Premium Executive Bus",
    capacity: "27 Seats",
    rate: "₹38/km",
    amenities: ["AC", "Audio Mic System", "Wide Reclining Chairs", "Safety Sensors"],
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
    description: "Ideal compromise between minibus mobility and large luxury coach space options.",
    rentalDetails: {
      pricingTable: [
        { service: "Local Run", package: "8 Hours / 80 KM", price: "Rs.9,000 - 10,000" },
        { service: "Local Run", package: "12 Hours / 120 KM", price: "Rs.13,000 - 14,000" },
        { service: "Extra KM", package: "Local Run", price: "Rs.38/km" },
        { service: "Extra Hour", package: "Local Run", price: "Rs.700" },
        { service: "Airport Pickup & Drop", package: "Delhi IGI Airport", price: "Rs.7,500 - 8,000" },
        { service: "Outstation", package: "Per KM", price: "Rs.38/km" },
        { service: "Driver Allowance", package: "Per Day", price: "Rs.500" }
      ],
      services: ["Local & Outstation Bus Rental", "Airport Transfers", "Railway & ISBT Transfers", "Wedding & Event Transport", "Corporate Travel", "Group Tours"],
      faqs: [
        { q: "Is driver allowance included?", a: "Outstation driver allowance is charged at Rs.500 per day extra." }
      ],
      routes: ["Delhi to Jaipur", "Delhi to Agra", "Delhi to Haridwar", "Delhi to Rishikesh"]
    }
  },
  {
    id: "bus-rental-noida",
    name: "Bus Rental Noida Sector 61 62 63",
    category: "coaches",
    type: "Corporate Staff Shuttle Bus",
    capacity: "35 Seats",
    rate: "₹35/km",
    amenities: ["AC", "Daily GPS Loggers", "Clean Interiors", "Regular Sanitization"],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
    description: "Custom corporate contract shuttle buses dedicated to staff commute routes in Noida IT hub sectors.",
    rentalDetails: {
      pricingTable: [
        { service: "Local Shuttle", package: "Daily Contract", price: "Rs.8,500" },
        { service: "Local Run", package: "8 Hours / 80 KM", price: "Rs.9,000" },
        { service: "Extra KM", package: "Local", price: "Rs.35/km" }
      ],
      services: ["Corporate Daily Commute", "Noida Sectors Pickups", "Hotels & Offices dropouts"],
      faqs: [
        { q: "Do you serve Sector 62 IT Parks?", a: "Yes, we serve all sectors in Noida including Sector 61, 62, 63, 135, and Greater Noida." }
      ],
      routes: ["Noida Local Commutes", "Noida ↔ Greater Noida Expressway", "Noida ↔ Ghaziabad"]
    }
  }
];

// 15+ Mock Buses running on routes
export const MOCK_BUSES = [
  // Delhi to Jaipur
  {
    id: "B-DELJAI-01",
    from: "New Delhi",
    to: "Jaipur",
    operator: "Ant Travels Platinum Scania",
    type: "AC Sleeper (2+1)",
    departure: "06:30 AM",
    arrival: "12:00 PM",
    duration: "5h 30m",
    price: 650,
    rating: 4.8,
    reviews: 142,
    seatsAvailable: 14,
    boardingPoints: ["Kashmere Gate ISBT - 06:00 AM", "Dhaula Kuan Metro - 06:30 AM", "IFFCO Chowk Gurgaon - 07:00 AM"],
    droppingPoints: ["Sindhi Camp Bus Stand - 11:45 AM", "200 Feet Bypass - 12:00 PM"],
    layout: "sleeper"
  },
  {
    id: "B-DELJAI-02",
    from: "New Delhi",
    to: "Jaipur",
    operator: "Ant Travels Volvo Club Class",
    type: "AC Seater (2+2)",
    departure: "11:00 AM",
    arrival: "04:45 PM",
    duration: "5h 45m",
    price: 499,
    rating: 4.6,
    reviews: 210,
    seatsAvailable: 28,
    boardingPoints: ["Kashmere Gate ISBT - 10:30 AM", "IFFCO Chowk Gurgaon - 11:30 AM"],
    droppingPoints: ["Sindhi Camp Bus Stand - 04:30 PM", "200 Feet Bypass - 04:45 PM"],
    layout: "seater"
  },
  {
    id: "B-DELJAI-03",
    from: "New Delhi",
    to: "Jaipur",
    operator: "Ant Travels Air Suspended Benz",
    type: "AC Sleeper (2+1)",
    departure: "10:30 PM",
    arrival: "04:00 AM",
    duration: "5h 30m",
    price: 899,
    rating: 4.9,
    reviews: 98,
    seatsAvailable: 8,
    boardingPoints: ["Kashmere Gate ISBT - 10:00 PM", "Dhaula Kuan - 10:30 PM", "IFFCO Chowk - 11:00 PM"],
    droppingPoints: ["Sindhi Camp - 03:45 AM", "200 Feet Bypass - 04:00 AM"],
    layout: "sleeper"
  },

  // Mumbai to Pune
  {
    id: "B-MUMPUN-01",
    from: "Mumbai",
    to: "Pune",
    operator: "Ant Travels Intercity Express",
    type: "AC Seater (2+2)",
    departure: "07:00 AM",
    arrival: "10:15 AM",
    duration: "3h 15m",
    price: 299,
    rating: 4.5,
    reviews: 320,
    seatsAvailable: 34,
    boardingPoints: ["Borivali West - 06:00 AM", "Dadar TT Circle - 06:40 AM", "Vashi Plaza - 07:15 AM"],
    droppingPoints: ["Wakad Bypass - 09:45 AM", "Swargate - 10:15 AM"],
    layout: "seater"
  },
  {
    id: "B-MUMPUN-02",
    from: "Mumbai",
    to: "Pune",
    operator: "Ant Travels Volvo Club Class",
    type: "AC Seater (2+2)",
    departure: "04:00 PM",
    arrival: "07:15 PM",
    duration: "3h 15m",
    price: 349,
    rating: 4.7,
    reviews: 185,
    seatsAvailable: 19,
    boardingPoints: ["Borivali West - 03:00 PM", "Dadar TT Circle - 03:40 PM", "Vashi Plaza - 04:15 PM"],
    droppingPoints: ["Wakad Bypass - 06:45 PM", "Swargate - 07:15 PM"],
    layout: "seater"
  },
  {
    id: "B-MUMPUN-03",
    from: "Mumbai",
    to: "Pune",
    operator: "Ant Travels Night Sleeper",
    type: "AC Sleeper (2+1)",
    departure: "11:30 PM",
    arrival: "03:00 AM",
    duration: "3h 30m",
    price: 550,
    rating: 4.4,
    reviews: 75,
    seatsAvailable: 12,
    boardingPoints: ["Borivali West - 10:30 PM", "Dadar TT Circle - 11:10 PM", "Vashi Plaza - 11:45 PM"],
    droppingPoints: ["Wakad Bypass - 02:30 AM", "Swargate - 03:00 AM"],
    layout: "sleeper"
  },

  // Bengaluru to Chennai
  {
    id: "B-BLRCHE-01",
    from: "Bengaluru",
    to: "Chennai",
    operator: "Ant Travels Multiaxle Scania",
    type: "AC Sleeper (2+1)",
    departure: "09:00 AM",
    arrival: "03:00 PM",
    duration: "6h 00m",
    price: 699,
    rating: 4.7,
    reviews: 112,
    seatsAvailable: 15,
    boardingPoints: ["Kaladhungi Main - 08:15 AM", "Majestic - 08:45 AM", "Silk Board - 09:15 AM"],
    droppingPoints: ["Poonamallee Bypass - 02:30 PM", "Koyambedu CMBT - 03:00 PM"],
    layout: "sleeper"
  },
  {
    id: "B-BLRCHE-02",
    from: "Bengaluru",
    to: "Chennai",
    operator: "Ant Travels Air Suspended Volvo",
    type: "AC Sleeper (2+1)",
    departure: "10:30 PM",
    arrival: "04:45 AM",
    duration: "6h 15m",
    price: 899,
    rating: 4.8,
    reviews: 154,
    seatsAvailable: 6,
    boardingPoints: ["Kaladhungi Main - 09:45 PM", "Majestic - 10:15 PM", "Silk Board - 10:45 PM"],
    droppingPoints: ["Poonamallee Bypass - 04:15 AM", "Koyambedu CMBT - 04:45 AM"],
    layout: "sleeper"
  },

  // Bengaluru to Hyderabad
  {
    id: "B-BLRHYD-01",
    from: "Bengaluru",
    to: "Hyderabad",
    operator: "Ant Travels Platinum Coach",
    type: "AC Sleeper (2+1)",
    departure: "09:30 PM",
    arrival: "05:45 AM",
    duration: "8h 15m",
    price: 950,
    rating: 4.9,
    reviews: 215,
    seatsAvailable: 7,
    boardingPoints: ["Majestic - 09:00 PM", "Hebbal - 09:30 PM"],
    droppingPoints: ["Gachibowli - 05:15 AM", "Ameerpet - 05:45 AM"],
    layout: "sleeper"
  },
  {
    id: "B-BLRHYD-02",
    from: "Bengaluru",
    to: "Hyderabad",
    operator: "Ant Travels Executive Liner",
    type: "AC Seater (2+2)",
    departure: "08:00 AM",
    arrival: "04:30 PM",
    duration: "8h 30m",
    price: 599,
    rating: 4.3,
    reviews: 87,
    seatsAvailable: 22,
    boardingPoints: ["Majestic - 07:30 AM", "Hebbal - 08:00 AM"],
    droppingPoints: ["Gachibowli - 04:00 PM", "Ameerpet - 04:30 PM"],
    layout: "seater"
  },

  // Delhi to Manali
  {
    id: "B-DELMAN-01",
    from: "New Delhi",
    to: "Manali",
    operator: "Ant Travels Himalayan Royal",
    type: "AC Sleeper (2+1)",
    departure: "08:30 PM",
    arrival: "08:15 AM",
    duration: "11h 45m",
    price: 1200,
    rating: 4.8,
    reviews: 310,
    seatsAvailable: 9,
    boardingPoints: ["Kashmere Gate ISBT - 08:00 PM", "Majnu Ka Tilla - 08:30 PM"],
    droppingPoints: ["Private Bus Stand Manali - 08:15 AM"],
    layout: "sleeper"
  },
  {
    id: "B-DELMAN-02",
    from: "New Delhi",
    to: "Manali",
    operator: "Ant Travels Volvo Club Class",
    type: "AC Seater (2+2)",
    departure: "06:00 PM",
    arrival: "06:00 AM",
    duration: "12h 00m",
    price: 999,
    rating: 4.7,
    reviews: 450,
    seatsAvailable: 18,
    boardingPoints: ["Kashmere Gate ISBT - 05:30 PM", "Majnu Ka Tilla - 06:00 PM"],
    droppingPoints: ["Private Bus Stand Manali - 06:00 AM"],
    layout: "seater"
  }
];

// Function to generate standard seats for a bus layout
export const getSeatMapForBus = (busId, layout) => {
  const seats = [];
  const rows = layout === "sleeper" ? 12 : 10;
  const seatsPerRow = layout === "sleeper" ? 3 : 4; // Sleeper is 2+1, Seater is 2x2
  
  // Deterministic booking based on busId characters
  const seed = busId.charCodeAt(busId.length - 1) + busId.charCodeAt(busId.length - 2);

  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= seatsPerRow; c++) {
      let label = "";
      if (layout === "sleeper") {
        const letter = c === 1 ? "A" : c === 2 ? "B" : "C";
        label = `${r}${letter}`;
      } else {
        const letter = c === 1 ? "A" : c === 2 ? "B" : c === 3 ? "C" : "D";
        label = `${r}${letter}`;
      }

      // Check if it's a window seat
      const isWindow = layout === "sleeper" 
        ? (c === 1 || c === 3) 
        : (c === 1 || c === 4);

      // Determine booked status using seed formula
      const isBooked = ((r * c * 7 + seed) % 10) < 4; // ~40% booked

      seats.push({
        id: `${busId}-${label}`,
        name: label,
        row: r,
        col: c,
        type: layout === "sleeper" ? "sleeper" : "seater",
        price: layout === "sleeper" ? 200 : 0, // Berths carry premium
        isWindow,
        isBooked,
        isSleeper: layout === "sleeper",
        deck: layout === "sleeper" && r > 6 ? "Upper" : "Lower"
      });
    }
  }
  return seats;
};

// FAQ list for Chatbot
export const FAQ_DATA = [
  {
    keywords: ["cancel", "cancellation", "refund", "ticket cancellation"],
    answer: "You can cancel your booking via the 'My Bookings / Track Booking' page. Refunds are processed based on time left for departure:\n- > 24 hours: 90% refund\n- 12 to 24 hours: 70% refund\n- 6 to 12 hours: 50% refund\n- < 6 hours: No refund.\nRefunds take 5-7 business days to reflect in your original payment mode."
  },
  {
    keywords: ["refund status", "refund time", "money back"],
    answer: "Refunds for cancelled tickets are credited to the source payment method within 5 to 7 working days. If you haven't received it after 7 days, please email billing@anttravels.com with your Booking ID."
  },
  {
    keywords: ["booking", "book ticket", "how to book"],
    answer: "To book a ticket:\n1. Choose your source, destination, and journey date on the home page.\n2. Choose a suitable bus and click 'Select Seats'.\n3. Select your seat(s), choose boarding/dropping points, and enter passenger details.\n4. Complete the payment using credit card, debit card, UPI, or NetBanking. You will receive an SMS and email ticket immediately!"
  },
  {
    keywords: ["track", "live location", "live tracking", "gps", "where is my bus"],
    answer: "You can track your bus live on the 'Track Booking' page by entering your Booking ID and Phone Number. The GPS location of the coach updates every 30 seconds."
  },
  {
    keywords: ["offers", "discounts", "coupon", "promo"],
    answer: "We have multiple active promo offers! Use coupon code:\n- **ANTFIRST** for 15% off on your first ticket.\n- **FESTIVE20** for 20% off on tickets above ₹999.\n- **WEEKENDSLAY** for flat ₹100 off on weekend trips.\nYou can view all active vouchers on the 'Offers' page."
  },
  {
    keywords: ["contact", "phone", "email", "support", "address", "number"],
    answer: "You can reach us at:\n- **Phone**: +91 98765 43210 (24x7 Customer Support)\n- **Email**: info@anttravels.com\n- **Address**: 123, Ant Tower, Sector 62, Noida, Uttar Pradesh, India.\nYou can also drop a message on our 'Contact Us' form."
  },
  {
    keywords: ["luggage", "bags", "weight limit"],
    answer: "Each passenger is allowed 1 main baggage up to 20kg to be placed in the bus luggage cabin, and 1 small handbag up to 5kg inside the bus passenger area. Extra luggage is subject to additional cargo charges."
  },
  {
    keywords: ["ac", "non ac", "sleeper", "seater"],
    answer: "We operate a 100% AC luxury fleet consisting of Volvo and Scania coaches. You can choose between 'AC Seater (2+2)' with high-comfort reclining seats or 'AC Sleeper (2+1)' with fully flat single and double berths."
  }
];

// Active mock tickets database for Track Booking simulations
export const MOCK_TICKETS = {
  "ANT10293": {
    bookingId: "ANT10293",
    phone: "9876543210",
    from: "New Delhi",
    to: "Jaipur",
    date: "2026-07-16",
    busOperator: "Ant Travels Platinum Scania",
    busType: "AC Sleeper (2+1)",
    departure: "06:30 AM",
    arrival: "12:00 PM",
    boardingPoint: "Kashmere Gate ISBT - 06:00 AM",
    droppingPoint: "Sindhi Camp Bus Stand - 11:45 AM",
    seats: ["3A", "3B"],
    passengers: [
      { name: "Rohit Yadav", age: 28, gender: "Male" },
      { name: "Pooja Yadav", age: 26, gender: "Female" }
    ],
    fare: 1300,
    status: "Confirmed",
    gpsStatus: "Scheduled",
    gpsLatLng: { lat: 28.6139, lng: 77.2090 }, // Delhi
    checkpoint: "Ready for departure"
  },
  "ANT20894": {
    bookingId: "ANT20894",
    phone: "9988776655",
    from: "Mumbai",
    to: "Pune",
    date: "2026-07-13",
    busOperator: "Ant Travels Intercity Express",
    busType: "AC Seater (2+2)",
    departure: "07:00 AM",
    arrival: "10:15 AM",
    boardingPoint: "Dadar TT Circle - 06:40 AM",
    droppingPoint: "Swargate - 10:15 AM",
    seats: ["12C"],
    passengers: [
      { name: "Karan Patel", age: 34, gender: "Male" }
    ],
    fare: 299,
    status: "Completed",
    gpsStatus: "Arrived",
    gpsLatLng: { lat: 18.5204, lng: 73.8567 }, // Pune
    checkpoint: "Journey Completed successfully"
  },
  "ANT39201": {
    bookingId: "ANT39201",
    phone: "8888888888",
    from: "Bengaluru",
    to: "Chennai",
    date: "2026-07-14",
    busOperator: "Ant Travels Multiaxle Scania",
    busType: "AC Sleeper (2+1)",
    departure: "09:00 AM",
    arrival: "03:00 PM",
    boardingPoint: "Majestic - 08:45 AM",
    droppingPoint: "Koyambedu CMBT - 03:00 PM",
    seats: ["5A"],
    passengers: [
      { name: "Aditi Rao", age: 24, gender: "Female" }
    ],
    fare: 699,
    status: "Confirmed",
    gpsStatus: "In Transit",
    gpsLatLng: { lat: 12.9716, lng: 79.1589 }, // Vellore (midpoint)
    checkpoint: "Passed Vellore Bypass, next stop Poonamallee (32 mins away)"
  }
};
