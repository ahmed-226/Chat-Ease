const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        default: '',
    },
    imageUrl: {
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
    },
    msgByUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

}, {
    timestamps: true
})



const Message = mongoose.model('Message', messageSchema)
module.exports = Message
