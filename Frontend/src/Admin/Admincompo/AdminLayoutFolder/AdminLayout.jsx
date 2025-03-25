import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import Adminmain from './Adminmain';
import AdminFooter from './AdminFooter';
import AdminLogin from './AdminLogin';
import AdminSignup from './AdminSignup';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Routes, Route, useNavigate } from "react-router-dom";
const AdminLayout = () => {
  const Navigate = useNavigate();
  const [triggerRerender, setTriggerRerender] = useState(0); // 🔥 Force re-render
  const [isAuthenticated , setisAuthenticated] = useState(false)
 
useEffect(() => {
  axios.get('/api/admin/auth/check', { withCredentials: true })
    .then(response => {
      if (response.data.loggedIn) {
        setisAuthenticated(true);
        setTriggerRerender(prev => prev + 1); // 🔥 Change state to trigger re-render
      } else {
        setIsAuthenticated(false);
      }
    })
    .catch(error => {
      console.error('Error checking user session', error);
      setisAuthenticated(false);
    });
}, []); // ✅ Only run

  return (
    <>
      <div key={isAuthenticated ? "loggedIn" : "loggedOut"}>
     {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/signup" element={<AdminSignup />} />
        </Routes>
      ) : (
        <>           
        
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="flex flex-col flex-1overflow-y-auto">
          <AdminNavbar />
            <Adminmain /> 
            <AdminFooter />
          </div>
          </div>
        </>
      )}
    

    </div>
    
    </>
  )
}

export default AdminLayout