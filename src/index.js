import mongoose from "mongoose";
import app from "./app.js"
import config from "./config/index.js";

( async ()=> {
    try {
       await mongoose.connect(config.MONGODB_URL)
       console.log("DB connected !");
       
        app.on("error" ,(error)=> {
        console.error("Error",error);

        const Onlisten = () =>{
            console.log(`listening on port ${config.PORT}`);
        } 
        
        app.listen(config.PORT , Onlisten)
    })
    } catch (error) {
        console.error("ERROR", error);
    }
})()