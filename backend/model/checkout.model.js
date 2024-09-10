import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref:"User", required: true
    },
    cartItems: [{type: mongoose.Schema.Types.ObjectId, ref:"Product", required:true}],
    totalPrice: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
    
});
export const Order = mongoose.model("order", orderSchema);


// orderDate: {
//     type: Date,
//     default: Date.now
// }