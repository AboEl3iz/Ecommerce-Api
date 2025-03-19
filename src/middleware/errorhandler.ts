import { NextFunction ,Response , Request} from "express";

export default (err : Error , req : Request , res : Response , next : NextFunction) => {
    console.log(err);
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({message : err.message});
    }
    res.status(500).json({message : "something went wrong"});
}

class CustomError extends Error{
    statusCode: number;
    constructor(statusCode : number,message : string){
        super(message);
        this.statusCode = statusCode;
    }
}