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

export default class GameConfiguration extends Component {
    render() {
        const paperStyle = {
            height: 60 + 51 * 6,
            width: 300,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block'
        }

        const game = this.props.game

        // TODO: if number of role is 0 don't display the row
        return (
            <div>
                <Paper style={paperStyle} zDepth={1}>
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
    }
}