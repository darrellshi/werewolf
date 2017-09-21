import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table'

export default class PlayerList extends Component {
    render() {
        const paperStyle = {
            height: 60 + 51 * this.props.game.players.length,
            width: 300,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block'
        }

        const game = this.props.game

        if (this.props.shouldShowRoles) {
            return (
                <div>
                    <Paper style={paperStyle} zDepth={1}>
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
        }

        else {
            return (
                <div>
                    <Paper style={paperStyle} zDepth={1}>
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
        }
    }
}