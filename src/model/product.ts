import { Schema, model } from "mongoose";
import { producttype } from "../utils/types";


const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image:
    {
        url :{
            type: String,
            required: true
        },
        public_id :{
            type: String,
            required: true
        }
    },

    category:
    {
        type: String,
        required: true
    }
    ,
    color: [
        {
            type: String,
            required: false
        }
    ],
    size: [
        {
            type: String,
            required: false
        }
    ]

});

export default model<producttype>("product", productSchema);