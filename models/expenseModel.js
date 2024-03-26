import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    expenseTitle:String,
    expenseAmount:Number,
    expenseDescription:String,
},{timestamps:false});

const expenseModel = mongoose.model("expenses",expenseSchema);
export default expenseModel;