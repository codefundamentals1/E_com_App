import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoogleAuthButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status and get user profile
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authResponse = await axios.get('/hi/users/status', { withCredentials: true });
        
        if (authResponse.data.isAuthenticated) {
          const profileResponse = await axios.get('/hi/users/profile', { withCredentials: true });
          setUser(profileResponse.data);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_PUBLIC_API_GATEWAY_URL}/users/auth/google`;
  };

  const handleLogout = async () => {
    try {
      await axios.post('hi/users/logout', { withCredentials: true });
      setIsAuthenticated(false);
      setUser(null);
      window.location.href = '/'; // Optional: reload to clear state
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-3">
        {user.avatar && (
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
        )}
        <span className="text-sm font-medium">{user.name}</span>
        <button 
          onClick={handleLogout}
          className="ml-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.667-4.166-2.685-6.735-2.685-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.496 10-10 0-0.67-0.069-1.325-0.189-1.961h-9.811z"/>
      </svg>
      Sign in with Google
    </button>
  );
};

export default GoogleAuthButton;