import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoters from './routers/user.router.js';
import { connectDB } from './db/db.js';



dotenv.config();
const app = express();

const PORT = process.env.PORT  || 5000 ;
app.use(express.json())
app.use(cors()) 

const url = process.env.MONGODB_URL || "mongodb://localhost:27017/hrmsDB"
connectDB(url)
// all routers here

app.use("/api/user",userRoters)

app.get("/",(req,res)=>{
    res.send("HRMS Backend is running")
})


app.listen(PORT,()=>{
    console.log(`server running from https://localhost:${PORT}`)
})