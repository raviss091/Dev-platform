const mongoose = require('mongoose');

const chatterboxSchema=new mongoose.Schema({
    user1:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    user2:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    lines : [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'line'
        }
    ]

})

const chatterbox=mongoose.model('chatterbox',chatterboxSchema)
module.exports=chatterbox