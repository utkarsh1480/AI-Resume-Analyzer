import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Username:{
        type : String,
        required : true,
        unique : [true, "username already taken"]
    },
    email :{
        type : String,
        unique :[true, "Email already register"],
        required:  true
    },
    password:{
        type: String,
        required: true,
    }

})

const userModel = mongoose.model('userModel', UserSchema);

export default userModel;