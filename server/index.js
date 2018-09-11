const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();

//initialize a simple http server
const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', (client) => {
    //connection is up, let's add a simple simple event
    client.on('message', (message) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        client.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection    
    client.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
