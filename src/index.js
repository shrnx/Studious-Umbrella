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