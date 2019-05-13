//const express = require('express');
//const app = express();
//const server = require('http').Server(app);
//const io = require('socket.io').listen(server);

const port = 5000;

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

 server.listen(7000);


let games = new Map();
games.set('gerry', []);

// console.log server is running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', function(req, res) {
   res.send({express: 'YOUR BACKEND IS CONNECTED'});
});

// joining the room
io.sockets.on("connection", function(socket) { 
    socket.on('room', function(room, name, id) {
       // console.log("it gets here");
    if (id === 1) {                           // the user created a new game
        socket.join(room);
        //games.push(room);
        var hold = games.get(room).concat(name);
        games.set(room, hold);
        io.in(room).emit("message", hold);
        //io.in(room).emit("welcome", "fuck");

       } else if (id == 0) {
        if (games.has(room)) {
            socket.join(room);
            //io.in(room).emit("welcome", "fuck all!");
            io.in(room).emit("message", "fuck u");

        } else {
           io.sockets.in(room).emit("message", "The game does not exist!");
           return -1;
        }
       }
    });
});

// for joining a created game
/*io.sockets.on("connection", function(socket) {
    socket.on('room', function(room) {
        if (games.includes(room)) {
            socket.join(room);
            socket.emit("welcome", "A player has joined the game!");
        } else {
            return socket.emit('err', "No game with that id exists");
        }
    });
}); */


