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

  return (
    <>
             
        
        <div className="flex min-h-screen ">
          <AdminSidebar />
          <div className="flex flex-col flex-1overflow-y-auto">
            <div className='top-0 w-full'>
          <AdminNavbar />
          </div>
            <Adminmain  /> 
            
          </div>
          </div>
        </>
      
    

    
  )
}

export default AdminLayout