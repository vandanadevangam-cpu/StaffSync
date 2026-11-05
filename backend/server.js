import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes.js";
dotenv.config();
const app=express();
app.use(cors({origin:process.env.CLIENT_URL||"http://localhost:5173"}));
app.use(express.json());
app.get("/api/health",(_,res)=>res.json({status:"ok",app:"StaffSync"}));
app.use("/api",routes);
app.use((err,req,res,next)=>res.status(500).json({message:err.message||"Server error"}));
mongoose.connect(process.env.MONGO_URI||"mongodb://127.0.0.1:27017/staffsync")
.then(()=>app.listen(process.env.PORT||5000,()=>console.log("StaffSync API running on port 5000")))
.catch(e=>{console.error("MongoDB connection failed:",e.message);process.exit(1)});
