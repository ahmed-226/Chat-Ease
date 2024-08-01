const mongoose = require('mongoose')
// const Message = require('./message.model.js')

const conversersationSchema= new mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            default: '',
            ref: 'Message' 
        }
    ]
    

}, {
    timestamps: true
})



const Conversation = mongoose.model('Conversation', conversersationSchema)
module.exports = Conversation

