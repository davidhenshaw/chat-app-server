const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors:{
        origin: "*"
    }
});

const {formatMessage} = require('./utils/messages');
const serverName = "Admin"

io.on("connection", socket => { 
    console.log("client connected") 

    socket.emit('message', formatMessage(serverName, "Welcome to the server"));

    socket.broadcast.emit('message', formatMessage(serverName, 'A user has joined the chat'));

    // Listen for message from client
    socket.on('client-message', (msg) => {
        console.log("a client said: " + msg);
        io.emit('message', formatMessage("User", msg));
    })

    socket.on('disconnect', () => {
        console.log("A user disconnected")
        io.emit('message', formatMessage(serverName, "A user has left the chat"));
    })
});

httpServer.listen(4000, () => console.log("listening on port 4000"));