//const express = require('express');
//const app = express();
//const server = require('http').Server(app);
//const io = require('socket.io').listen(server);

const port = 5000;

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);



 server.listen(7000);

 let Player  = class {
     constructor(socketId, affinity) {
        // this.socketId = socketId;
         //this.affinity = affinity;
     }

      setAffinity(affinity) {
         this.affinity = affinity;
     }

      setSocketId(playerSocket) {
        this.playerSocket = playerSocket;
     }

     setName(name) {
         this.name = name;
     }

      socketId() {
         return socketId;
     }


 }


let games = new Map();
games.set('gerry', []);

let rolePlayers = [];
let evilPlayers = [];
let playersName = [];
let playersInRound;
let evilVote4thRound;              // if there is a need for more than 1 evil vote                 
let numEvil;
let numPlayers;

// console.log server is running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', function(req, res) {
   res.send({express: 'YOUR BACKEND IS CONNECTED'});
});

// joining the room
io.sockets.on("connection", function(socket) {

    socket.on('room', function(room, name, id) {

    if (id === 1) {                           // the user created a new game
        socket.join(room);
        //games.push(room);
        var hold = games.get(room).concat(name);
        games.set(room, hold);
        let persona = new Player(socket.id, 0);
        persona.setSocketId(socket);
        persona.setAffinity(0);
        persona.setName(hold);
        rolePlayers.push(persona);
        io.in(room).emit("message", hold, "test");


       } else if (id == 0) {
        if (games.has(room)) {
            socket.join(room);
            //io.in(room).emit("welcome", "fuck all!");
            var hold = games.get(room).concat(name);
            games.set(room, hold);
            let persona = new Player(socket.id, 0);
            persona.setSocketId(socket);
            persona.setAffinity(0);
            persona.setName(hold);
            rolePlayers.push(persona);
            io.in(room).emit("message", hold, "test");
        }
            //console.log(games.size);
        } else {
           io.sockets.in(room).emit("message", "The game does not exist!");
           return -1;
        }

        playersName = hold;
       
    });

    socket.on("goToGame", function() {
            io.in("gerry").emit("sendToRoom", "helo");

         });
    
     socket.on("prepareGame", function() {
        
        numPlayers = games.get("gerry").length;


         switch(numPlayers) {               // initializes data needed for amount of players
             case 5:
                playersInRound = [2,3,2,3,3];
                numEvil = 2;
                evilVote4thRound = 1;
                break;
            case 6:
                playersInRound = [2,3,4,3,4];
                numEvil = 2;
                evilVote4thRound = 1;
                break;
            case 7:
                playersInRound = [2,3,3,4,4];
                numEvil = 3;
                evilVote4thRound = 2;
                break;
            case 8:
                playersInRound = [3,4,4,5,5];
                numEvil = 3;
                evilVote4thRound = 2;
                break; 
            case 9:
                playersInRound = [3,4,4,5,5];
                numEvil = 3;
                evilVote4thRound = 2;
                break;
            case 10:
                playersInRound = [3,4,4,5,5];
                numEvil = 4;
                evilVote4thRound = 2;
                break;
            
                default:            // if there are too many players or too little
                    break;          // exit
         }

       let everyVillianIsLemons;
         for (let x = 0; x < numEvil; x++) {
             everyVillianIsLemons = Math.floor((Math.random() * numPlayers));
           
            if (rolePlayers[everyVillianIsLemons].affinity === 1) {
                x--;
                continue;
            }
            rolePlayers[everyVillianIsLemons].setAffinity(1);
            evilPlayers.push(playersName[everyVillianIsLemons]);
        }

        for (let y = 0; y < numPlayers; y++) {
            if (rolePlayers[y].affinity === 1) {
                rolePlayers[y].playerSocket.join("evil");                
            } else {
                rolePlayers[y].playerSocket.join("good");
            }
        }

        // get a random player to become party leader
        let firstPartyLeader = Math.floor((Math.random() * numPlayers));
        io.to(rolePlayers[firstPartyLeader].playerSocket.id).emit("getPartyLeader");

        io.to("evil").emit("giveEvilRoles", evilPlayers);
        io.to("good").emit("giveGoodRoles", "");

        
        

    });

    socket.on("players", function() {
        socket.emit("givePlayers", playersName);
    });


});

    





