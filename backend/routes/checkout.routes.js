import express from "express";
import { placeOrder } from "../controller/checkout.controller.js";
const router = express.Router();

router.post("/place-order", placeOrder);

export default router;
