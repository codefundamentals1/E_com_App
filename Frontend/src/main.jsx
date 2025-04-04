import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import "./index.css";
// import App from './App.jsx'
import React, { useRef } from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/Layout.jsx";
import Cart from "./components/Cart.jsx";
import GenreItemList from "./components/GenreItemList.jsx";
import Slider from "./components/Slider.jsx";
import Home from "./components/Home.jsx";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import Productpage from "./components/Productcomp/Productpage.jsx";
import ReviewPage from "./components/Productcomp/ReviewPage.jsx";
import ProdPagetemp from "./components/Productcomp/ProdPagetemp.jsx";
import Admin from "./Admin/Admincompo/AdminLayoutFolder/Admin.jsx";
import Adminmain from "./Admin/Admincompo/AdminLayoutFolder/Adminmain.jsx";
import ProductListingCard from "./components/ProductListing/ProductListingCard.jsx";
import AdminLogin from "./Admin/Admincompo/AdminLayoutFolder/AdminLogin.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="auth/signin" element={<Signin />} />
        <Route path="auth/signup" element={<Signup />} />
        <Route path="product/overview/:id" element={<ProdPagetemp />} />
        <Route path="listing" element={<ProductListingCard />} />
        <Route path="listing/:id" element={<ProductListingCard />} />
      </Route>

      {/* //Routes for admin */}

      <Route path="admin/*" element={<Admin />}>
        <Route index element={<Adminmain />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
