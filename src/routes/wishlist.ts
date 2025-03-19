import express from "express";
import {addtowishlist , deletefromwishlist , getallwishlist} from "../controller/wishlist/wishlist_controller";
import {verifyToken} from "../middleware/verifytoken";
const router   = express.Router();

router.post("/add/:id" ,verifyToken ,addtowishlist);
router.delete("/delete/:id" , verifyToken , deletefromwishlist);
router.get("/getall",verifyToken,  getallwishlist);

export default router;