import React, { Component } from 'react';
import '../styles/Welcome/Welcome.scss';
import io from 'socket.io-client'
import Lobby from './Lobby'
import { Socket } from 'dgram';
//import io from 'socket.io-client'

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      data: null,
      enterNewNameVisable: false,
      enterOldNameVisable: false,
      enterLobbyVisable: false,
      lobby: false,
      username: "",
      lobby_id: "random_value",
      socket: null
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

  handleNewGame = (e) => {
    e.preventDefault();

    let username = this.state.username;  // This is form username
    let lobby_id = "random";  // This is form lobby id

    console.log(`User Name is: ${username}; LobbyID is: ${lobby_id}`);

    let socket = io.connect("http://localhost:8080");
      socket.emit('room', "gerry", 0);
      socket.on('message', function(data) {
        console.log(data);
      }, this.setState({ socket: socket }, this.goToLobby));
    
  }

  handleOldGame = (e) => {
    e.preventDefault();

    let username = this.state.username;  // This is form username
    let lobby_id = this.state.lobby_id;  // This is form lobby id

    console.log(`User Name is: ${username}; LobbyID is: ${lobby_id}`);

    var socket = io.connect("http://localhost:8080");
      socket.emit('room', "gerry", 0);
      socket.on('message', function(data) {
        console.log(data);
      }, this.goToLobby);
    
  }

  handleName = (e) => {this.setState({username: e.target.value})}
  handleLobby = (e) => {this.setState({lobby_id: e.target.value});}


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

  goToLobby = () => {
    this.setState({ lobby: true });
  }



  render() {
    let showNewName = this.state.enterNewNameVisable;
    let showOldName = this.state.enterOldNameVisable;

    return (
      <div className="App">

        {this.state.lobby &&
        // Lobby Here
          <div className = "lobby">
            <Lobby username={this.state.username}/>
          </div>
        }
        
        {!this.state.lobby && <div className="btn-container">
        <p className="title">Avalon Online</p>
          <div>
            {!showNewName && !showOldName && <button className="btn" onClick={this.newGame}>New Game</button>}
            {!showNewName && !showOldName && <button className="btn" onClick={this.joinGame}>Join Game</button>}
            
            {showNewName && 
            <div>
              <form id="newgame" onSubmit={this.handleNewGame} autoComplete="off">
                <p>Enter a Name:</p>
                <input className="joinRoom" type="text" name="username" onChange={this.handleName}></input>
                <button type="submit">Submit</button>
              </form>
              <button className="btn" onClick={this.backToMenu}>Back</button>
              <button className="btn" onClick={this.goToLobby}>Go to Lobby</button>
            </div>}

            {showOldName && 
            <div>
              <form id="oldgame" onSubmit={this.handleOldGame} autoComplete="off">
                <p>Enter a Name:</p>
                <input className="joinRoom" type="text" name="username" onChange={this.handleName}></input>
                <p>Enter Lobby ID:</p>
                <input className="joinRoom" type="text" name="lobby_id" onChange={this.handleLobby}></input>
                <button type="submit">Submit</button>
              </form>
              <button className="btn" onClick={this.backToMenu}>Back</button>
            </div>}
          </div>
        </div>}
      </div>
      
    );
  }
}

export default App;
