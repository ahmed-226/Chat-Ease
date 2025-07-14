const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors= require('cors')
const connectDB=require('./config/db.js')
const userRouter= require('./routes/user.routes.js')
const cookieParser = require('cookie-parser')
const { app, server} = require('./socket/socket.js')

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 4000  // Changed from 8080 to 4000

app.get('/',(request,response)=>{
    response.json({
        message : "Server running at " + PORT
    })
})

//api endpoints
app.use('/api',userRouter)

connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log("server running at " + PORT)
    })
})