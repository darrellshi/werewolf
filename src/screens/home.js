import React, { Component } from 'react'
import logo from './logo.svg';
import RaisedButton from 'material-ui/RaisedButton'

export default class Home extends Component {
    onClickHostSession() {
        window.location = '/join?role=host'
    }

    onClickJoinSession() {
        window.location = '/join?role=player'        
    }

    testSetupNinePlayers() {
        fetch('http://localhost:3333/test')
    }

    render() {
        const buttonStyle = {
            margin: 12,
        };
        
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to Werewolf</h2>
                </div>
                <RaisedButton label="host session" primary={true} style={buttonStyle} onClick={this.onClickHostSession}/>
                <RaisedButton label="join session" primary={true} style={buttonStyle} onClick={this.onClickJoinSession}/>
                <RaisedButton label="test set up 9 players" primary={true} style={buttonStyle} onClick={this.testSetupNinePlayers}/>
            </div>
        );
    }
}
