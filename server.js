const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 5000;

let games = [];

// console.log server is running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', function(req, res) {
    res.send({express: 'YOUR BACKEND IS CONNECTED'});
});

// only for creating a new game
io.sockets.on("connection", function(socket) { 
    socket.on('room', function(room) {
        socket.join(room);
        games.push(room);
        socket.emit("welcome", "A player has joined the game!");
    });
});

// for joining a created game
io.sockets.on("connection", function(socket) {
    socket.on('room', function(room) {
        if (games.includes(room)) {
            socket.join(room);
            socket.emit("welcome", "A player has joined the game!");
        } else {
            return socket.emit('err', "No game with that id exists");
        }
    });
});


