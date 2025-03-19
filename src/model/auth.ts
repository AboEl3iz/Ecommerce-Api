import { Schema, model} from "mongoose";
import { usertype } from "../utils/types";


const authSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: false,
    },
    password: {
        type: String,
       required: true
    },
    isadmin: {
        type: Boolean,
        default: false,
    },

});
  export default model<usertype>("Auth", authSchema);

