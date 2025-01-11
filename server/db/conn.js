import mongoose from "mongoose";
import cors from "cors"

export const connectDatabase = async ()=>{

    await mongoose.connect(process.env.DB_URL)
    .then((data)=>{
        console.log(`Database Connection successfull`)
    })
    .catch((e)=>{
        console.log(`Database Connectiion Error: ${e}`)
    })
}

export default connectDatabase;
