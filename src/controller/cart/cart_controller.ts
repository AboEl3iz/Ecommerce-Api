import cartschema from "../../model/cart";
import userschema from "../../model/auth";
import {   Request , Response} from "express";
import { json } from "stream/consumers";

/**
 * -------------------------------------------------
 * @method POST
 * @route /api/v1/cart
 * @description Add product to cart
 * @access user hiself
 * ------------------------------------------------
 */
export const addcart = async (req : Request , res : Response) => {
    const userid = (req as any).user?.id;
    const quantity = req.body.quantity;
    const productId = req.body.product;
    console.log(`this is product id ${JSON.stringify(req.body)} \t \t
    ${quantity}
    ${productId}
    `);
    try{
        let verifyuser =   await cartschema.findOne({user : userid});
        if(!verifyuser){
            verifyuser = await cartschema.insertOne({user : userid , products : []});  
        }
        const productIndex= verifyuser.products.findIndex((product : any) => product.product.toString() === productId);
        if(productIndex !== -1){
            //increase quantity
            verifyuser.products[productIndex].quantity = verifyuser.products[productIndex].quantity + 1;
            
        }else{
            //add product
            verifyuser.products.push({product : productId , quantity : quantity});
        }
        
       
         await verifyuser.save();
        const products =   await cartschema.findOne({user : userid})
                                     .populate("user" , "username")
                                     .populate("products.product" , "name description price size category color images");
                                   
        res.status(200).json({message : "Product added to cart successfully" , products});
    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
}

/**
 * -------------------------------------------------
 * @method Delete
 * @route /api/v1/cart
 * @description remove product to cart
 * @access user hiself
 * ------------------------------------------------
 */

export const deletefromcart = async (req : Request , res : Response) => {
    const userid = req.params.userid;
   
    const productId = req.body.products[0].product;
    console.log(`this is product id ${JSON.stringify(req.body)} \t \t
   
    ${productId}
    `);
    try{
        let verifyuser =   await cartschema.findOne({user : userid});
        if(!verifyuser){
            res.status(402).json({message : "cart is empty"}); 
        }
        const productIndex= verifyuser.products.findIndex((product : any) => product.product.toString() === productId);
        console.log(`productIndex ${productIndex});`);
        if(productIndex !== -1){
            //increase quantity
            if(verifyuser.products[productIndex].quantity === 1){
                await cartschema.findOneAndUpdate({user : userid} , {$pull : {products : {product : productId}}});
                await verifyuser.save();
            }else{

                verifyuser.products[productIndex].quantity = verifyuser.products[productIndex].quantity - 1;
                await verifyuser.save();
            }
            
        }else{
            //add product
            res.status(400).json({message : "Product not found in cart"});
        }
        
       
        const products =   await cartschema.findOne({user : userid})
                                    // .populate("user" , "email username");
                                     .populate("products.product" , "name description price size category color images");
                                   
        res.status(200).json({message : "Product added to cart successfully" , products});
    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
}

/**
 * -------------------------------------------------
 * @method Get
 * @route /api/v1/cart
 * @description get products from cart
 * @access user hiself
 * ------------------------------------------------
 */

export const getfromcart = async (req : Request , res : Response) => {
    const userid = req.params.userid;
 
    console.log(`this is product id ${JSON.stringify(req.body)}`);
    try{
        const verifyuser =   await cartschema.findOne({user : userid});
        if(!verifyuser){
          res.status(402).json({message : "cart is empty"});
          return;
        }else{
          
            const products =   await cartschema.findOne({user : userid})
                                        
                                        .populate("products.product" , "name description price size category color images").select("products user");
             res.status(200).json({status : "Success" ,  products});
        }
         
                                   
    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
}