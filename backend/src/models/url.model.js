import mongoose from "mongoose"

const urlSchema = mongoose.Schema({
    shortUrl: {
        type: String,
    },
    url: {
        type: String,
        unique: true
    },
    count: {
        type: Number,
        default: 0
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User' 
    // }
})

export const urlModel = mongoose.model("Url", urlSchema)