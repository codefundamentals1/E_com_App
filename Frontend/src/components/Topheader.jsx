import React, { useState, useEffect } from "react";
import logo from '../assets/Images/logo.png'
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";
import propic from "../assets/Images/propic.png";
import axios from 'axios'
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaGift,
  FaTrophy,
  FaStar,
} from "react-icons/fa";
import HeaderItems from "./HeaderItems";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import ProductSearch from "./ProductSearch";
//json array for the header 
const profileMenu = [
  // {
  //    name: "login/signup",
  //    icon: MdAccountCircle,

  // },
  {
    name: "My Profile",
    icon: FaUser,
  },
  {
    name: "Get premium",
    icon: FaStar,
  },
  {
    name: "Orders",
    icon: FaShoppingBag,
  },
  {
    name: "Wishlist",
    icon: FaHeart,
  },
  {
    name: "Rewards",
    icon: FaTrophy,
  },
  {
    name: "Gift Cards",
    icon: FaGift,
  },
];

const Topheader = () => {
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);





  const handleLogout = async () => {
    try {
      console.log("[Frontend] Initiating logout process...");
      
      // 1. Attempt backend logout with detailed request logging
      const response = await axios.post('/hi/users/logout', {}, {
        withCredentials: true,
        timeout: 5000,
        headers: {
          'X-Request-ID': crypto.randomUUID(), // Unique ID for request tracing
          'X-Logout-Source': 'web-app' // Identify frontend source
        }
      });

      console.log("[Frontend] Logout API response:", {
        status: response.status,
        data: response.data,
        headers: response.headers
      });

      if (!response.data.success) {
        throw new Error(`Backend reported logout failure: ${response.data.error || 'Unknown error'}`);
      }

      // 2. Client-side cleanup with detailed logging
      const cleanup = () => {
        console.log("[Frontend] Performing client-side cleanup...");
        
        // Remove all auth-related client storage with timestamps
        const removalTime = new Date().toISOString();
        Cookies.remove("authToken", { path: '/', domain: window.location.hostname });
        console.log(`[Frontend] Removed authToken cookie at ${removalTime}`);
        
        localStorage.removeItem("userData");
        console.log(`[Frontend] Cleared userData from localStorage at ${removalTime}`);
        
        sessionStorage.clear();
        console.log(`[Frontend] Cleared all sessionStorage at ${removalTime}`);
        
        // Reset application state
        setIsUserSignedIn(false);
        console.log("[Frontend] Updated auth state to logged out");

        // Redirect with cache busting
        const redirectUrl = `/auth/login?logout=success&t=${Date.now()}`;
        console.log(`[Frontend] Redirecting to: ${redirectUrl}`);
        window.location.href = redirectUrl;
      };

      cleanup();
      
    } catch (error) {
      console.error("[Frontend] Logout error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
        status: error.response?.status
      });

      // Emergency cleanup with fallbacks
      console.warn("[Frontend] Executing emergency cleanup...");
      document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      localStorage.clear();
      sessionStorage.clear();
      setIsUserSignedIn(false);

      // Enhanced error redirect with error details
      const errorParams = new URLSearchParams({
        error: 'logout_failed',
        code: error.response?.status || 'client_error',
        t: Date.now() // Cache bust
      });
      
      if (process.env.NODE_ENV === 'development') {
        errorParams.set('debug', error.message);
      }

      const errorRedirect = `/auth/login?${errorParams.toString()}`;
      console.warn(`[Frontend] Emergency redirect to: ${errorRedirect}`);

      // Triple-layered redirect assurance
      navigate(errorRedirect, { replace: true });
      setTimeout(() => {
        if (!window.location.pathname.startsWith('/auth/login')) {
          window.location.assign(errorRedirect);
        }
      }, 500);

      // Final fallback after 2 seconds
      setTimeout(() => {
        window.location.href = '/auth/login?force_logout=true';
      }, 2000);
    }
  };
  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log("Checking authentication status...");
      try {
        const response = await axios.get('/hi/users/check', {
          withCredentials: true,
          headers: {
            'Cache-Control': 'no-cache',
            'Accept': 'application/json'
          },
          timeout: 5000 // 5 second timeout
        });
  
        console.log("Auth check response:", response.data);
        
        if (response.data?.loggedIn) {
          setIsUserSignedIn(true);
          console.log("User is authenticated");
        } else {
          setIsUserSignedIn(false);
          console.log("User is not authenticated");
          // Clear any invalid tokens
          document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
      } catch (error) {
        setIsUserSignedIn(false);
        
        // Detailed error analysis
        if (error.code === 'ECONNABORTED') {
          console.error('Auth check timeout - server might be slow');
        } else if (error.response) {
          // Server responded with status code outside 2xx
          console.error('Auth check failed with status:', error.response.status);
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          // No response received
          console.error('No response from auth check - network error');
        } else {
          // Request setup error
          console.error('Error setting up auth check:', error.message);
        }
  
        // Clear potentially invalid credentials
        document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }
    };
  
    // Initial check
    checkAuthStatus();
  
    // Set up periodic checks (every 1 minute)
    const intervalId = setInterval(checkAuthStatus, 60000);
    
    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);


  



  return (
    <>
      <div className="flex items-center gap-8 justify-between p-5 ">
        <Link to="/">
          <div className="flex items-center gap-5  ">
            <img
              src={logo}
              alt="not found"
              className="w-[50px] h-[50px] md:w-[120px] object-cover"
            />
          </div>
        </Link>

        <form className="lg:min-w-[600px] md:max-w-[200px] mx-auto">
          <label
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        {/* <ProductSearch/> */}
        <div className="flex">
          <button className="mx-3">
            {" "}
            <CiHeart />
          </button>
          <Link to="/cart">
            <button className=" mx-3">
              {" "}
              <CiShoppingCart />
            </button>
          </Link>
          <div>
            <img
              onClick={() => setToggle(!toggle)}
              className="w-[40px] rounded-full "
              src={propic}
              alt="not found"
            />

            {toggle ? (
              <div className=" z-50 w-[300px] translate-x-[-250px] absolute mt-3 bg-[#121212] border-[1px] p-3  hover:underline-offset-8">
                {isUserSignedIn ? (
                  <div onClick={handleLogout}>
                  <HeaderItems  name={"logout"} Icon={MdAccountCircle} />
                  </div>
                ) : (
                  <Link to="/auth/signin">
                    {" "}
                    <HeaderItems name={"login/signup"} Icon={MdAccountCircle} />
                  </Link>
                )}
                {profileMenu.map((item, index) => (
                  <HeaderItems  key={index} name={item.name} Icon={item.icon} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Topheader;
