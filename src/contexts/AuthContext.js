import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold user information

  const login = (userData) => {
    setUser(userData); // Set user information on login
  };

  const logout = () => {
    setUser(null); // Clear user information on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
