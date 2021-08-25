const express = require('express');
const app = express();
const http = require("http");
const server=http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

const PORT = process.env.PORT || 3000;

//So this is setting up the server side!
//io.on entails what will happen if someone connects from the client side.
/*Think of everything inside of the io.on function as a room with the other 
/functions inside describing events that can occur and how the server will respond.*/
io.on("connection", (socket) => {
    //It will write to the console 'user joined' 
    console.log("A user joined :D");

    //If the server detects an incoming message...
    socket.on("chat message", msg => {
        console.log(msg);
        //It will 'emit' that message back to EVERYONE on the client side. 
        io.emit("chat message", msg);
        //To decide what to do with the message when it's emitted back to everyone you need to do that in the client side
    });
})

//Note that this oes both ways! The client can 'emit' events to the server side which is basically one server sending something to the room,
//but the server can also emit things to all of the clients as well. Look at the small diagram below

/*                                         Client
    emit a user's message to the server    |    ^    on 'message', display the message to the group chat
                                           |    |
                                           |    |
        on recieving 'message' event       V    |    emit 'message' back to all of the clients
                                           Server*/

/*In summary, .on('event name', (callback function)) describes what to do when it recieves a 
specific event while .emit('event name', (arguments)) will send that event to the other side!*/


server.listen(PORT, () => console.log("server running on port:" + PORT));