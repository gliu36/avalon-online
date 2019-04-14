import React, { Component } from 'react';
import success from './success.png';
import '../../styles/Game/Avalon.scss';

export default class Avalon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            players: this.props.list,
            globalTurnCounter: 0
        };
    }

    //componentDidMount() {

    //}

    render() {
        return (
            <div className="gameDiv">
                <h1>Game 1</h1>
                <dialog open>You are the evil person.</dialog>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <img src={success} alt="Success"/>
            </div>
        )
    }
}
