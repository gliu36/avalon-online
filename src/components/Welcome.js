import React, { Component } from 'react';
import '../styles/Welcome/Welcome.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      enterRoomVisable: false
    }
  }

  componentDidMount() {
      this.callBackendAPI()
      .then(res => this.setState({data: res.express }))
      .catch(err => console.log(err));
  }

  callBackendAPI =  async() => {
    const response = await fetch('/express_backend');
    const body = await response.json();
  }
  

  newGame = () => {
    
  }

  joinGame = () => {
    this.setState({ enterRoomVisable: true });
  }


  render() {
    
    return (
      <div className="App">
        <p>Avalon Online</p>
        <div>
          <button className="standard" onClick={this.newGame}>New Game</button>
          <button className="standard"onClick={this.joinGame}>Join Game</button>
          {this.state.enterRoomVisable && <input className="joinRoom" type="text"></input>}
        </div>
      </div>
      
    );
  }
}

export default App;
