import { Schema, model} from "mongoose";
import { carttype } from "../utils/types";  


const cartSchema = new Schema({
    user :{
        type : Schema.Types.ObjectId,
        ref : "Auth"
    },
    products:[
        {
            product :{
                type : Schema.Types.ObjectId,
                ref : "product"
            },
            quantity :{
                type : Number,
                default : 1
            }
        }
    ],
    
});

export default model<carttype>("cart", cartSchema);