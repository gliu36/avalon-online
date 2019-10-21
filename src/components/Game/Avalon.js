import React, { Component } from 'react'
import io from 'socket.io-client'
import {socket} from "../Lobby"

  

export default class Avalon extends Component {
    
    
    constructor(props) {
        super(props);
        
        this.state = {
            players: this.props.list,
            globalTurnCounter: 0,
            
        };
        
 
    }

    componentDidMount() {



        socket.on("giveGoodRoles" ,function() {
            document.getElementById("roles").innerHTML = "YOU ARE GOOD";
            console.log("You are good");

        });
        
        socket.on("giveEvilRoles", function(evilList) {
           console.log(evilList);

           let temp = ""; 
            for (let x = 0; x < evilList.length; x++) {
                temp += evilList[x] + ", ";    
            }

           document.getElementById("roles").innerHTML = temp + " ARE EVIL";
            console.log("You are evil");   
        });

        socket.on("getPartyLeader", function() {
            console.log("You are party leader!");
        });



        socket.emit("players");
        socket.on("givePlayers", function(playerList) {
            let nameList = "";
            document.getElementById("listPlayers").innerHTML = "";

            for (var I = 0; I < playerList.length; I++) {
                nameList += "<li>" + playerList[I] + "</li>";
            }
            document.getElementById("listPlayers").innerHTML = nameList;
        
        });

        

    }

    render() {
        return (
            <div>
                <h1 id = "roles">your role is ...</h1>
                <p>Players</p>
                <ol id = "listPlayers">{}</ol>
            </div>
        )
    }
}
