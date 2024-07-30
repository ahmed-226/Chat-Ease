const express = require('express')
const dotenv = require('dotenv')
const cors= require('cors')
const connectDB=require('./config/db.js')
const port = process.env.PORT || 4000
const userRouter= require('./routes/user.routes.js')
const cookieParser = require('cookie-parser')
const { app, server} = require('./socket/socket.js')

dotenv.config()

// const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


app.get('/', () => {
    console.log('hello')
})
app.use('/api', userRouter)



connectDB().then(() => {
    server.listen(port, () => {
      console.log(`app listening on port ${port}`)
    })
})


