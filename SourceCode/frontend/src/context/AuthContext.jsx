import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiService } from '../api/apiService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  //F5 LOGIC
  useEffect(() => {
    const savedToken = localStorage.getItem('jwtToken');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

const login = async (username, password) => {
    const data = await apiService.login(username, password);
    
    setToken(data.token);
    setUser({ username: data.username, email: data.email, role: data.role });
    
    localStorage.setItem('jwtToken', data.token);
    localStorage.setItem('user', JSON.stringify({ username: data.username, email: data.email, role: data.role }));

    return data; 
  };

  const register = async (username, password, email) => {
    const data = await apiService.register(username, password, email);
    setToken(data.token);
    setUser({ username: data.username, email: data.email, role: data.role });
    localStorage.setItem('jwtToken', data.token);
    localStorage.setItem('user', JSON.stringify({ username: data.username, email: data.email, role: data.role }));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};