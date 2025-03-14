import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import './index.css'
// import App from './App.jsx'
import React, { useRef } from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './components/Layout.jsx'
import Cart from './components/Cart.jsx'
import GenreItemList from './components/GenreItemList.jsx'
import Slider from './components/Slider.jsx'
import Home from './components/Home.jsx'
import Signin from './components/Signin.jsx'
import Signup from './components/Signup.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={< Layout/>}>
        <Route path ='' element={<Home/>}/>
        <Route path='cart' element={< Cart />} />
        <Route path='auth/signin' element={<Signin/>}/>
        <Route path='auth/signup' element={<Signup/>}/>

      {/* <Route path='' element={ <Citiescont/> }/> */}
      {/* <Route path='contact' element={<Contact />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} /> */}
      {/* <Route path='login' element={<Login />} />
      <Route path='sidebar' element={<Sidebar />} />
      <Route path='main' element={<Newtrip />} />
      <Route path='main/details' element={<Mainpage />} /> */}


   </Route>



  )

)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
