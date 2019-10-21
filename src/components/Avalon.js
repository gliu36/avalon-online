import React, { Component } from 'react'
import io from 'socket.io-client'
import {socket} from "./Lobby.js"

  

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
            console.log("You are good");
        });
        
        
      //  socket.emit("test", "");
       // socket.on("return", function(temp) {
         //  console.log(temp);
        //});

//        socket.emit("prepareGame", "");
        

    }

    render() {
        return (
            <div>
                Game
            </div>
        )
    }
}
