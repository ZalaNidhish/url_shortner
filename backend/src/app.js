import express from "express"
export const app = express();
import urlRouter from './routes/url.routes.js'
import authRouter from './routes/auth.routes.js'
import { urlModel } from "./models/url.model.js";

app.use(express.json())

app.get("/", (req, res)=>{
    res.send("Hello world ... ")
})

app.use('/api/url', urlRouter)

app.get('/:shortUrl', async (req, res)=>{
    const {shortUrl} = req.params

    const response = await urlModel.findOne({shortUrl})

     if (!response) {
      return res.status(404).json({ error: 'Short URL not found' });
    }
    
    response.count+=1;
    await response.save()

    return res.redirect(`${response.url}`)
    

})

// app.use('/api/auth', authRouter)