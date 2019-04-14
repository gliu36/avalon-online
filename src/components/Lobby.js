import React, { Component } from 'react';
import '../styles/Lobby/Lobby.css';
import io from 'socket.io-client'


class Lobby extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: []
        };

    }

    componentDidMount() {
        var newItem = {
            text: this.props.username,
            key: Date.now()
        };
        this.setState((prevState) => {
            return {
                list: prevState.list.concat(newItem)
            }
        }, this.handleSocket);
    }

    handleSocket = () => {
        var socket = io.connect("http://localhost:8080");
        this.props.newGame ? socket.emit('room', "gerry", 1) : socket.emit('room', "gerry", 0);
        socket.on('message', function(data) {
          console.log(data);
        });
    }

    createPlayer = (item) => {
        return <li key={item.key}> {item.text} </li>
    }

    render() {
        var listItems = this.state.list.map(this.createPlayer);
        
        return (
            <div>
                <h1 className="RoomTitle"> Room number #</h1>
                <p>Current Player in Lobby</p>
                <ol className="playerList">{listItems}</ol>
            </div>
        )
    }
}

export default Lobby;