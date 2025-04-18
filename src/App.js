 

import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Nav from './Components/Navbar.jsx';
import Home from "./Components/Home.jsx";
import Products from "./Components/Product.jsx";
import About from "./Components/About.jsx";
import Contact from "./Components/Contact.jsx";
import Cakepro from "./Components/Cakepro.jsx";
import Addpage from "./Components/Addpage.jsx";
import ProductDetails from "./Components/ProductDetails";

function App() {
  return (
    <BrowserRouter basename="/Cakefrontend">
      <Nav />
      <Routes>
        {/* Main Home Page */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Products />
              <About />
              <Contact />
            </>
          }
        />

        {/* Menu Page */}
        <Route path="/Menu" element={<Cakepro />} />

        {/* Product Details Page */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Login Page */}
        <Route path="/Login" element={<Addpage />} />

        {/* Redirect to Home for unmatched paths */}
        <Route path="/" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


 
 
