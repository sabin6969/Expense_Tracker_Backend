import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv/config";
import expenseModel from "./models/expenseModel.js";

const app = express();

app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).json({
        sucess:true,
        message:"Hello from expense tracker server"
    });
});

app.post("/add-expense",async(req,res)=>{
    const {expenseTitle,expenseAmount,expenseDescription}=req.body;
    if(expenseTitle && expenseAmount && expenseDescription){
        try {
            const response = await  expenseModel.create({
                expenseTitle:expenseTitle,
                expenseAmount:expenseAmount,
                expenseDescription:expenseDescription,
            });
            res.json({
                sucess:true,
                message:"Expense added sucessfully"
            });
          } catch (error) {
            res.json(error);
          }
    }
    else{
        res.status(400).json({
            sucess:false,
            message:"All fields are required"
        });
    }
});


app.get("/get-expense/:id",async(req,res)=>{
    const id = req.params.id;
    if(id){
      try {
        const response =await expenseModel.findById(id);
        res.status(200).json(response);
      } catch (error) {
       res.json(error);
      }
    }
    else{
        res.status(400).json({
            sucess:false,
            message:"id is required",
        });
    }
});



app.listen(3000,async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Server has started with db connection");
    } catch (error) {
        console.log("An error occured");
    }
});