import React, { Component } from 'react';
import Avalon from './Game/Avalon.js';
import '../styles/Lobby/Lobby.css';
import io from 'socket.io-client'
import { stat } from 'fs';

class Lobby extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [],
            gameScreen: false
        };

        this.socket = io.connect("http://localhost:7000");

        
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
        this.socket.emit('room', 'gerry', this.props.username, 1);
        this.socket.on('message', (payload) => {
            this.updateCodeFromSockets(payload);
        });

    }

    createPlayer = (item) => {
        return <li key={item.key}> {item.text} </li>
    }
     

    goToGameScreen = () => {
        this.setState({ gameScreen: true })
    }

    render() {
        
        var test = this.state.list.map((item,i) => <li key={i}>{item}</li>);
        // var listItems = this.state.list.map((item) =>
        // {   return <li key={item.key}> {item.text} </li>   });
      
        

        return (
            <div>
                {!this.state.gameScreen && <div className="Lobby">
                    <h1 className="RoomTitle"> Room number #</h1>
                    <p>Current Player in Lobby</p>
                    <ol className="playerList">{test}</ol>

                    <button className="btn2" onClick={this.props.backToMenu}>Quit</button>
                    <button className="btn2" onClick={this.goToGameScreen}>Start Game</button>

                    
                </div>}
                {this.state.gameScreen &&
                        <div className = "lobby">
                            <Avalon players={this.state.list}/>
                        </div>
                    }
            </div>
        )
    }
}

export default Lobby;