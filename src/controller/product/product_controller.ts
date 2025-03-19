import {   Request , Response} from "express";
import productschema from "../../model/product";
import uploadtocloudinary from "../../middleware/uploadtocloudinary";
import fs from "node:fs"
import { v2 as cloudinaryv2 } from "cloudinary";
/**
 * -------------------------------------------------
 * @method POST
 * @route /api/v1/product
 * @description Add products
 * @access for admin
 * ------------------------------------------------
 */
export const addManyProducts = async (req: Request, res: Response) => {
    try {
        const products = req.body; // Expecting an array of products

        if (!Array.isArray(products) || products.length === 0) {
            res.status(400).json({ message: "Invalid input: Please provide an array of products" });
            return 
        }

        const newProducts = await productschema.insertMany(products);

        res.status(201).json({ message: "Products added successfully", products: newProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Something went wrong: ${error}` });
    }
};

/**
 * -------------------------------------------------
 * @method POST
 * @route /api/v1/product
 * @description Add product
 * @access private for admin
 * ------------------------------------------------
 */
export const addProduct = async (req : Request , res : Response) => {
    try{
        const {name , description , price , images , category , color} = req.body;
        if(!req.file){
            res.status(400).json({ error: "No file uploaded" });
            return 
        }
        let imageurl  = "";
        let public_id  = "";
        
        await uploadtocloudinary(req.file.path).then((result : any) => {
            console.log(result);
            imageurl = result.url;
            public_id = result.public_id;
        }).catch((error : any) => {
            console.log(error);
        })
        const product = new productschema({...req.body , image : {url : imageurl , public_id : public_id}});
        await product.save();
        res.status(201).json({message : "Product added successfully" , product});
         fs.unlinkSync(req.file.path);
    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
   
}

/**
 * -------------------------------------------------
 * @method Delete
 * @route /api/v1/product/:id
 * @description delete product
 * @access private for admin
 * ------------------------------------------------
 */

export const deleteProduct = async (req : Request , res : Response) => {
    try{
        const productid = req.params.id;
        
       
       const product = await productschema.findByIdAndDelete({_id : productid});
        console.log(`${product.image}`);
        await cloudinaryv2.uploader.destroy(product.image.public_id);
        res.status(201).json({message : "Product deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
}

/**
 * -------------------------------------------------
 * @method Get
 * @route /api/v1/product
 * @description get all products => pagination
 * @access public
 * ------------------------------------------------
 */

export const getAllProducts = async (req : Request , res : Response) => {
    try{
      let  {pageNumber , limit} = req.query;
       
        const product =   await productschema.find().skip((Number(pageNumber) - 1 ) * Number(limit)).limit(Number(limit));
        res.status(200).json({message : "Products fetched successfully", product});
    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
}

/**
 * -------------------------------------------------
 * @method Get
 * @route /api/v1/product/:id
 * @description get product details
 * @access public
 * ------------------------------------------------
 */

export const getOneProduct = async (req : Request , res : Response) => {
    try{
        const productid = req.params.id;
       
        const product =   await productschema.findById({_id : productid});
        if(!product){
            res.status(404).json({message : "Product not found"});
        }
        res.status(200).json({ product});
    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
}

/**
 * -------------------------------------------------
 * @method Put
 * @route /api/v1/product/:id
 * @description update product
 * @access private for admin
 * ------------------------------------------------
 */
export const updateProduct = async (req : Request , res : Response) => {
    try{
        const productid = req.params.id;
       
        await productschema.findOneAndUpdate({_id : productid},{...req.body} , {new : true});
        res.status(201).json({message : "Product updated successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
}

/**
 * -------------------------------------------------
 * @method get
 * @route /api/v1/product
 * @description search a product by name or category
 * @access public
 * ------------------------------------------------
 */

export const searchProduct = async (req : Request , res : Response) => {
    
    try{
        const {name , category} = req.query;
        const product =   await productschema.find({$or : [{name : name} , {category : category}]});
        res.status(200).json({message : "Products fetched successfully", product});
    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
}
