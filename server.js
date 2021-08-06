const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors:{
        origin: "*"
    }
});

io.on("connection", socket => { 
    console.log("client connected") 

    socket.emit('message', "Welcome to the server");

    socket.broadcast.emit('message', 'A user has joined the chat');

    socket.on('chatMessage', msg => {
        console.log("a user said:" + msg);
        io.emit('message', msg)
    })

    socket.on('disconnect', () => {
        console.log("A user disconnected")
        io.emit('message', "A user has left the chat");
    })
});

httpServer.listen(4000, () => console.log("listening on port 4000"));