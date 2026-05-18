import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load mock user session from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('shoppingcart_user');
    return savedUser ? JSON.parse(savedUser) : { name: 'Guest', isLoggedIn: false };
  });

  // Sync user state with localStorage
  useEffect(() => {
    localStorage.setItem('shoppingcart_user', JSON.stringify(user));
  }, [user]);

  // Log in with simulated credentials
  const login = (username) => {
    if (!username || username.trim() === '') {
      username = 'JuniorDev';
    }
    setUser({ name: username, isLoggedIn: true });
  };

  // Log out
  const logout = () => {
    setUser({ name: 'Guest', isLoggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
