import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})

import { app } from './app.js'
import connectDB from './db/index.js'

import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);  // This creates HTTP server with Express

const io = new Server(server, {    // Initialize Socket.IO with the Express server
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Now we have to handle Socket.IO connections
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join-room", (roomId) => {        // This will allow users to join same virtual room
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });
    
    socket.on("play-video", (roomId) => {
        socket.to(roomId).emit("play-video");
    });
    
    socket.on("pause-video", (roomId) => {
        socket.to(roomId).emit("pause-video");
    });
    
    socket.on("seek-video", ({ roomId, time }) => {
        socket.to(roomId).emit("seek-video", time);
    });
    

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

connectDB()
.then(() => {
    console.log("CORS_ORIGIN =>", process.env.CORS_ORIGIN);

    server.listen(process.env.PORT || 8000, () => {     // app.listen will start only express server without Websocket support
        console.log("Server is running at port: " + process.env.PORT);
    })
})
.catch((err) => {
    console.log("MongoDB connection failed: " + err)
})