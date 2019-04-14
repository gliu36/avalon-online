import React, { Component } from 'react';
import Avalon from './Game/Avalon.js';
import '../styles/Lobby/Lobby.css';

class Lobby extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [],
            gameScreen: false
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

    goToGameScreen = () => {
        this.setState({ gameScreen: true })
    }

    render() {
        var listItems = this.state.list.map(this.createPlayer);
        
        return (
            <div>
                {!this.state.gameScreen && <div className="Lobby">
                    <h1 className="RoomTitle"> Room number #</h1>
                    <p>Current Player in Lobby</p>
                    <ol className="playerList">{listItems}</ol>

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