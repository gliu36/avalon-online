const express = require('express');
const server = require('http').Server(app);
const io = require('socket.io')(http);
const app = express();

const port = 5000;

let rooms = [];

// console.log server is running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', function(req, res) {
    res.send({express: 'YOUR BACKEND IS CONNECTED'});
});

// only for creating a new game
io.sockets.on('connection', function(socket) {
    socket.on('room', function(room) {
        socket.join(room);
        rooms.push(room);
    });
});