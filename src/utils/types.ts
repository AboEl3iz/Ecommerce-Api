import { Schema } from "mongoose"

export type addresstype = {
    user: Schema.Types.ObjectId,
    address1: string,
    city: string,
    country: string,
    postalcode: string
};

export type usertype = {
    email: string,
    username: string,
    password: string,
    isadmin: boolean
};


export type carttype = {
    user: Schema.Types.ObjectId,
    products: {
        product: Schema.Types.ObjectId,
        quantity: number
    }[]
};

export type wishlisttype = {
    user: Schema.Types.ObjectId,
    products: {
        product: Schema.Types.ObjectId,
        quantity: number
    }[]
};
export type ordertype = {
    user: Schema.Types.ObjectId,
    products: {
        product: Schema.Types.ObjectId,
        quantity: number
    }[],
    totalprice : number,
    status : string,
    address : Schema.Types.ObjectId,
    paymentMethod : string
    orderDate : Date
};

export type producttype = {
    name : string,
    description : string,
    price : number,
    image : {
        url : string,
        public_id : string
    },
    category : string,
    color : string,
    size : string
};
