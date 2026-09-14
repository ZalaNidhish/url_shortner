import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLen: [6, "Password should be atleast 6 characters long ... "]
    },
    username: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        default: null
    }
})

export const userModel = mongoose.model("User", userSchema)