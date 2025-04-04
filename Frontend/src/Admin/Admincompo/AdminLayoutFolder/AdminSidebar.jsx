import React, { useState } from 'react'
import * as Icons from 'react-icons/tb';
// import { useDispatch } from 'react-redux';
import Logo from '../../images/common/logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import navigation from '../../api/navigation.jsx'
import axios from 'axios';
// import {logout} from '../../store/slices/authenticationSlice.jsx';



const AdminSidebar = () => {
    // const dispatch = useDispatch();
const navigate = useNavigate();
const [triggerRerender, setTriggerRerender] = useState(0); // 🔥 Force re-render
    const [toggle, setToggle] = useState(null);
    const [sidebar, setSidebar] = useState(false);

    const handleLogout = async () => {
      try {
        console.log("Initiating logout...");
        // Send POST request to logout endpoint (POST is more appropriate for logout)
        const response = await axios.post('/hi/users/logout', {}, {
          withCredentials: true
        });
    
        // Handle successful logout
        if (response.status === 200) {
          console.log('Logout successful:', response.data.message);
          
          // Update application state
          setIsUserSignedIn(false);
          
          // Redirect to login page with a small delay for better UX
          setTimeout(() => navigate('/admin'), 500);
          
          // Optional: Force refresh to ensure all state is cleared
          window.location.reload();
        }
      } catch (error) {
        console.error('Logout failed:', error);
        
        // Handle specific error cases
        if (error.response) {
          if (error.response.status === 401) {
            console.log('No active session to logout from');
            // Still clear client-side data
         
            setIsUserSignedIn(false);
            navigate('/admin');
          } else {
            console.error('Server error during logout:', error.response.data);
          }
        } else {
          console.error('Network error during logout:', error.message);
        }
      }
    };

    const handleManu = (key) => {
      setToggle((prevToggle) => (prevToggle === key ? null : key));
    };
  
    const handleSidebar = () => {
      setSidebar(!sidebar);
    };
  
    const handleIsLogout = () => {
    //   dispatch(logout())
    };
 
    return (
        <div className={`max sidemenu ${sidebar ? 'active' : ''}`}>
          {/* Admin User */}
          <div className="sidebar_profile">
            {/*<Link to="/" className="logo">
              <img src={Logo} alt="logo" />
            </Link>*/}
    
            <h2 className="logo_text">Your Logo</h2>
            <Link className="navbar_icon menu_sidebar" onClick={handleSidebar}>
              <Icons.TbChevronsLeft className={`${sidebar ? 'active' : ''}`} />
            </Link>
          </div>
          {/* menu links */}
          <ul className="menu_main">
            {navigation.map(function (navigationItem, key) {
              return (
                <li key={key}>
                  {!navigationItem.subMenu ? (
                    <NavLink
                      to={`${navigationItem.url}`}
                      className={`menu_link ${toggle === key ? 'active' : ''}`}
                      onClick={() => handleManu(key)}
                    >
                      {navigationItem.icon}
                      <span>{navigationItem.name}</span>
                      {navigationItem.subMenu ? <Icons.TbChevronDown /> : ''}
                    </NavLink>
                  ) : (
                    <div className="menu_link" onClick={() => handleManu(key)}>
                      {navigationItem.icon}
                      <span>{navigationItem.name}</span>
                      {navigationItem.subMenu ? <Icons.TbChevronDown /> : ''}
                    </div>
                  )}
                  {navigationItem.subMenu ? (
                    <ul className={`sub_menu ${toggle === key ? 'active' : ''}`}>
                      {navigationItem.subMenu &&
                        navigationItem.subMenu.map(function (subNavigationItem, subKey) {
                          return (
                            <li key={subKey}>
                              <NavLink
                                to={`${navigationItem.url}${subNavigationItem.url}`}
                                className="menu_link"
                              >
                                {subNavigationItem.icon}
                                <span>{subNavigationItem.name}</span>
                                {subNavigationItem.subMenu ? <Icons.TbChevronDown /> : ''}
                              </NavLink>
                            </li>
                          );
                        })}
                    </ul>
                  ) : (
                    ''
                  )}
                </li>
              );
            })}
            <div
              className={`menu_link`}
              onClick={handleLogout}
            >
              <Icons.TbLogout className="menu_icon" />
              <span>Logout</span>
            </div>
          </ul>
        </div>
      );  


}

export default AdminSidebar