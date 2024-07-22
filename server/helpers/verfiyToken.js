const jwt=require('jsonwebtoken')
const User = require('../models/user.model.js')
require('dotenv').config()

const verifyToken = async (token)=>{

    if(!token){
        return {
            message: "session out",
            logout: true
        }
    }

    const decoded =await jwt.verify(token, process.env.JWT_SECRET)
    
    const user=await User.findById(decoded.id).select('-password')

    return user
}

module.exports = verifyToken

