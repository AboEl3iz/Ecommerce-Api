import { Schema, model} from "mongoose";
import { addresstype } from "../utils/types";
import { Joi } from "express-joi-validations"
import { number } from "joi";

const addressSchema = new Schema({
    user :{
        type : Schema.Types.ObjectId,
        ref : "Auth"
    },
    address1 : {
        type : String,
        required : true 
    },
    city : {
        type : String,
        required : true 
    },
    country : {
        type : String,
        required : true 
    },
    postalcode : {
        type : String,
        required : true
    }
});
 export const validateAdress = (object : any) => {

   const validateobject = Joi.object({
        address1 : Joi.string().min(4).required(),
        city : Joi.string().min(4).max(20).required(),
        country : Joi.string().min(4).required(),
        postalcode :Joi.string().required()

    });
    return validateobject.validate(object);
}
export const modeladdress = model<addresstype>("address", addressSchema);
exports = {
    validateAdress,
    modeladdress
} 
    