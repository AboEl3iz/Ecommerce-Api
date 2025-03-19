import { Schema, model } from "mongoose";
import { ordertype } from "../utils/types";
import { Joi } from "express-joi-validations"

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "auth"
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    totalprice: {
        type: Number,
        required: true

    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "shipped", "delivered"],
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "address"
    },
    paymentMethod: {
        type: String,
        default: "cash on delivery",
        enum: ["cash on delivery", "paypal", "stripe"],
    },
    orderDate: {
        type: Date,
        default: Date.now
    }

});

 export const validateOrder = (object: any) => {

    const validateobject = Joi.object({
        user: Joi.string().required(),
        products: Joi.array().items(Joi.object({
            product: Joi.string().required(),
            quantity: Joi.number().required()
        })).required(),
        totalprice: Joi.number().required(),
        status: Joi.string().required(),
        address: Joi.string().required()

    });
    return validateobject.validate(object);
}
export const OrderModel = model<ordertype>("order", orderSchema);

exports = {
    OrderModel,
    validateOrder
}