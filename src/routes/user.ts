import express from "express";
import {deleteUser , updateUser , getAllUsers ,getuser} from "../controller/auth/user_controller";
import {verifyToken , verifyAdmin} from "../middleware/verifytoken";
const router   = express.Router();

router.route("/").put(verifyToken, updateUser)
.delete(verifyToken, deleteUser)
.get(verifyAdmin, getAllUsers);

router.route("/details").get(verifyToken, getuser);

export default router;