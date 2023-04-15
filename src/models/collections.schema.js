import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
    {
    name :{
        type :String,
        required: ["true","please provide a valid name"],
        trim : true,
        maxLength:[120,"cannot exceed 120 charecters"]
    },
},
{timestamps:true})

export default mongoose.model("Collection" ,collectionSchema)