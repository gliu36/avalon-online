import React, { Component } from 'react';
import Avalon from './Game/Avalon.js';
import '../styles/Lobby/Lobby.css';
import io from 'socket.io-client'
import { stat } from 'fs';


let socket = io.connect("http://localhost:7000");

export {socket};

class Lobby extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [],
            gameScreen: false
        };

        this.goToGameScreen = this.goToGameScreen.bind(this);



    }

    updateCodeFromSockets = (payload) => {
        this.setState((state) => ({
            list: payload
        }));
    }

    componentDidMount() {
        var newItem = {
            text: this.props.username,
            key: 'fuck'
        };
        // this.setState((prevState) => {
        //     return {
        //         list: prevState.list.push('newItem')
        //     }
        // });
        socket.emit('room', 'gerry', this.props.username, 0);
        socket.on('message', (payload, msg) => {
            this.updateCodeFromSockets(payload);
            console.log(msg);
        });


        socket.on("sendToRoom", (msg) => {
            console.log(msg);


             this.setState((state) => ({
                gameScreen: true
             }));
             


        });

    }

    createPlayer = (item) => {
        return <li key={item.key}> {item.text} </li>
    }
     

    goToGameScreen = () => {
        socket.emit("goToGame", "data");
        socket.emit("prepareGame", "");
    }

    render() {
        
        var test = this.state.list.map((item,i) => <li key={i}>{item}</li>);
        // var listItems = this.state.list.map((item) =>
        // {   return <li key={item.key}> {item.text} </li>   });
      
        

        return (
            <div id="mainDiv"> {
                !this.state.gameScreen && <div className="Lobby">
                    <h1 id="RoomTitle"> Room number #</h1>
                    <p id="test">Current Player in Lobby</p>
                    <ol id="playerList">{test}</ol>

                    <button className="btn2" onClick={this.props.backToMenu}>Quit</button>
                    <button className="btn2" onClick={this.goToGameScreen}>Start Game</button>
                        
                    
                </div>
            }
                {
                    this.state.gameScreen &&
                        <div className = "lobby">
                            <Avalon players={this.state.list}/>
                        </div>
                    }
            </div>
        )
    }
}

export default Lobby;