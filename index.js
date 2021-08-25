const express = require('express');
const app = express();
const http = require("http");
const socketio = require("socket.io");
const server=http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
    socket.on("join", ({ name }) => {
        io.emit("join", {name})
    })
})

server.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}`);
})
