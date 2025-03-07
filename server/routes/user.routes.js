const express= require('express')
const {register,login, userDetials, logout, updateUser, searchUser}= require('../controller/user.controller.js')


const userRouter=express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/user-details', userDetials)
userRouter.get('/logout', logout)
userRouter.patch('/update', updateUser)
userRouter.post('/search', searchUser)


module.exports=userRouter