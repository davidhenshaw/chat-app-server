const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 4000 || process.env.PORT;

// Run when a client connects
io.on('connection', socket => {
    console.log("New connection incoming...");
    
    // Welcome the current user
    socket.emit('message', "Welcome to The Chat!");

    //Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Runs on client disconnect
    socket.on('disconnect', ()=> {
        io.emit('message', 'A user has left the chat');
    })
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}\n\nHave a great day!`));