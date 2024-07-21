const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email:{
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please add a password']
    },
    profile_pic:{
        type: String,
        default: ''
    },
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User