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
                    items: prevState.items.concat(newItem)
                }
            });

            
        }

        this.props.username = "";
        
        console.log(this.state.items);

        e.preventDefault();
    }

    createPlayer(item) {
        return <li key={item.key}> {item.text} </li>
    }

    render() {
        var listItems = this.state.list.map(this.createPlayer);
        console.log(this.state.items);

        return (
            <div>
                <p className="RoomTitle"> Room number #</p>
                <ol className="playerList">
                    {listItems}
                </ol>
                </div>
        )
    }
}

export default Lobby;