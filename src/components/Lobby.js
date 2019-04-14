import React, { Component } from 'react';
import '../styles/Lobby/Lobby.css';

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