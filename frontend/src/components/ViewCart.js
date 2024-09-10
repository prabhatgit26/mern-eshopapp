/*
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import WebApis from "../apis/WebApis";

export default function ViewCart(){
  const { token,user } = useSelector((store)=>store.User);
  const [cartItemList, setcartItemList] = useState([]);
  useEffect(()=>{
    loadCartItems();
  },[]);
  const loadCartItems = async ()=>{
    try{
      let response = await axios.get(WebApis.VIEW_CART+user._id,{headers:{"Autharization":"Bearer"+token}});
      console.log(response.data);
      setcartItemList(response.data.cart.cartItems);
    }
    catch(err){
      console.log(err);
    }
  }
  return <>
    <div className="container mt-5">
      <header className="bg-danger d-flex justify-content-center align-items-center col-md-8" style={{height:"50px"}}>
        <h4 className="text-white" style={{fontSize:"30px"}}>Cart Details</h4>
      </header>
      <div className="row">
        <div className="col-md-8">
          <table className="table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Product name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItemList.map((item,index)=><tr key={index}>
              <td>{index+1}</td>
                  <td>{item.productId.title}</td>
                  <td>{item.productId.brand ? item.productId.brand: "N/A"}</td>
                  <td>{item.productId.price}</td>
                  <td>
                    <input type="number" defaultValue="1" style={{width:"50px",height:"20px"}}/>
                  </td>
                  <td>50000</td>
                  <td><small className="text-danger">Remove</small></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
} 
*/

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import WebApis from "../apis/WebApis";
import { removeItem, setCartItemList, updateQuantity } from "../redux-config/CartItemSlice";
import { useNavigate } from "react-router-dom";


export default function ViewCart() {
  const { token, user, isLoggedIn } = useSelector((store) => store.User);
  const {cartItemList, totalPrice} = useSelector((store)=>store.CartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user._id && token && isLoggedIn) { // Ensure user, user._id, and token are defined
      loadCartItems();
    } else {
      console.warn('User, user._id, or token is not available');
    }
  }, [user, token, isLoggedIn]); // Include user and token in dependency array

  const loadCartItems = async () => {
    try {
      console.log('Fetching cart items with user._id:', user._id, 'and token:', token);
      const response = await axios.get(`${WebApis.VIEW_CART}${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
        
      });
      console.log('Cart items response:', response.data);
      
      if (response.data && response.data.cart && Array.isArray(response.data.cart.cartItems)) {
        dispatch(setCartItemList(response.data.cart.cartItems));
      } else {
        console.warn('Cart data is not in the expected format');
      }
    } catch (err) {
      console.error('Error fetching cart items:', err);
    }
  };

  const removeCartItems = (index, productId)=>{
    axios.delete(WebApis.DELETECARTITEM+productId+"/"+user._id)
    .then(result=>{
      dispatch(removeItem(index));
    }).catch(err=>{
      window.alert("Oops ! Something went wrong.");
    });
  }

  const loadCheckout = async ()=>{
    navigate("/checkout");
  };


  return (
    <div className="container mt-5">
      <header
        className="bg-danger d-flex justify-content-center align-items-center col-md-8"
        style={{ height: "50px" }}
      >
        <h6 className="text-white" style={{ fontSize: "30px" }}>
          Cart Details
        </h6>
      </header>
      <div className="row">
        <div className="col-md-8">
          <table className="table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Product Image</th>
                <th>Product name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItemList.length > 0 ? (
                cartItemList.map((item, index) => (
                  <tr id={"row"+index} key={index}>
                    <td>{index + 1}</td>
                    <td><img src={item.productId.thumbnail} style={{ width:"50%"}} alt="Image" /></td>
                    <td>{item.productId?.title || 'N/A'}</td>
                    <td>{item.productId?.brand || 'N/A'}</td>
                    <td>{item.productId?.price || 'N/A'}</td>
                    <td>
                      <input onChange={(event)=>dispatch(updateQuantity({qty: event.target.value,index}))} type="number" value={item.productId.qty} style={{ width: "40px", height: "20px" }} />
                    </td>
                    <td>{item.productId.price*item.productId.qty}</td>
                    <td>
                      <small onClick={()=>removeCartItems(index,item.productId._id)} style={{cursor:"pointer"}} className="text-danger">Remove</small>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center" style={{ fontSize: "100px", color: "grey" }}>
                    No items in cart
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-md-3" style={{marginLeft:"95px", paddingTop:"80px"}}>
            <div className="p-1" style={{height:"165px",boxShadow:"3px 3px 3px 3px grey"}}>
              <h6 className="text-center bg-dark text-white p-2">Order Summery</h6>
              <div className="d-flex justify-content-between p-2">
                <small>Total Items</small>
                <small>{cartItemList.length}</small>
              </div>
              <div className="d-flex justify-content-between p-2">
                <small>Total Bill Amount</small>
                <small>{totalPrice.toFixed(2)} Rs.</small>
              </div>
              <button className="btn btn-warning" style={{width:"100%"}} onClick={loadCheckout}>Checkout</button>
            </div>
          </div>
      </div>
    </div>
  );   
}

