import mongoose from "mongoose";

 export const connectDB = async (url)=>{
    try {
      await mongoose.connect(url)
      console.log("mongoodb connected")
    } catch (error) {
        console.log("mongodb connection failed", error)
    }
 }