import express from "express";
import { deleteProduct, getProduct, getProductList, saveInBulk, getProductsByCategory } from "../controller/product.controller.js";
const router = express.Router();

router.post("/save-in-bulk",saveInBulk);
router.get("/list",getProductList);
router.get("/:id",getProduct);
router.get('/category/:categoryId', getProductsByCategory);
router.delete("/:id",deleteProduct);
export default router; 

