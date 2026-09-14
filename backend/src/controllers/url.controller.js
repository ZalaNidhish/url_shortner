import {urlModel} from '../models/url.model.js'

export const createUrlController = async (req, res)=>{

    const {url} = req.body

    const main = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let shortURL = ''

    for(let i=0; i<6; i++){
        shortURL += main.charAt((Math.random()*62) + 1)
    }

    await urlModel.create({
        url, shortUrl: shortURL
    })
    

    return res.status(201).json({
        message: "Short URL created successfully ... ",
        shortURL
    })
}

export const getAllUrlController = async (req, res)=>{
    try{
        const response = await urlModel.find()

        if(!response) return res.status(404).json({
            message: "No URLs Found"
        })

        return res.status(200).json({
            message: "Urls Fetched Successfully",
            urls: response
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Server error"
        })
    }
}