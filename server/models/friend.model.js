const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
   
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
});

const FriendModel = mongoose.model("friend", friendSchema);

module.exports = FriendModel;