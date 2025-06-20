import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Expiry duration in milliseconds (24 hours here)
const EXPIRY_DURATION = 1000 * 60 * 60 * 24; // 24 hours

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data from localStorage on app start
    const storedUser = localStorage.getItem("user");
    const storedTime = localStorage.getItem("loginTime");

    if (storedUser && storedTime) {
      const loginTime = parseInt(storedTime, 10);
      const now = Date.now();

      if (now - loginTime < EXPIRY_DURATION) {
        setUser(JSON.parse(storedUser));
      } else {
        // Session expired
        localStorage.removeItem("user");
        localStorage.removeItem("loginTime");
      }
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("loginTime", Date.now().toString());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("loginTime");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
