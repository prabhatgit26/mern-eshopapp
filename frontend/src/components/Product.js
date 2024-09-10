import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import WebApis from "../apis/WebApis";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Product(){
    const [productList,setProductList] = useState([]);
    const {isLoggedIn, user, token} = useSelector((store)=>store.User);
    const { category } = useParams();
    useEffect(()=>{
        loadProducts();
    },[]);
    const loadProducts = async()=>{
        try{
            let response = await axios.get(`${WebApis.PRODUCT_LIST}?category=${category}`);
            setProductList(response.data.products);
            console.log(response.data.products);
        }
        catch(err){
            console.log(err);
        }
    }
    const addToCart = async (productId)=>{
        try{
            if(!isLoggedIn)
                toast.info("Please Sign In First");
            else{
                let userId = user._id;
                let response = axios.post(WebApis.ADD_TO_CART, {userId,productId});
                (await response).data.status ? toast.success((await response).data.message) : toast.info((await response).data.message);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return <>
        <ToastContainer/>
        <div className="container">
            <div className="row">
                {productList.map((product,index)=><div key={index} className="col-md-3 p-2">
                <div className="d-flex flex-column align-items-center" style={{width:"100%", boxShadow:"5px 5px 5px 5px grey"}}>
                    <img src={product.thumbnail} style={{widows:"100%", height:"200px"}}/>
                    <h6 className="mt-2">{product.title.substring(0,25)}</h6>
                    <small>Price : <b><label className="text-success">{product.price} Rs.</label></b></small>
                    <small className="mb-1 text-primary" style={{cursor:"pointer"}}>View more</small>
                    <button onClick={()=>addToCart(product._id)} className="btn btn-secondary mb-1" style={{width:"100%"}}>Add To Cart</button>
                </div>
                </div>)}
            </div>
        </div>
    </>
}