import React, { Component } from 'react'
import logo from './logo.svg';
import Paper from 'material-ui/Paper'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'

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

        const styles = {
            statusPaperStyle: {
                height: 100,
                width: 300,
                margin: 20,
                textAlign: 'center',
                display: 'inline-block'
            },
            gamePaperStyle: {
                height: 60 + 51 * 6,
                width: 300,
                margin: 20,
                textAlign: 'center',
                display: 'inline-block'
            },
            playersPaperStyle: {
                height: 60 + 51 * this.state.game.players.length,
                width: 300,
                margin: 20,
                textAlign: 'center',
                display: 'inline-block'
            },
            yourRolePaperStyle: {
                height: 60,
                width: 300,
                margin: 20,
                textAlign: 'center',
                display: 'inline-block'
            },
            button: {
                margin: 12
            }
        }

        const waitingNumber = game.roles.length - game.players.length

        const statusBar = (
            <Paper style={styles.statusPaperStyle} zDepth={1}>
                <p> Host: {game.host} </p>
                {
                    waitingNumber > 0 ?
                        <p> Waiting for <b><i>{waitingNumber}</i></b> more {waitingNumber > 1 ? 'people' : 'person'} </p>
                        :
                        <p><b><i> Ready to start! </i></b></p>
                }
            </Paper>
        )

        const playerList = (
            <div>
                <Paper style={styles.playersPaperStyle} zDepth={1}>
                    {/* <p> Host: {game.host} </p>
                    <p> Total players: {game.players.length} </p> */}
                    <Table allRowsSelected={false} selectable={false}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Joined Players</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {
                                game.players.map((player) => {
                                    return (
                                        <TableRow>
                                            <TableRowColumn>
                                                {player.name}
                                            </TableRowColumn>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )

        const playerListWithRoles = (
            <div>
                <Paper style={styles.playersPaperStyle} zDepth={1}>
                    <Table allRowsSelected={false} selectable={false}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Player</TableHeaderColumn>
                                <TableHeaderColumn>Role</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {
                                game.players.map((player) => {
                                    return (
                                        <TableRow>
                                            <TableRowColumn>
                                                {player.name}
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                {player.role}
                                            </TableRowColumn>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )

        const yourRole = (
            <div>
                <Paper style={styles.yourRolePaperStyle} zDepth={1}>
                    <p> You role is: <b><i>{this.state.myRole}</i></b> </p>
                </Paper>
            </div>
        )

        // TODO: if number of role is 0 don't display the row
        const gameSettingList = (
            <div>
                <Paper style={styles.gamePaperStyle} zDepth={1}>
                    <Table allRowsSelected={false} selectable={false}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Number</TableHeaderColumn>
                                <TableHeaderColumn>Role</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn>
                                    {game.numOfWerewolves}
                                </TableRowColumn>
                                <TableRowColumn>Werewolf</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    {game.numOfVillagers}
                                </TableRowColumn>
                                <TableRowColumn>Villager</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    {game.numOfProphet}
                                </TableRowColumn>
                                <TableRowColumn>Prophet</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    {game.numOfWitch}
                                </TableRowColumn>
                                <TableRowColumn>Witch</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    {game.numOfGuard}
                                </TableRowColumn>
                                <TableRowColumn>Guard</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    {game.numOfCupid}
                                </TableRowColumn>
                                <TableRowColumn>Cupid</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )

        const renderGameStarted = (
            <div>
                {this.state.isHost ?
                    playerListWithRoles
                    :
                    <div>
                        {gameSettingList}
                        {yourRole}
                        <RaisedButton label="exit game" primary={true} style={styles.button} onClick={this.onClickExit.bind(this)} />
                    </div>
                }
            </div>
        )

        const renderGameNotStarted = (
            <div>
                {statusBar}
                {playerList}
                {this.state.isHost && game.numberOfRoles === game.players.length &&
                    <RaisedButton label="start game" primary={true} style={styles.button} onClick={this.onClickStart.bind(this)} />
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
