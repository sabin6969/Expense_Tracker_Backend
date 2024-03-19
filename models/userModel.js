import mongoose from "mongoose"
const userSchema = mongoose.Schema({
    fname:String,
    lname:String,
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:String
});

const userModel = mongoose.model("users",userSchema);
export default userModel;