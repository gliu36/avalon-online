import React, { Component } from 'react'

export default class Avalon extends Component {

    constructor(props) {
        super(props);



        this.state = {
            players: this.props.list,
            globalTurnCounter: 0
        };
        
 
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                Game
            </div>
        )
    }
}
