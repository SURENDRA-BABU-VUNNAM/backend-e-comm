import asyncHandler from "../service/asyncHandler";
import CustomError from "../utils/customError";
import User from "../models/user.schema.js"

export const cookieHandler = {
    expires : new Date(Date.now() + 3*24*60*60*1000),
    httpOnly : true
}

export const signUp = asyncHandler(async (req,res)=> {

    const {name,email,password}= req.body

    if (!name || !email || !password) {
        throw new CustomError("Please Add all fields",500)
    }

    const existingUser = await User.findOne({email})

    if (existingUser) {
        throw new CustomError("User already exist",400)
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.getJWTtoken()

    user.password =undefined

    user.cookie("token" ,token ,cookieHandler)

    res.status(200).json({
        success:true,
        token,
        user
    })
})