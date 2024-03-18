import mongoose from "mongoose"
const userSchema = mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    password:String
});

const userModel = mongoose.model("users",userSchema);
export default userModel;