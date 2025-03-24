import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import Adminmain from './Adminmain';
import AdminFooter from './AdminFooter';
import AdminLogin from './AdminLogin';
import AdminSignup from './AdminSignup';
import React, { useEffect, useState } from "react";
// import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from "react-router-dom";
// import '../../styles/style.min.css'
const AdminLayout = () => {
  const isAuthenticated = true

  return (
    <>
     {!isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
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
    

    
    
    </>
  )
}

export default AdminLayout