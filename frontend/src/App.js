import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import { useDispatch } from "react-redux";
import { createContext, useEffect, useState } from "react";
import { fetchCategory } from "./redux-config/CategorySlice";
import Header from "./components/Header";
import Product from "./components/Product";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ViewCart from "./components/ViewCart";
import Checkout from "./components/checkout";
import Auth from "./components/Auth";
import Footer from "./components/Footer";


function App(){
  const dispatch = useDispatch();
  const location = useLocation();

  const showHeader = location.pathname !=="/checkout";  

  useEffect(()=>{
    dispatch(fetchCategory());
  },[]);
  return <>
    
    {showHeader && <Header/>}
    <div>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/product" element={<Product/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/view-cart" element={<Auth><ViewCart/></Auth>}/>
          <Route path="/checkout" element={<Auth><Checkout/></Auth>}/>
      </Routes>
    </div>
    
    <Footer/>
  </>
}
export default App;