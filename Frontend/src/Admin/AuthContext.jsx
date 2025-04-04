import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check auth status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/hi/users/check', {
          withCredentials: true
        });

        if (response.data.loggedIn) {
          setUser(response.data.user);
          setIsAuthenticated(true);
          
          // Store token in localStorage if using it
          if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        logout(); // Clear any stale auth data
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await axios.post('/hi/users/login', {
        email,
        password
      }, {
        withCredentials: true
      });

      if (response.data.user && response.data.token) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('authToken', response.data.token);
        navigate('/admin');
        return true;
      }
      return false;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/hi/users/logout', {}, {
        withCredentials: true
      });
      
      // Clear all auth data
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
      document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
      // Force clear auth state even if server logout fails
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
    }
  };

  const register = async (userData) => {
    setError(null);
    try {
      const response = await axios.post('/hi/users/register', userData, {
        withCredentials: true
      });

      if (response.data.user && response.data.token) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('authToken', response.data.token);
        navigate('/admin');
        return true;
      }
      return false;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      return false;
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    register,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};