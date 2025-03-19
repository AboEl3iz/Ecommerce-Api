import express from "express";
import {addManyProducts ,addProduct ,deleteProduct,getAllProducts,getOneProduct,updateProduct,searchProduct} from "../controller/product/product_controller";
import {multerupload} from "../middleware/fileapload"
const router   = express.Router();
/**
 * @description add new product
 * @access only admin
 */
router.post("/add" ,multerupload.single("image"), addProduct);
router.post("/addMany" , addManyProducts);
router.put("/update/:id" , updateProduct);
router.delete("/delete/:id" , deleteProduct);
router.get("/get/:id" , getOneProduct);
router.get("/getall" , getAllProducts);

export default router