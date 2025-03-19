import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction ,Response , Request} from "express";

  
  // Extend Request interface to include 'user'
  interface CustomRequest extends Request {
    user?: { id: string ,role: boolean; };
    
  }
  
  export const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
         res.status(401).json({ message: "No token provided" });
        return;
      }
  
      const token = authHeader.split(" ")[1];
      if (!token) {
         res.status(401).json({ message: "Unauthorized" });
        return;
      }
  
      const jwtPayload = jwt.verify(token, process.env.SECRETKEY as string) as JwtPayload;
  
      if (!jwtPayload || !jwtPayload._id ) {
         res.status(401).json({ message: "Invalid token" });
         return;
      }
  
      // Attach user ID to request object
      req.user = { id: jwtPayload._id , role : jwtPayload.role };
  
      console.log(`Verified user ID: ${req.user.id} and role: ${req.user.role}`);
  
      next();
    } catch (error) {
      console.error("Token verification error:", error);
       res.status(401).json({ message: "Unauthorized" });
       return;
    }
  };
  
  export const verifyAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if ( req.user.role === true) {
            console.log(`Verified user ID: ${req.user.id} and role: ${req.user.role}`);
            next();
        } else {
            res.status(403).json({ message: "Unauthorized" });
            return;
        }
    })
      
  }