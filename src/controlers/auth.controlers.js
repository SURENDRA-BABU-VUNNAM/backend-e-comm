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

export const login = asyncHandler(async (req ,res)=>{
    const {email,password} = req.body

    if (!email || !password) {
        throw new CustomError("enter your email and password" ,400)
    }

    const user = User.findOne({email}).select("+password")

    if(!user) {
        throw new CustomError(" account does not exist" ,400)
    }

    const isPasswordMatched = user.comparePassowrd(password)

    if (isPasswordMatched) {
        const token =user.getJWTtoken()
        user.password = undefined
        res.cookie("token",token,cookieHandler)

        return res.status(200).json({
            success:true,
            token,
            user
        })
    }

    throw new CustomError("password incorrect" ,400)
})

export const logout = asyncHandler(async (res,req)=>{
    res.cookie ("token",null ,{
        expires :new Date(Date.now),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message: "user logged out"
    })
})