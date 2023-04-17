import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
    {
        code :{
            type: String,
        },
        discount :{
            type: Number,
            default:0,
        },
        active :{
            type:Boolean,
            default:false
        },
        
    },
    {timestamps:true})

export default mongoose.model("Coupon",couponSchema )