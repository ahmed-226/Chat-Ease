const mongoose = require('mongoose')

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
    message: [
        {
            type: mongoose.Schema.Types.ObjectId,
            default: '',
            ref: 'Message'
        }
    ],

}, {
    timestamps: true
})

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    ImageUrl: {
        type: String,
        default: ''
    },
    videoUrl:{
        type: String,
        default: ''
    },
    seen:{
        type:Boolean,
        default: false
    }

}, {
    timestamps: true
})



const Message = mongoose.model('Message', messageSchema)
module.exports = Message

const Conversation = mongoose.model('Conversation', conversersationSchema)
module.exports = Conversation

