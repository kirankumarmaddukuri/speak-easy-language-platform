import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, fetchUserProfile } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (token) {
        localStorage.setItem('token', token);
        try {
          const response = await fetchUserProfile();
          console.log('fetchUserProfile response:', response);
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user profile', error);
          setUser(null);
        }
      } else {
        localStorage.removeItem('token');
        setUser(null);
      }
    };
    loadUserProfile();
  }, [token]);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      setToken(response.data.token);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      setToken(response.data.token);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
