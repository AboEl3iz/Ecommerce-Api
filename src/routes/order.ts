import express from "express";
const router = express.Router();
import {verifyToken , verifyAdmin} from "../middleware/verifytoken";
import {createOrder, changeOrderState , cancelOrder, getAllOrders ,getUserOrders} from "../controller/order/order_controller";

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getUserOrders);
router.put("/:id", verifyToken, changeOrderState);
router.delete("/:id", verifyToken, cancelOrder);
router.get("/", verifyAdmin, getAllOrders);
export default router;