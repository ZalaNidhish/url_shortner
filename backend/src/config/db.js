import mongoose from 'mongoose'
import {MONGO_URI} from './config.js'

export const connectDB = async ()=>{
    try{
        await mongoose.connect(MONGO_URI)
        console.log(`Mongo DB connected: ${MONGO_URI}`)
    }
    catch(err){
        console.log("Error in MONGO DB connection: ", err)
    }
}