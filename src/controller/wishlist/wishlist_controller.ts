import wishlistschema from "../../model/wishlist";
import userschema from "../../model/auth";
import {   Request , Response} from "express";
import { json } from "stream/consumers";

/**
 * -------------------------------------------------
 * @method POST
 * @route /api/v1/wishlist/:id
 * @description Add product to wishlist
 * @access Private (only user)
 * ------------------------------------------------
 */
export const addtowishlist = async (req : Request , res : Response) => {
    const userid = (req as any).user?.id;
    const productid = req.params.id;
    console.log(`this is product id ${JSON.stringify(req.body)}`);
    try{
        const verifyuser =   await wishlistschema.findOne({user : userid});
        if(!verifyuser){
          await wishlistschema.insertOne({user : userid , products : [{product : productid}]});  
        }else{
           const verifyproduct  = await wishlistschema.findOne({user : userid , "products.product" : productid});
           if(!verifyproduct){
            await wishlistschema.findOneAndUpdate({user : userid} , {$push : {products : {product : productid}}});
           }else{
            res.status(400).json({message : "Product already exists in wishlist"});
           }
        }
         
        const wishlistproducts =   await wishlistschema.findOne({user : userid})
                                    .populate("user" , "email username")
                                    .populate("products.product" , "name description price size category color images");
                                   
        res.status(200).json({message : "Product added to wishlist successfully" , wishlist : wishlistproducts});
    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
}

/**
 * -------------------------------------------------
 * @method Delete
 * @route /api/v1/wishlist/:id
 * @description remove product to wishlist
 * @access Private (only user)
 * ------------------------------------------------
 */
export const deletefromwishlist = async (req : Request , res : Response) => {
    const userid = (req as any).user?.id;
    const productid = req.params.id;
    console.log(`this is product id ${JSON.stringify(req.body)}`);
    try{
        const verifyuser =   await wishlistschema.find({user : userid});
        console.log(verifyuser);
        if(!verifyuser){
          res.status(402).json({message : "Wishlist is empty"});
          return; 
        }else{
           const verifyproduct  = await wishlistschema.findOne({user : userid , "products.product" : productid});
           if(!verifyproduct){
            res.status(400).json({message : "Product not found in wishlist"});
           }else{
            await wishlistschema.findOneAndUpdate({user : userid} , {$pull : {products : {product : productid}}});
           }
        }
         
        const wishlistproducts =   await wishlistschema.findOne({user : userid})
                                    .populate("user" , "email username")
                                    .populate("products.product" , "name description price size category color images");
                                   
        res.status(200).json({message : "Product deleted from wishlist successfully" , wishlist : wishlistproducts});
    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
}

/**
 * -------------------------------------------------
 * @method Get
 * @route /api/v1/wishlist
 * @description get product from wishlist
 * @access Private (only user)
 * ------------------------------------------------
 */

export const getallwishlist = async (req : Request , res : Response) => {
    
    const userid = (req as any).user?.id;
    console.log(`this is product id ${JSON.stringify(req.body)}`);
    try{
        const verifyuser =   await wishlistschema.findOne({user : userid});
        if(!verifyuser){
          res.status(402).json({message : "Wishlist is empty"});
          return;
        }else{
          
            const wishlistproducts =   await wishlistschema.findOne({user : userid})
                                        
                                        .populate("products.product" , "name description price size category color images").select("products user");
             res.status(200).json({message : "here is your wishlist" , wishlist : wishlistproducts});
        }
         
                                   
    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
}


