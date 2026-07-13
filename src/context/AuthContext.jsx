import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth State on load
  useEffect(() => {
    const savedUser = localStorage.getItem('ant_travels_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    // Seed a mock user if users list is empty
    const savedUsers = localStorage.getItem('ant_travels_users');
    if (!savedUsers) {
      const defaultUsers = [
        {
          name: "Rohit Yadav",
          email: "rohit@gmail.com",
          phone: "9811992203",
          password: "password123",
          bookings: [
            {
              id: "ANT76281",
              busId: "45-seater-semi-volvo",
              busName: "Semi Volvo Seater (45 Seats)",
              from: "New Delhi",
              to: "Jaipur",
              date: "2026-07-20",
              time: "07:30 AM",
              seats: ["A1", "A2"],
              totalAmount: 1700,
              status: "Confirmed",
              gpsStatus: "Scheduled"
            }
          ],
          inquiries: [
            {
              id: "ANTR-881923",
              vehicleName: "Toyota Innova Car Rental Delhi",
              date: "2026-07-15",
              destination: "Jaipur Outstation",
              status: "Pending Callback"
            }
          ]
        }
      ];
      localStorage.setItem('ant_travels_users', JSON.stringify(defaultUsers));
    }
    setLoading(false);
  }, []);

  // Register function
  const register = (name, email, phone, password) => {
    try {
      const usersStr = localStorage.getItem('ant_travels_users') || '[]';
      const users = JSON.parse(usersStr);
      
      const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        return { success: false, message: 'Email already registered.' };
      }

      const newUser = {
        name,
        email: email.toLowerCase(),
        phone,
        password,
        bookings: [],
        inquiries: []
      };

      users.push(newUser);
      localStorage.setItem('ant_travels_users', JSON.stringify(users));
      
      // Auto login
      setCurrentUser(newUser);
      localStorage.setItem('ant_travels_current_user', JSON.stringify(newUser));
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Registration failed. Try again.' };
    }
  };

  // Login function
  const login = (email, password) => {
    try {
      const usersStr = localStorage.getItem('ant_travels_users') || '[]';
      const users = JSON.parse(usersStr);
      
      const user = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!user) {
        return { success: false, message: 'Invalid email or password.' };
      }

      setCurrentUser(user);
      localStorage.setItem('ant_travels_current_user', JSON.stringify(user));
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Login failed. Try again.' };
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ant_travels_current_user');
  };

  // Associate a ticket booking with the current user
  const addBooking = (booking) => {
    if (!currentUser) return;
    
    try {
      const usersStr = localStorage.getItem('ant_travels_users') || '[]';
      const users = JSON.parse(usersStr);
      
      const userIndex = users.findIndex(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
      if (userIndex !== -1) {
        const updatedBookings = [booking, ...users[userIndex].bookings];
        users[userIndex].bookings = updatedBookings;
        
        // Save back to local storage list
        localStorage.setItem('ant_travels_users', JSON.stringify(users));
        
        // Update current logged-in user state
        const updatedUser = { ...currentUser, bookings: updatedBookings };
        setCurrentUser(updatedUser);
        localStorage.setItem('ant_travels_current_user', JSON.stringify(updatedUser));
      }
    } catch (e) {
      console.error('Error saving user booking:', e);
    }
  };

  // Associate a fleet rental inquiry with the current user
  const addInquiry = (inquiry) => {
    if (!currentUser) return;
    
    try {
      const usersStr = localStorage.getItem('ant_travels_users') || '[]';
      const users = JSON.parse(usersStr);
      
      const userIndex = users.findIndex(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
      if (userIndex !== -1) {
        const updatedInquiries = [inquiry, ...users[userIndex].inquiries];
        users[userIndex].inquiries = updatedInquiries;
        
        // Save back to local storage list
        localStorage.setItem('ant_travels_users', JSON.stringify(users));
        
        // Update current logged-in user state
        const updatedUser = { ...currentUser, inquiries: updatedInquiries };
        setCurrentUser(updatedUser);
        localStorage.setItem('ant_travels_current_user', JSON.stringify(updatedUser));
      }
    } catch (e) {
      console.error('Error saving user inquiry:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout, addBooking, addInquiry, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
