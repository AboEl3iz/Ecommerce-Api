import { modeladdress, validateAdress } from "../../model/address"
import { Request, Response } from "express"

/**
 * -------------------------------------------------
 * @method Post
 * @route /api/address 
 * @description add address
 * @access private user hiself
 * ------------------------------------------------
 */
export const addAdress = async (req: Request, res: Response) => {
    try {
        const userid = (req as any).user?.id;
        let validationerror = validateAdress(req.body);
        // console.log(!validateAdress);
        if (!validationerror) {
            res.status(404).json({
                "message": validationerror.error.details[0].message
            })
            return;
        }
        const useraddress = await modeladdress.find({user: userid});
        let verifyaddress = useraddress.some((e) => e.postalcode === req.body.postalcode);
        console.log(verifyaddress);
        if(verifyaddress){
            res.status(404).json({"message" : "this address already has been exist"});
            return;
        }
        
        
      const address = await new modeladdress({
        user: userid,
        ...req.body,
      }).populate("user" , "username email");
      await address.save();
        res.status(201).json({"status" : "successfully" , address })

    } catch (error) {
        console.log(error);
        res.status(405).json({
            "message" : "something went wrong please try again"
        })
    }

}

/**
 * -------------------------------------------------
 * @method Delete
 * @route /api/address 
 * @description delete address
 * @access private user hiself
 * ------------------------------------------------
 */
export const deleteAdress = async (req: Request, res: Response) => {
    try {
        
        const addressId = req.params.id;
        console.log(addressId);
        
       const verifyaddress = await modeladdress.findByIdAndDelete(addressId);
        if(!verifyaddress ){
            res.status(400).json({
                "message" : "invalid address"
            })
        }
     
        res.status(204).json({"status" : "successfully" })

    } catch (error) {
        console.log(error);
        res.status(405).json({
            "message" : "something went wrong please try again"
        })
    }

}
/**
 * -------------------------------------------------
 * @method Get
 * @route /api/address 
 * @description get all addresses
 * @access private user hiself
 * ------------------------------------------------
 */
export const getAdress = async (req: Request, res: Response) => {
    try {
        
        const userid = (req as any).user?.id;
        const address = await modeladdress.find({user: userid});
        res.status(200).json({"status" : "successfully" , address })

    } catch (error) {
        console.log(error);
        res.status(405).json({
            "message" : "something went wrong please try again"
        })
    }

}