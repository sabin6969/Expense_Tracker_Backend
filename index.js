import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv/config";
import expenseModel from "./models/expenseModel.js";
import userModel from "./models/userModel.js";
import validateEmail from "./utils/validateEmail.js";

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (firstName && lastName && email && password) {
        if(!validateEmail(email)){
            res.status(400).json({
                sucess:false,
                message:"Please enter the valid email"
            });
            return;
        }
        try {
            const response = await userModel.create({
                fname: firstName,
                lname: lastName,
                email: email,
                password: password,
            });

            if (response) {
                res.status(200).json({
                    success: true,
                    message: "Account created"
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "An unknown error occurred"
                });
            }
        } catch (error) {
            if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
                res.status(400).json({
                    success: false,
                    message: "User with this email already exists"
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "An internal server error occurred"
                });
            }
        }
    } else {
        res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
});



app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    if(email && password){
        try {
            const user = await userModel.findOne({email:email,password:password});
            if(user){
                res.status(200).json({
                    sucess:true,
                    message:"Login Sucess",
                    user:user,
                });
            }
            else{
                res.status(401).json({
                    sucess:false,
                    message:"Login failed,invalid credentials"
                });
            }
        } catch (error) {
            res.status(500).json({
                sucess:false,
                message:"Internal server error"
            });
        }
    }
    else{
        res.status(400).json({
            sucess:false,
            message:"Email and password both are required"
        });
    }
});

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
        if(response){
            res.status(200).json(response);
        }
        else{
            res.status(404).json({
                sucess:false,
                message:"Requested expense details is not available"
            });
        }
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