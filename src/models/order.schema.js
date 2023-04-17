import mongoose from "mongoose";
import orderStatus from "../utils/orderStatus";

const orderSchema = new mongoose.Schema(
    {
        product:{
            type: [
                {
                    productId :{
                        type: mongoose.Schema.Types.ObjectId,
                        ref:"Product"
                    },
                    count:Number,
                    price:Number,
                }
            ],
            required:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        address:{
            type :String,
            required:true
        },
        mobileNo:{
            type :String,
            required:true,
        },
        totalValue:{
            type:Number,
            required: true
        },
        coupon :String,
        transactionId:String,
        status:{
            type:String,
            enums:Object.values(orderStatus),
            default : orderStatus.ORDERED
        }
    }
    ,{timestamps:true}
    )


export default mongoose.model("Order" ,orderSchema)