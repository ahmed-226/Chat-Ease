const bcrypt = require('bcrypt')
const User = require('../models/user.model.js')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const verifyToken = require('../helpers/verfiyToken.js')




const register = async (req, res) => {


    try {

        const { name, email, password, profile_pic } = req.body
        const checkEmail = await User.findOne({ email })

        if (checkEmail) {
            return res.status(400).json({
                message: "Email already exists",
                error: true
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const payload = {
            name,
            email,
            password: hashedPassword,
            profile_pic
        }

        const use = new User(payload)
        const userSave = await use.save()

        return res.status(201).json({
            message: "User created successfully",
            data: userSave,
            success: true
        });

    } catch (error) {
        return res.status(400).json({
            message: "Something is wrong",
            error: true
        })
    }

}

const login = async (req,res) => {

    try {

        const { email, password } = req.body
        const user = await User.findOne({ email })


        if (!user) {
            return res.status(400).json({
                message: "Invalid email",
                error: true
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password",
                error: true
            })
        }
        
        
        const tokenData={
            id:user._id,
            email:user.email
        }
        
        const token=jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:"1h"})
        
        const cookiesOptions={
            httpOnly:true,
            secure: "production",
            sameSite: 'strict'
        }
        
        
        return res.cookie('token',token,cookiesOptions).status(200).json({
            message: "Login successfully",
            token,
            success: true
        })
        
        
    } catch (error) {
        
        
        return res.status(400).json({
            message: "Something is wrong",
            error: true
        })
    }
}

const userDetials=async (req, res) => {
    try {
        const token = req.cookies.token || ""

        const user = await verifyToken(token)
        const userId = user.id || user._id;

        if (userId) {
            // Fetch fresh user data from database
            const userData = await User.findById(userId).select('-password');
            
            return res.status(200).json({
                message: "user Details",
                data: userData,
                success: true
            })
        }

        return res.status(400).json({
            message: "Invalid Token",
            error: true
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true
        })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token')
        return res.status(200).json({
            message: "Logout successfully",
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true
        })
    }

}

const updateUser = async (req, res) => {
    try {
        const { name, profile_pic } = req.body
        const token = req.cookies.token || ""

        console.log('Update request received:', { name, profile_pic: profile_pic ? 'URL provided' : 'No URL' });
        console.log('Token:', token ? 'Token exists' : 'No token');

        const user = await verifyToken(token)
        console.log('Verified user:', user?.id || user?._id);

        // Fix: Use user.id instead of user._id (depends on how verifyToken returns the data)
        const userId = user.id || user._id;
        
        if (userId) {
            const updatedUser = await User.findByIdAndUpdate(
                userId, 
                { 
                    ...(name && { name }), 
                    ...(profile_pic !== undefined && { profile_pic }) 
                }, 
                { new: true, runValidators: true }
            ).select('-password');

            console.log('Updated user:', updatedUser);

            return res.status(200).json({
                message: "User updated successfully",
                data: updatedUser,
                success: true
            })
        }

        return res.status(400).json({
            message: "Invalid Token",
            error: true
        })

    } catch (error) {
        console.error('Update user error:', error);
        return res.status(500).json({
            message: error.message || "Internal server error",
            error: true
        })
    }
}

const searchUser = async (req, res) => {
    try {
        const { search } = req.body;
        const query = new RegExp(search, "i");

        const users = await User.find({
            $or: [
                { name: query },
                { email: query }
            ]
        }).select('-password');

        return res.status(200).json({
            message: "User found",
            data: users,
            success: true
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true
        });
    }
};

module.exports = { register, login, userDetials,logout, updateUser ,searchUser}



