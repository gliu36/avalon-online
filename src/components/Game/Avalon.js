import React, { Component } from 'react'
import io from 'socket.io-client'
import {socket} from "../Lobby"
import Popup from "reactjs-popup"
import Checkbox from './Checkbox'


export default class Avalon extends Component {
  
    
    
    constructor(props) {
        super(props);
        
        this.state = {
            players: this.props.list,
            globalTurnCounter: 0,
            checked: false
            
        };
        
    }
    

    componentDidMount() {
        let nameList;
        

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
            document.getElementById("listPlayers").innerHTML = "";

            for (var I = 0; I < playerList.length; I++) {
                nameList += "<li>" + playerList[I] + "</li>";
            }
            document.getElementById("listPlayers").innerHTML = nameList;
           // playerNames = playerList;
        
        });
    
    }
    
    handleCheckboxChange = event => {
        this.setState({checked: event.target.checked })
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

                    <label>

                        <Checkbox id="player1"
                            checked={this.state.checked}
                            onChange={this.handleCheckboxChange}
                            ></Checkbox>
                        <span id="player1Name">test</span>

                        <Checkbox id="player2"
                            checked={this.state.checked}
                            onChange={this.handleCheckboxChange}
                            ></Checkbox>
                        <span id="player2Name">test2</span>

                        <Checkbox id="player3"
                            checked={this.state.checked}
                            onChange={this.handleCheckboxChange}
                            ></Checkbox>
                        <span id="player3Name">test3</span>

                        <Checkbox id="player4"
                            checked={this.state.checked}
                            onChange={this.handleCheckboxChange}
                            ></Checkbox>
                        <span id="player4Name">test4</span>

                        <Checkbox id="player5"
                            checked={this.state.checked}
                            onChange={this.handleCheckboxChange}
                            ></Checkbox>
                        <span id="player5Name">test5</span>

                        <Checkbox id="player6"
                            checked={this.state.checked}
                            onChange={this.handleCheckboxChange}
                            ></Checkbox>
                        <span id="player6Name">test6</span>

                        <Checkbox id="player7"
                            checked={this.state.checked}
                            onChange={this.handleCheckboxChange}
                            ></Checkbox>
                        <span id="player7Name">test7</span>

                        <Checkbox id="player8"
                            checked={this.state.checked}
                            onChange={this.handleCheckboxChange}
                            ></Checkbox>
                        <span id="player8Name">test8</span>

                        <Checkbox id="player9"
                            checked={this.state.checked}
                            onChange={this.handleCheckboxChange}
                            ></Checkbox>
                        <span id="player9Name">test9</span>

                        <Checkbox id="player10"
                            checked={this.state.checked}
                            onChange={this.handleCheckboxChange}
                            ></Checkbox>
                        <span id="player10Name">test10</span>

                    </label>

                    
                </Popup>

            </div>
            


        )
    }
}
