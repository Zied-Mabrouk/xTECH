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
    username:{
        type:String,
        required:true
    },
    password:{
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
    },
    favorites:{
        type:Array,
        default:[]
    },
    status:{
        type:Object,
        default:{value:"offline",customMessage:""}
    },
    role:{
        type:String,
        required:true
    }
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;