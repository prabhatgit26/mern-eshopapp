import { Order } from "../model/checkout.model.js";
import { Cart } from "../model/cart.model.js";

export const placeOrder = async (request, response, next)=>{
    try{
        const{userId, cartItems, totalPrice, orderDate } = request.body;
        if (!userId || !cartItems || !totalPrice) {
            return response.status(400).json({ success: false, message: "All fields are required" });
        }

        const newOrder = new Order({
            userId,
            cartItems,
            totalPrice,
            orderDate
            // address,
            // paymentMethod
        });
        await newOrder.save();

        await Cart.deleteMany({userId});
  
        response.status(200).json({success:true, message: "Order Placed Successfully"});
    }
    catch (err) {
        response.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};
