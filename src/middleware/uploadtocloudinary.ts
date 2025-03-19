
import cloudinary from "cloudinary";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinaryv2 } from "cloudinary";
cloudinaryv2.config({
    cloud_name: process.env.CLOUDINARY_KEY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const uploadtocloudinary = async (filetoupload: any) => {
    try {
       
            
        
        const result = await cloudinaryv2.uploader.upload(filetoupload, {
            resource_type: "image",
        });

        return result;
      
    } catch (error) {
        return error;
    }
};

export default uploadtocloudinary;