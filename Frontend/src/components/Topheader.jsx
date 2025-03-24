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
      console.log("Logging out...");
  
      // Send GET request to logout API
      const response = await axios.get("/api/auth/logout", { withCredentials: true });
  
      // Handle successful logout
      if (response.status === 200) {
        console.log(response.data.message); // 'Logged out successfully'
  
        // Remove session cookie from the client (optional, as server already clears it)
        Cookies.remove("connect.sid");
  
        // Update state to reflect that the user is logged out
        setIsUserSignedIn(false);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  useEffect(() => {
    // Check if the user is logged in by calling the backend endpoint
    axios.get('/api/auth/check', { withCredentials: true })
      .then(response => {
        if (response.data.loggedIn) {
          setIsUserSignedIn(true);
        } else {
          setIsUserSignedIn(false);
        }
      })
      .catch(error => {
        console.error('Error checking user session', error);
        setIsUserLoggedIn(false); // Handle error, assume not logged in
      });
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
