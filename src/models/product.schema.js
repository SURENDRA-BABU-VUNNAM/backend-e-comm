import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : ["true", "product name is required"],
            trim : true,
            maxLength :[120 ,"length cannot exceed 120 characters"]
        },
        price :{
            type : Number,
            required : ["true", "the price is required"],
            maxLength : [5],
        },
        description :{
            type : String,
            required :true
        },
        photos :[
            {
                secureUrl :{
                    type: String,
                    required :true
                }
            }
        ],
        stocks : {
            type : Number,
            default :0
        },
        sold :{
            type : Number,
            default : 0
        },
        collectionId :{
            ref : "Collection"
        }
    }
,{timestamps :true})

export default mongoose.model ("Product" ,productSchema)