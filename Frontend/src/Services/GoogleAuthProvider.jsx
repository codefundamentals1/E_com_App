import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const GoogleAuthContext = createContext();

export const GoogleAuthProvider = ({ children }) => {
  const [googleUser, setGoogleUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize Google Auth
  useEffect(() => {
    const initGoogleAuth = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          cookiepolicy: 'single_host_origin',
        }).then(() => {
          setLoading(false);
        }).catch(err => {
          setError('Failed to initialize Google Auth');
          setLoading(false);
        });
      });
    };

    if (!window.gapi) {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = initGoogleAuth;
      script.onerror = () => {
        setError('Failed to load Google API');
        setLoading(false);
      };
      document.body.appendChild(script);
    } else {
      initGoogleAuth();
    }
  }, []);

  const handleGoogleLogin = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then(googleUser => {
      const profile = googleUser.getBasicProfile();
      const authResponse = googleUser.getAuthResponse();
      
      const userData = {
        id: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
        imageUrl: profile.getImageUrl(),
        idToken: authResponse.id_token
      };

      setGoogleUser(userData);
      
      // Send to your backend for verification
      //refrctting the data 
      verifyWithBackend(userData);
    }).catch(err => {
      setError('Google login failed');
    });
  };

  const verifyWithBackend = async (userData) => {
    try {
      const response = await axios.post('/api/auth/google', {
        token: userData.idToken,
        userId: userData.id
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        setGoogleUser(prev => ({
          ...prev,
          ...response.data.user 
        }));
      }
    } catch (err) {
      setError('Backend verification failed');
      handleLogout();
    }
  };

  const handleLogout = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      setGoogleUser(null);
      // Clear backend session
      axios.post('/api/auth/logout', {}, { withCredentials: true });
    });
  };

  const value = {
    googleUser,
    loading,
    error,
    handleGoogleLogin,
    handleLogout,
    isAuthenticated: !!googleUser
  };

  return (
    <GoogleAuthContext.Provider value={value}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => {
  const context = useContext(GoogleAuthContext);
  if (!context) {
    throw new Error('useGoogleAuth must be used within a GoogleAuthProvider');
  }
  return context;
};