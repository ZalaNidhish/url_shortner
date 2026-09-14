import {app} from './src/app.js'
import {PORT} from './src/config/config.js'
import { connectDB } from './src/config/db.js';
 
await connectDB()

app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`);
})