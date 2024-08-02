const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const verifyToken = require('../helpers/verfiyToken');
const { log } = require('console');
const User = require('../models/user.model');
const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');
const getConversation=require('../helpers/getConverstation.js')

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
});

// Socket.io event handlers


const onlineUsers = new Set();

io.on('connection', async (socket) => {
    console.log('A user connected', socket.id);

    const token = socket.handshake.auth.token
    const user = await verifyToken(token)


    // console.log(user);
    socket.join(user?._id?.toString())
    onlineUsers.add(user?._id?.toString())

    io.emit('onlineUsers', Array.from(onlineUsers))

    socket.on('chat-page', async (userId) => {
        console.log('userId', userId)
        const userDetails = await User.findById(userId).select("-password")

        const payload = {
            _id: userDetails?._id,
            name: userDetails?.name,
            email: userDetails?.email,
            profile_pic: userDetails?.profile_pic,
            online: onlineUsers.has(userId)
        }
        socket.emit('chat-user', payload)

        const getConversationMessage = await Conversation.findOne({
            "$or" : [
                { sender : user?._id, receiver : userId },
                { sender : userId, receiver :  user?._id}
            ]
        }).populate('messages').sort({ updatedAt : -1 })

        socket.emit('message',getConversationMessage?.messages || [])

    })

    socket.on('new message', async (message) => {
        // console.log('message',message)
        let Conversations = await Conversation.findOne({
            $or: [
                { sender: message?.sender, receiver: message?.receiver },
                { sender: message?.receiver, receiver: message?.sender }
            ]
        })    

        if (!Conversations) {
            const newConversation = new Conversation({
                sender: message?.sender,
                receiver: message.receiver,
            })
            Conversations = await newConversation.save()
        }

        const messages = new Message({
            text: message.text,
            imageUrl: message.imageUrl,
            videoUrl: message.videoUrl,
            msgByUserId: message?.msgByUserId?.toString()
        })

        const savaMessage = await messages.save()

        const updateConversation = await Conversation.findByIdAndUpdate({_id:Conversations?._id}, {
            $push: { messages: savaMessage?._id }
        })

        const getConversationMessages = await Conversation.findOne({
            $or: [
                { sender: message?.sender, receiver: message?.receiver },
                { sender: message?.receiver, receiver: message?.sender }
            ]
        }).populate('messages').sort({updateAt:-1})

        io.to(message?.sender).emit('message',getConversationMessages.messages || [])
        io.to(message?.receiver).emit('message',getConversationMessages.messages || [])
 
        // console.log('getConversation', getConversation);
    })

    socket.on('sidebar',async(currentUserId)=>{
        console.log("current user",currentUserId)

        const conversation = await getConversation(currentUserId)

        socket.emit('conversation',conversation)
        
    })

    



    // Handle 'disconnect' event
    socket.on('disconnect', () => {
        onlineUsers.delete(user?._id)
        console.log('A user disconnected');
    });
});

// Start the server

module.exports = { app, server };