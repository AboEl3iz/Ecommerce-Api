import { OrderModel, validateOrder } from "../../model/order";
import productSchema from "../../model/product";
import { Request, Response } from "express";
/**
 * -------------------------------------------------
 * @method Post
 * @route /api/oder 
 * @description create a new order
 * @access private user hiself
 * ------------------------------------------------
 */
export const createOrder = async (req: Request, res: Response) => {
    try {
        const { products, address, paymentMethod } = req.body;
        const userid = (req as any).user?.id;
        if (!products || products.length === 0) {
            res.status(400).json({ message: "Invalid input: Please provide an array of products" });
            return;
        }
        let totalPrice : number = 0;
        const productDetails = [];

        // Fetch products from DB to validate price & existence
        for (const item of products) {
            const product = await productSchema.findById(item.product);
            if (!product) {
                res.status(404).json({ message: "Invalid input: Product not found" });
                return;
                
            }

            totalPrice += Number(product.price)  * Number(item.quantity);
            productDetails.push({
                product: product._id,
                quantity: item.quantity,
            });
        }
        console.log(totalPrice);
        const neworder = await OrderModel.create({
            user: userid
            , products,
            address,
            paymentMethod,
            totalprice: totalPrice
        });



        res.status(201).json({ message: "Order created successfully", order: neworder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `something went wrong ${error}` });
    }
};

/**
 * -------------------------------------------------
 * @method Delete
 * @route /api/oder/:id
 * @description cancel an order
 * @access private user hiself
 * ------------------------------------------------
 */
export const cancelOrder = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const order = await OrderModel.findById(orderId);
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        await OrderModel.findByIdAndDelete(orderId);
        res.status(200).json({ message: "Order canceled successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `something went wrong ${error}` });
    }
};

/**
 * -------------------------------------------------
 * @method Get
 * @route /api/oder 
 * @description get all orders
 * @access private admin hiself
 * ------------------------------------------------
 */
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await OrderModel.find().populate("user" , "username email").populate("address").populate("products.product");
        res.status(200).json({ message: "Orders fetched successfully", orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `something went wrong ${error}` });
    }
};

/**
 * -------------------------------------------------
 * @method Get
 * @route /api/order 
 * @description get user orders
 * @access private admin hiself
 * ------------------------------------------------
 */
export const getUserOrders = async (req: Request, res: Response) => {
    try {
        const userid = (req as any).user?.id;
        const orders = await OrderModel.find({ user: userid }).populate("address").populate("products.product");
        res.status(200).json({ message: "Orders fetched successfully", orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `something went wrong ${error}` });
    }
};
/**
 * -------------------------------------------------
 * @method Put
 * @route /api/oder/:id 
 * @description change the state of order
 * @access private admin hiself
 * ------------------------------------------------
 */
export const changeOrderState = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const order = await OrderModel.findById(orderId);
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        if (order.status === req.body.status) {
            res.status(400).json({ message: "Invalid input: Order state is already the same" });
            return;
        }
        if (order.status === "shipped") {
            res.status(400).json({ message: "Invalid input: Order is already shipped" });
            return;
        }
        await OrderModel.findByIdAndUpdate(orderId, { status: req.body.status });
        res.status(200).json({ message: "Order state changed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `something went wrong ${error}` });
    }
};