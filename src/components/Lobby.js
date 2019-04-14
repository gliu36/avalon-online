import React, { Component } from 'react';
import '../styles/Lobby/Lobby.css';
import io from 'socket.io-client'
import { stat } from 'fs';


class Lobby extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: []
        };

        this.socket = io.connect("http://localhost:8080");

        
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

    render() {        

        
        var test = this.state.list.map((item,i) => <li key={i}>{item}</li>);
        // var listItems = this.state.list.map((item) =>
        // {   return <li key={item.key}> {item.text} </li>   });
      
        

        return (
            <div>
                <h1 className="RoomTitle"> Room number #</h1>
                <p>Current Player in Lobby</p>
                <ol className="playerList">{test}</ol>
                
            </div>
        )
    }
}

export default Lobby;