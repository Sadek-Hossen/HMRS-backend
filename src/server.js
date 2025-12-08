

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoters from './routers/user.router.js';
import { connectDB } from './db/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
     origin: "http://localhost:3000",
  credentials: true 
}))


const url = process.env.MONGODB_URL || "mongodb+srv://hossensadek726_db_user:wvuWbiZstcG4C07n@cluster0.7shvrd2.mongodb.net/?appName=Cluster0";
connectDB(url);

app.use("/api/user", userRoters);

app.get("/", (req, res) => {
  res.send("HRMS Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
