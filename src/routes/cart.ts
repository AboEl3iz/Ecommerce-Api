import express from "express";
import {addcart ,deletefromcart ,getfromcart} from "../controller/cart/cart_controller"
import {verifyToken} from "../middleware/verifytoken";


const router   = express.Router();

router.route("/").post(verifyToken, addcart)
.get(verifyToken, getfromcart)
.delete(verifyToken, deletefromcart);


export default router;