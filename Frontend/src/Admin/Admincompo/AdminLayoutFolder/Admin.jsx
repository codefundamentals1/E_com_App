// import React, { useEffect, useState } from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import AdminLayout from './AdminLayout'
// import '../../styles/style.min.css'
// import AdminLogin from './AdminLogin'
// import AdminSignup from './AdminSignup'
// import { useAuth } from './AuthProvider'
// import axios from 'axios'
// import Cookies from 'js-cookie'

// const Admin = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState(null)

//   // Function to get cookie by name
//   const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//   }

//   const checkAuth = async () => {
//     console.log("checking login")
//     try {
//       setLoading(true);
      
//       // First check if the authToken cookie exists
//       const authToken = getCookie('authToken');
//       if (!authToken) {
//         setIsAuthenticated(false);
//         setUser(null);
//         return;
//       }
//       else {
//         console.log("Tkoen is  "+ authToken)
//         setIsAuthenticated(true)

//       }
//      } catch (error) {
//       console.error('Error checking user session', error);
//       setIsAuthenticated(false);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Add a loading state while checking auth
//   }

//   return (
//     <div>
//       {!isAuthenticated ? (
//         <Routes>
//           <Route path="/" element={<AdminLogin />} />
//           <Route path="/signup" element={<AdminSignup />} />
//           <Route path="*" element={<Navigate to="/admin" replace />} />
//         </Routes>
//       ) : (
//         <AdminLayout user={user} />
//       )}
//     </div>
//   )
// }

// export default Admin



import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import '../../styles/style.min.css'
import AdminLogin from './AdminLogin'
import AdminSignup from './AdminSignup'
import { useAuth } from './AuthProvider'
import axios from 'axios'
import Cookies from 'js-cookie' // Import js-cookie

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null)

  // Function to check auth status
  const checkAuth = async () => {
    console.log("checking login")
    try {
      setLoading(true);

      // Use js-cookie to get the 'authToken'
      // const authToken = Cookies.get('authToken'); // This is easier to work with than document.cookie
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      };
      console.log(document.cookie); // This will show all cookies accessible to the current domain

      const authToken= getCookie('authToken');
      console.log(authToken)
      if (!authToken) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      } else {
        console.log("Token is " + authToken)
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking user session', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Add a loading state while checking auth
  }

  return (
    <div>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/signup" element={<AdminSignup />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      ) : (
        <AdminLayout user={user} />
      )}
    </div>
  )
}

export default Admin
