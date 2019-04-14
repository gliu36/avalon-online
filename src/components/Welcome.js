import React, { Component } from 'react';
import '../styles/Welcome/Welcome.scss';
import io from 'socket.io-client'

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      data: null,
      enterNewNameVisable: false,
      enterOldNameVisable: false,
      enterLobbyVisable: false
    }
  }

  componentDidMount() {

  }
   // const socket = io("http://localhost:5000");
    /*  this.callBackendAPI()
      .then(res => this.setState({data: res.express }))
      .catch(err => console.log(err));
      

  }

  callBackendAPI =  async() => {
    const response = await fetch('/express_backend');
    const body = await response.json();
  } */

  handleNewGameName = (e) => {
    if (e.key === 'Enter') {
      let username = e.target.value;
      console.log(`User Name is: ${username}`);
      var socket = io.connect("http://localhost:8080");
      socket.emit('room', "gerry", 1);
      socket.on('message', function(data) {
        console.log(data);
      });
    }
  }

  handleOldGameName = (e) => {
    if (e.key === 'Enter') {
      let username = e.target.value;
      console.log(`User Name is: ${username}`);
      var socket = io.connect("http://localhost:8080");
      socket.emit('room', "gerry", 0);
      socket.on('message', function(data) {
        console.log(data);
      });
    }
  }


  newGame = () => {
    this.setState({ enterNewNameVisable: true, enterLobbyVisable: false});
  }

  joinGame = () => {
    this.setState({
      enterOldNameVisable: true,
      enterLobbyVisable: true
    });
  }

  backToMenu = () => {
    this.setState({ enterNewNameVisable: false, enterOldNameVisable: false, enterLobbyVisable: false });
  }


  render() {
    let showNewName = this.state.enterNewNameVisable;
    let showOldName = this.state.enterOldNameVisable;
    let showLobby = this.state.enterLobbyVisable;
    return (
      <div className="App">
        <p className="title">Avalon Online</p>
        <div className="btn-container">
          <div>
            {!showNewName && !showOldName && <button className="btn" onClick={this.newGame}>New Game</button>}
            {!showNewName && !showOldName && <button className="btn" onClick={this.joinGame}>Join Game</button>}
            
            {showNewName && <div>
              <div>
                <p>Enter a Name:</p>
                <input className="joinRoom" type="text" onKeyDown={this.handleNewGameName}></input>
                <button className="joinRoom">Ok</button>
              </div>
              
              <button className="btn" onClick={this.backToMenu}>Back</button>
            </div>}

            {showOldName && <div>
              <div>
                <p>Enter a Name:</p>
                <input className="joinRoom" type="text" onKeyDown={this.handleOldGameName}></input>
                <button className="joinRoom">Ok</button>
              </div>
                <p>Enter Lobby ID:</p>
                <input className="joinRoom" type="text" onKeyDown={this.handleOldGameName}></input>
              <button className="btn" onClick={this.backToMenu}>Back</button>
              </div>}
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
