import React, { Component } from 'react';
import '../styles/Welcome/Welcome.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {

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
    
  }


  render() {
    return (
      <div className="App">
        <p>Avalon Online</p>
        <div>
          <button className="standard">New Game</button>
          <button className="standard">Join Game</button>
        </div>
      </div>
      
    );
  }
}

export default App;
