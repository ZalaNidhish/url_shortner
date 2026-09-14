import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {userModel} from '../models/user.model.js'
import { getTokens } from '../services/token.service.js'

export const loginController = async (req, res)=>{
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({
            message: "Please give proper Credentials"
        })
    }

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message: "Invalid Credentials"
        })
    }

    const verify = bcrypt.compare(password, user.password)

    if(!verify){
        return res.status(404).json({
            message: "Invalid Credentials"
        })
    }

    const {accessToken, refreshToken} = getTokens()
    user.refreshToken = refreshToken

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,    
        secure: true,       
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    
    const userObj = user.toObject();

    const { password: pass, ...userWithoutPassword } = userObj;
 
    return res.status(200).json({
        message: "User logged in succesffuly",
        user: userWithoutPassword,
        token: accessToken
    })

}

export const registerController = async (req, res)=>{

    const {email, username, password} = req.body

    if(!email || !password || !username) return res.status(400).json({
        message: "Please provide proper credentials"
    })

    const isExistingUser = await userModel.findOne({email})

    if(isExistingUser) return res.status(400).json({
        message: "User already Exists with this email."
    })

    const user = await userModel.create({
        email,
        username,
        password: await bcrypt.hash(password, 10),
    })

    const {accessToken, refreshToken} = getTokens(user._id)

    
    user.refreshToken = refreshToken
    await user.save()
   
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,    
        secure: true,       
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });
    
    const userObj = user.toObject()
    const { password: pass, ...safeUser } = userObj

    return res.status(200).json({
        message: "User registered successfully",
        user: safeUser,
        token: accessToken
    })
}

export const logoutController = async (req, res)=>{
    
    try{
        const {id} = req.params
        console.log(id);
        const user = await userModel.findById(id)
        
        user.refreshToken = null
        res.clearCookie('refreshToken')
        return res.status(200).json({
            message: "Logout Successfull",
            user
        })

    }catch(err){
        console.log("Error in logout: ", err);
    }
    

}

export const getmeController = async (req, res)=>{
    
    try{
        const {token} = req.body
        const {id} = jwt.decode(token)
        console.log(id);
        const user = await userModel.findById(id)
        
        return res.status(200).json({
            message: "user found successfully",
            user
        })

    }catch(err){
        console.log("Error in getMe: ", err);
    }
    

}