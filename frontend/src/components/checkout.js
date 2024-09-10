/*
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WebApis from "../apis/WebApis";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Checkout() {
  const { cartItemList, totalPrice } = useSelector((store) => store.CartItems);
  const { user, token, isLoggedIn } = useSelector((store) => store.User);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [orderList, setOrderList] = useState([]);
  const navigate = useNavigate();
  const [orderDate, setOrderDate] = useState(""); // Add state for orderDate

  useEffect(() => {
    loadCheckout();
  }, []);

  const loadCheckout = async () => {
    
    setLoading(true);
    const currentOrderDate = new Date().toISOString();
    setOrderDate(currentOrderDate); // Set orderDate in state
    try {
      let response = await axios.post(WebApis.CHECKOUT, {
        userId: user._id,
        cartItems: cartItemList,
        totalPrice: totalPrice,
        orderDate: currentOrderDate,
      });

      if (response.data.success) {
        toast.success("Order Placed Successfully !");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
    return (
    <>
      <ToastContainer />
        <div className="container-fluid bg-dark" style={{height:"199px"}}>
            <a className="navbar-brand" href="/sign-in" style={{marginLeft:"0px"}}><b style={{fontSize: "50px",fontFamily: "cursive",color: "whitesmoke"}}>E-</b><small style={{ fontSize: "50px" }} className="text-danger">Shop</small></a>
            
            <header><h6 style={{fontSize:"18px", color:"wheat", fontFamily:"cursive"}}>  Transform Your World</h6> </header>    
            <header className="container-fluid bg-dark" style={{ marginLeft:"-50px" }}> <h6 className="text-white" style={{marginTop:"0px"}}>___________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________</h6> </header>
            <header className="container-fluid bg-dark" style={{ marginLeft:"-50px" }}> <h6 className="text-white" style={{marginTop:"-25px"}}>___________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________</h6> </header>
            <header className="bg-dark d-flex justify-content-center align-items-center" style={{ height: "30px" }}>
                <h6 className="text-white " style={{ fontSize: "20px", marginTop:"30px",fontFamily:"monospace" }}>Final Cart Details & Checkout to Place Order</h6>
            </header>
        </div>

        <div className="container mt-5 ">
            <header className="bg-warning d-flex justify-content-center align-items-center col-md-8" style={{ height: "50px" }}>
                <h6 className="text-white" style={{ fontSize: "30px" }}>Checkout</h6>
            </header>
            <div className="row">
                <div className="col-md-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItemList.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><img src={item.productId.thumbnail} style={{ width: "50%" }} alt="Image"/></td>
                                <td>{item.productId.title}</td>
                                <td>{item.productId.price}</td>
                                <td>{item.productId.qty}</td>
                                <td>{item.productId.price * item.productId.qty}</td>
                            </tr>))}
                            <tr>
                                <td colSpan="4" className="text-right">Total Amount:</td>
                                <td>{totalPrice} Rs.</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>Order Date: {new Date(orderDate).toLocaleString()}</p>
                    <button className="btn btn-success" onClick={loadCheckout}>{loading ? "Processing..." : "Confirm Order"}</button>
                    <Link to="/view-cart"><button className="btn btn-primary"style={{ marginLeft: "38px" }}>Back To Cart</button></Link>
                </div>
            </div>
        </div>
    </>
    );
}
*/


import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import WebApis from "../apis/WebApis";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Checkout = memo(() => {
  const { cartItemList, totalPrice } = useSelector((store) => store.CartItems);
  const { user } = useSelector((store) => store.User);
  const [loading, setLoading] = useState(false);
  const [orderDate, setOrderDate] = useState(""); // Add state for orderDate
  const navigate = useNavigate();

  useEffect(() => {
    loadCheckout();
  }, []); // Empty dependency array ensures this runs only once on mount

  const loadCheckout = async () => {
    setLoading(true);
    const currentOrderDate = new Date().toISOString();
    setOrderDate(currentOrderDate); // Set orderDate in state
    try {
      let response = await axios.post(WebApis.CHECKOUT, {
        userId: user._id,
        cartItems: cartItemList,
        totalPrice: totalPrice,
        orderDate: currentOrderDate,
      });

      if (response.data.success) {
        toast.success("Order Placed Successfully !");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid bg-dark" style={{ height: "199px" }}>
        <a className="navbar-brand" href="/sign-in" style={{ marginLeft: "0px" }}>
          <b style={{ fontSize: "50px", fontFamily: "cursive", color: "whitesmoke" }}>E-</b>
          <small style={{ fontSize: "50px" }} className="text-danger">Shop</small>
        </a>

        <header>
          <h6 style={{ fontSize: "18px", color: "wheat", fontFamily: "cursive" }}>Transform Your World</h6>
        </header>
        <header className="container-fluid bg-dark" style={{ marginLeft: "-50px" }}>
          <h6 className="text-white" style={{ marginTop: "0px" }}>________________________________________________________________________________________</h6>
        </header>
        <header className="container-fluid bg-dark" style={{ marginLeft: "-50px" }}>
          <h6 className="text-white" style={{ marginTop: "-25px" }}>________________________________________________________________________________________</h6>
        </header>
        <header className="bg-dark d-flex justify-content-center align-items-center" style={{ height: "30px" }}>
          <h6 className="text-white" style={{ fontSize: "20px", marginTop: "30px", fontFamily: "monospace" }}>Final Cart Details & Checkout to Place Order</h6>
        </header>
      </div>

      <div className="container mt-5 ">
        <header className="bg-warning d-flex justify-content-center align-items-center col-md-8" style={{ height: "50px" }}>
          <h6 className="text-white" style={{ fontSize: "30px" }}>Checkout</h6>
        </header>
        <div className="row">
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItemList.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td><img src={item.productId.thumbnail} style={{ width: "50%" }} alt="Image" /></td>
                    <td>{item.productId.title}</td>
                    <td>{item.productId.price}</td>
                    <td>{item.productId.qty}</td>
                    <td>{item.productId.price * item.productId.qty}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" className="text-right">Total Amount:</td>
                  <td>{totalPrice} Rs.</td>
                </tr>
              </tbody>
            </table>
            <p>Order Date: {new Date(orderDate).toLocaleString()}</p>
            <button className="btn btn-success" onClick={loadCheckout}>{loading ? "Processing..." : "Confirm Order"}</button>
            <Link to="/view-cart">
              <button className="btn btn-primary" style={{ marginLeft: "38px" }}>Back To Cart</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
});


const MemoizedThird = React.memo(Checkout);
export default MemoizedThird;