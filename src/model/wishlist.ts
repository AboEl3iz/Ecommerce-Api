import { Schema, model} from "mongoose";

import { wishlisttype } from "../utils/types";

const wishlistSchema = new Schema({
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
           
        }
    ]
});

export default model<wishlisttype>("wishlist", wishlistSchema);