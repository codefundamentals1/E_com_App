import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import '../../styles/style.min.css'
import AdminLogin from './AdminLogin'
import AdminSignup from './AdminSignup'
import axios from 'axios'

const Admin = () => {
  const Navigate = useNavigate();
  const [triggerRerender, setTriggerRerender] = useState(0); 
  const [isAuthenticated , setisAuthenticated] = useState(false)
 
  useEffect(() => {
    axios.get('/hi/users/check', { withCredentials: true })
      .then(response => {
        if (response.data.loggedIn) {
          setisAuthenticated(true);
          setTriggerRerender(prev => prev + 1); 
          console.log(response.data.loggedIn)
        } else {
          setisAuthenticated(false);
        }
      })
      .catch(error => {
        console.error('Error checking user session', error);
        setisAuthenticated(false);
      });
  }, []); 
  
  
  const auth = false;
  return (
    <div key={isAuthenticated ? "loggedIn" : "loggedOut"}>
    {!isAuthenticated ? (
       <Routes>
         <Route path="/" element={<AdminLogin />} />
         <Route path="/signup" element={<AdminSignup />} />
       </Routes>
     ) : ( 
        <AdminLayout  />
       )
      }
        </div>
    
  )
}

export default Admin