import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
   path: 'backend/config/config.env'
});


export const connectDB = async()=>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected successfully to ${db.connection.host}`);
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1); // exit with failure
    }
}