import express from "express";
const router   = express.Router();
import {addAdress ,deleteAdress ,getAdress} from "../controller/address/address_controller"
import {verifyToken} from "../middleware/verifytoken"
router.post("/" ,verifyToken, addAdress);
router.get("/" ,verifyToken, getAdress);
router.delete("/:id" , deleteAdress);

export default router;