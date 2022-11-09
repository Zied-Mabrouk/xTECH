const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    friends:{
        type:Array,
        required:true,
        default:[]
    }
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;