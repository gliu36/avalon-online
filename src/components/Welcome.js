import React, { Component } from 'react';
import '../styles/Welcome/Welcome.scss';
import Avalon from './Game/Avalon.js'
import io from 'socket.io-client'

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      data: null,
      enterRoomVisable: false,
      enterLobbyVisable: false
    }
  }

  componentDidMount() {
   // const socket = io("http://localhost:5000");
      this.callBackendAPI()
      .then(res => this.setState({data: res.express }))
      .catch(err => console.log(err));
      

  }

  callBackendAPI =  async() => {
    const response = await fetch('/express_backend');
    const body = await response.json();
  }

  handleName = (e) => {
    if (e.key === 'Enter') {
      let username = e.target.value;
      console.log(`User Name is: ${username}`);
      var socket = io.connect("http://localhost:8080");
      socket.emit('room', "gerry");
    }
  }

  

  newGame = () => {
    this.setState({ enterRoomVisable: true });
  }

  joinGame = () => {
    this.setState({
      enterRoomVisable: true,
      enterLobbyVisable: true
    });
  }

  backToMenu = () => {
    this.setState({ enterRoomVisable: false, enterLobbyVisable: false });
  }


  render() {
    let showName= this.state.enterRoomVisable;
    let showLobby = this.state.enterLobbyVisable;
    return (
      <div className="App">
        <Avalon />
        <p className="title">Avalon Online</p>
        <div className="btn-container">
          <div>
            {!showName && <button className="btn" onClick={this.newGame}>New Game</button>}
            {!showName && <button className="btn" onClick={this.joinGame}>Join Game</button>}
            
            {showName && <div>
              <div>
                <p>Enter a Name:</p>
                <input className="joinRoom" type="text" onKeyDown={this.handleName}></input>
              </div>
              {showLobby && <div>
                <p>Enter Lobby ID:</p>
                <input className="joinRoom" type="text" onKeyDown={this.handleName}></input>
              </div>}
              <button className="btn" onClick={this.backToMenu}>Back</button>
            </div>}
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
