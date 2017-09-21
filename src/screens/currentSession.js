import React, { Component } from 'react'
import logo from './logo.svg';
import RaisedButton from 'material-ui/RaisedButton'
import GameConfiguration from '../components/GameConfiguration'
import PlayerList from '../components/PlayerList'
import StatusBar from '../components/StatusBar'
import YourRoleBar from '../components/YourRoleBar'

const viewURL = 'http://localhost:3333/view/'
const startGameURL = 'http://localhost:3333/start/'
const exitGameURL = 'http://localhost:3333/exit/'

export default class CurrentSession extends Component {
    constructor() {
        super()

        this.state = {
            isHost: false,
            hasGameLoaded: false,
            myRole: ''
        }
    }

    componentDidMount() {
        // set isHost 
        var query = window.location.search.substring(1);
        const role = query.substring(5, 9)
        if (role === 'host') {
            this.setState({ isHost: true })
        }

        const name = query.substring(query.indexOf('name=') + 5)

        fetch(viewURL + name)
            .then(response => {
                if (response.statusText !== "OK") {
                    throw new Error("view players error")
                }
                return response.json()
            })
            .then(data => {
                this.setState({
                    game: data.game,
                    hasGameLoaded: true
                })
                if (data.game.hasStarted) {
                    this.setState({
                        myRole: data.role
                    })
                }
            })
    }

    onClickStart() {
        if (!this.state.hasGameLoaded) {
            return
        }

        fetch(startGameURL)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({
                    game: data.game,
                })
            })
    }

    onClickExit() {
        if (!this.state.hasGameLoaded) {
            return
        }

        var query = window.location.search.substring(1);
        const name = query.substring(query.indexOf('name=') + 5)

        fetch(exitGameURL + name)

        window.location = '/'
    }

    getPlayersWithRole(role) {
        var players = []
        var i
        for (i = 0; i < this.state.game.players.length; i++) {
            if (this.state.game.players[i].role === role) {
                players.push(this.state.game.players[i].name)
            }
        }
        return players
    }

    render() {
        if (!this.state || !this.state.hasGameLoaded) {
            return null
        }

        const game = this.state.game

        const buttonStyle = {
            margin: 12
        }

        const renderGameStarted = (
            <div>
                {this.state.isHost ?
                    <PlayerList shouldShowRoles={true} game={game} />
                    :
                    <div>
                        <GameConfiguration game={game} />
                        <YourRoleBar role={this.state.myRole} />
                        <RaisedButton label="exit game" primary={true} style={buttonStyle} onClick={this.onClickExit.bind(this)} />
                    </div>
                }
            </div>
        )

        const renderGameNotStarted = (
            <div>
                <StatusBar host={game.host} waitingNumber={game.roles.length - game.players.length} />
                <PlayerList shouldShowRoles={false} game={game} />
                {this.state.isHost && game.numberOfRoles === game.players.length &&
                    <RaisedButton label="start game" primary={true} style={buttonStyle} onClick={this.onClickStart.bind(this)} />
                }
            </div>
        )

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to Werewolf</h2>
                </div>
                {game.hasStarted ?
                    renderGameStarted
                    :
                    renderGameNotStarted
                }
            </div>
        );
    }
}
