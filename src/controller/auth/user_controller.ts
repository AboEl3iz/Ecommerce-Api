import {   Request , Response} from "express";
import userschema from "../../model/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/**
 * -------------------------------------------------
 * @method Get
 * @route /api/v1/user 
 * @description get all users
 * @access private for admin
 * ------------------------------------------------
 */
export const getAllUsers = async (req : Request , res : Response) => {
    try{
        
       
        const Users =   await userschema.find();
        res.status(200).json({message : "users fetched successfully", Users});
    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
}

/**
 * -------------------------------------------------
 * @method Get
 * @route /api/v1/user/details 
 * @description get all users
 * @access user hislef
 * ------------------------------------------------
 */
export const getuser = async (req : Request , res : Response) => {
    try{
        const userid = (req as any).user?.id;
       
        const User =   await userschema.find({_id : userid});
        res.status(200).json({message : "users fetched successfully", User});
    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
}

/**
 * -------------------------------------------------
 * @method Delete
 * @route /api/v1/user/:id
 * @description delete user
 * @access private for admin and user hiself
 * ------------------------------------------------
 */

export const deleteUser = async (req : Request , res : Response) => {
    const userid =  (req as any).user?.id;;
    try{
         await userschema.findOneAndDelete({_id : userid});
        res.status(201).json({message : "User deleted successfully"});

    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
}

/**
 * -------------------------------------------------
 * @method put
 * @route /api/v1/user 
 * @description update user details
 * @access private for user hiself
 * ------------------------------------------------
 */

export const updateUser = async (req : Request , res : Response) => {
    const userid =  (req as any).user?.id;
    try{
        const userv = await userschema.findOne({_id : userid});
        if(!userv){
            res.status(400).json({message : "User not found"});
            return 
        }
        const {email , username , password} = req.body;
        if(req.body.password){
            
            const salt = await bcrypt.genSalt(10);
            const hashedpassword = await bcrypt.hash(password , salt);
            req.body.password = hashedpassword;
            

        }

            const user = await userschema.findOneAndUpdate({_id : userid} , {$set : {...req.body}} , {new : true});
            res.status(200).json({message : "User updated successfully" , user});
        


    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
}

/**
 * -------------------------------------------------
 * @method Post
 * @route /api/v1/auth/register 
 * @description register
 * @access public
 * ------------------------------------------------
 */

export const register = async (req : Request , res : Response ) => {
    try{
        
        const {email , username , password} = req.body;
        let verifyuser = await userschema.findOne({email});
        if(verifyuser){
             res.status(400).json({message : "User already exists"});
             return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password , salt);
       
        const user = new userschema({email , username , password : hashedpassword});
        await user.save();
        res.status(201).json({message : "User registered successfully" , user});
    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
}

/**
 * -------------------------------------------------
 * @method Post
 * @route /api/v1/auth/login 
 * @description login
 * @access private user hiself
 * ------------------------------------------------
 */

export const login = async (req : Request , res : Response ) => {
    try{
        const {email , password} = req.body;
        let verifyuser = await userschema.findOne({email});
        if(!verifyuser){
            res.status(400).json({message : "User not found"});
            return;
        }
        const isPasswordMatch = await bcrypt.compare(password , verifyuser.password);
        if(!isPasswordMatch){
            res.status(400).json({message : "Invalid credentials"});
            return;
        }
      const token =  jwt.sign({_id : verifyuser._id , role : verifyuser.isadmin  , expiresIn : "1d"}, process.env.SECRETKEY as string );
        res.status(200).json({message : "Login successful" , user : verifyuser , token});
       
        
        
    }catch(error){
        console.log(error);
        res.status(500).json({message : `something went wrong ${error}`});
    }
}

