import React, { Component } from 'react';
import '../styles/Lobby/Lobby.css'

class Lobby extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: []
        };

        this.addItem = this.addItem.bind(this);
        this.createPlayer = this.createPlayer.bind(this);
    }

    addItem(e) {
        if (this.props.username !== "") {
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

        this.props.username = "";
        
        console.log(this.state.list);

        e.preventDefault();
    }

    createPlayer(item) {
        return <li key={item.key}> {item.text} </li>
    }

    render() {
        var listItems = this.state.list.map(this.createPlayer);
        console.log(this.state.list);
        
        return (
            <div>
                <h1 className="RoomTitle"> Room number #</h1>
                <ol className="playerList"> Player List
                    {listItems}
                </ol>
                </div>
        )
    }
}

export default Lobby;