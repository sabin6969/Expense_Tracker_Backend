import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv/config";

const app = express();

app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).json({
        sucess:true,
        message:"Hello from expense tracker server"
    })
});


app.listen(3000,async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Server has started with db connection");
    } catch (error) {
        console.log("An error occured");
    }
});