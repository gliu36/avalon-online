import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import '../styles/Welcome/Welcome.scss';
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
        <p className="title">Avalon Online</p>
        <div className="btn-container">
          <div>
            {!showName && <button className="btn" onClick={this.newGame}>New Game</button>}
            {!showName && <button className="btn" onClick={this.joinGame}>Join Game</button>}
            
            {showName && <div>
              <div>
                <p>Enter a Name:</p>
                <input className="joinRoom" type="text" onKeyDown={this.handleNewGameName}></input>
              </div>
              {showLobby && <div>
                <p>Enter Lobby ID:</p>
                <input className="joinRoom" type="text" onKeyDown={this.handleOldGameName}></input>
              </div>}
              <button className="btn" onClick={this.backToMenu}>Back</button>
            </div>}
          </div>
        </div>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
      </div>
      
    );
  }
}

export default App;
