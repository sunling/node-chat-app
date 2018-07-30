const path = require("path");
const express = require("express");
const publicPath = path.join(__dirname,'../public');
const socketIO = require("socket.io");
const http = require("http");

const port = process.env.PORT || 3000;
var app =express();
app.use(express.static(publicPath));

//create a server
var server = http.createServer(app); 
//create a io
var io = socketIO(server);

io.on("connection",(socket)=>{
    console.log("new user connected");
    socket.on("disconnect",()=>{
        console.log("User was disconnected");
    });  

    socket.on("createMessage",function(message){ 
        socket.emit("newMessage",{
            from:message.from,
            text:message.text,
            createAt:new Date().getTime()
        });
    }); 
    
})

server.listen(port,()=>{
    console.log("Server is up on port ",port);
});