import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log('Stored Token on Load:', storedToken); // Log the stored token on load
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        console.log('Decoded Token on Load:', decodedToken); // Log the decoded token

        if (decodedToken) {
          setToken(storedToken);
          setUser(decodedToken);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (newToken) => {
    try {
      const decodedToken = jwtDecode(newToken);
      console.log('Decoded Token on Login:', decodedToken); // Log the decoded token on login

      if (decodedToken) {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(decodedToken);
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
