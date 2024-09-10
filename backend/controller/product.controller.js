// import { request, response } from "express";
import { request, response } from "express";
import { Product } from "../model/product.model.js";
// import { Result } from "express-validator";

export const saveInBulk = (request,response,next)=>{
    Product.insertMany(request.body)
    .then(result=>{
        return response.status(201).json({message:"All Product Saved Successfully."});
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:"Internal Server Error."});
    })
};
export const getProductList = (request, response, next)=>{
    Product.find()
    .then(result=>{
        return response.status(200).json({products: result});
    }).catch(err=>{
        return response.status(500).json({error:"Internal Server Error."});
    })
}
export const getProduct = async (request,response,next)=>{
    const { categoryId } = req.params;
    try{
        if (!categoryId) {
            return res.status(400).json({ message: 'Category ID is required' });
        }
        const product = await Product.findOne({category: categoryId});
        return product ? response.status(200).json({product}) : response.status(404).json({error:"Resource not found | id not found."});
    }
    catch(err){
        return response.status(500).json({error:"Internal Server Error."});
    }
}

export const getProductsByCategory = async (response, request, next) => {
    const { categoryId } = request.params;

    try {
        const products = await Product.find({ categoryId });
        console.log("Found products:", products);  // Debugging log
        if (products.length === 0) {
            return response.status(404).json({ status: false, message: "No products found for this category" });
        }
        response.status(200).json({ status: true, products });
    } catch (error) {
        console.error(error);
        response.status(500).json({ status: false, message: "Server Error" });
    }
};

export const deleteProduct = async (request,response,next)=>{
    let id = request.params.id;
    try{
        let product = await Product.deleteOne({_id: id});
        return product ? response.status(200).json({message:"Product deleted from database.", product}) : response.status(404).json({error:"Resource not found | id Not found."});
    }
    catch(err){
        return response.status(500).json({error:"Internal Server Error."});
    }
}