import mongoose from "mongoose";
import Authroles from "../utils/authroles.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: ["true" ,"name is required"],
        maxLength :[50,"name is less than 50 characters"]
    },
    email :{
        type :String,
        required:["true","Email required"]
    },
    password :{
        type: String,
        required :["true","password is required"],
        minLength :[8, "passsword must be atleast eight characters"],
        select :false
    },
    role:{
        type:String,
        enum: Object.values(Authroles),
        default: Authroles.USER
    },
    forgotPasswordToken :String,
    forgotPasswordExpiry : Date,
},{timestamps:true})

export default mongoose.model("User",userSchema)