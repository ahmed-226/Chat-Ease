const bcrypt = require('bcrypt')
const User = require('../models/user.model.js')



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


        return res.status(200).json({
            message: "Login successful",
            success: true
        })

    } catch (error) {

        return res.status(400).json({
            message: "Something is wrong",
            error: true
        })
    }
}


module.exports = { register, login }



