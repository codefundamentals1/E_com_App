import React from 'react'
import Topheader from './Topheader'
import Header from './Header'
import GenreItemList from './GenreItemList'
import Slider from './Slider'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Layout = () => {
  return (
<>
<Topheader/>
     <Header></Header>
    <Outlet></Outlet>
     {/* <Productionhouse/> */}
     <hr/>
     <Footer></Footer>
</>  
)
}

export default Layout