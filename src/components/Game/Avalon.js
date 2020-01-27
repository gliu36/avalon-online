import React, { Component } from 'react'
import io from 'socket.io-client'
import {socket} from "../Lobby"
import Popup from "reactjs-popup"
var CheckBoxList = require('react-checkbox-list');
  

export default class Avalon extends Component {
    
    
    constructor(props) {
        super(props);
        
        this.state = {
            players: this.props.list,
            globalTurnCounter: 0,
            
        };
        
    }


    componentDidMount() {
        

        document.getElementById("selectOnQuest").hidden = true;


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
            console.log("You are the party leader!");
            // party leader button to open prompt to select members for the quest
            document.getElementById("selectOnQuest").hidden = false;


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

                <Popup modal trigger={
                <button id="selectOnQuest">Select Members</button>}>
                    Select members to go on the Quest!
                    <p id="numberToSelect"></p>
                    <CheckBoxList ref="chkboxList" defaultData={data} onChange={this.handleCheckboxListChange} />
                </Popup>

            </div>
            


        )
    }
}
