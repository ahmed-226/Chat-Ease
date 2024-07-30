const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const verifyToken = require('../helpers/verfiyToken');
const { log } = require('console');
const User = require('../models/user.model');

const app = express();
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        credentials:true
    }
});

// Socket.io event handlers


const onlineUsers =new Set();

io.on('connection',async (socket) => {
    console.log('A user connected',socket.id);

    const token =socket.handshake.auth.token 

    const user=await verifyToken(token)

    // console.log(user);
    socket.join(user?._id)
    onlineUsers.add(user?._id?.toString())

    io.emit('onlineUsers',Array.from(onlineUsers))

    io.on('chat-page',async(userId)=>{
        log('chat page',userId)
        const userDetails = await User.findById(userId).select('-password')
        const payload={
            _id: userDetails._id,
            name:userDetails.name,
            email:userDetails.email,
            online:onlineUsers.has(userId)

        }

        socket.emit('chat-user',payload||'fff')
    })


    // Handle 'disconnect' event
    socket.on('disconnect', () => {
        onlineUsers.delete(user?._id)
        console.log('A user disconnected');
    });
});

// Start the server

module.exports={ app, server};