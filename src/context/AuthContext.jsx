// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig.js';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signin = async (email, password) => {
    const res = await api.post('/auth/signin', { email, password });
    const { token, user: profile } = res.data;

   
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(profile));

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

   
    setUser(profile);
    return profile;
  };

  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
