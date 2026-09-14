import jwt from 'jsonwebtoken'
import {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} from '../config/config.js'

export const getTokens = (userID)=>{
    const accessToken = jwt.sign({id: userID}, ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
    const refreshToken = jwt.sign({id: userID}, REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
    return {accessToken, refreshToken}
}