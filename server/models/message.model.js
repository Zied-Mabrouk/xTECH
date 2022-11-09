const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
   
    content:{
        type:String,
        required:true
    },
    type:{
        type:Number,
        required:true
    },
    targetType:{
        type:Number,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    date:{
        type:Number,
        default:(Math.floor(Date.now()))
    }
});

const MessageModel = mongoose.model("message", messageSchema);

module.exports = MessageModel;