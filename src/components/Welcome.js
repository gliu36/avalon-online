import React, { Component } from 'react';
import '../styles/Welcome/Welcome.scss';
import Lobby from './Lobby'
//import io from 'socket.io-client'

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      data: null,
      enterRoomVisable: false,
      enterLobbyVisable: false,
      lobby: false,
      username: ''
    }
  }

  componentDidMount() {
   // const socket = io("http://localhost:5000");
      // this.callBackendAPI()
      // .then(res => this.setState({data: res.express }))
      // .catch(err => console.log(err));
      

  }

  // callBackendAPI =  async() => {
  //   const response = await fetch('/express_backend');
  //   const body = await response.json();
  // }

  handleName = (e) => {
    if (e.key === 'Enter') {
      let username = e.target.value;
      this.setState({ username: username }, this.goToLobby);
      console.log(`User Name is: ${username}`)
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

  goToLobby = () => {
    this.setState({ lobby: true });
  }



  render() {
    let showName= this.state.enterRoomVisable;
    let showLobby = this.state.enterLobbyVisable;
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
              <button className="btn" onClick={this.goToLobby}>Go to Lobby</button>
            </div>}
          </div>
        </div>}
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
