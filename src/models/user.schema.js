import mongoose from "mongoose";
import Authroles from "../utils/authroles.js";
import bcrypt from "bcryptjs"
import  JWT  from "jsonwebtoken";
import config from "../config/index.js";
import crypto from "crypto"

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

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 13)
    next()
})

userSchema.method ={
    comparePassowrd : async function(enteredPassword){
       return await bcrypt.compare(enteredPassword ,this.password)
    },

    getJWTtoken : function(){
        JWT.sign({_id: this._id, role: this.role} , config.JWT_SECRET ,
            {
                expiresIn : config.JWT_TIME
            })
    },

    generateForgotPassword: function (){
        const forgotPassword = crypto.randomBytes(20).toString("hex")
        
        this.forgotPasswordToken = 
        crypto.createHash("sha256").update(forgotPassword).digest("hex")

        this.forgotPasswordExpiry = date.now() + 20*60*1000

        return forgotPassword
        
    }
}

export default mongoose.model("User",userSchema)