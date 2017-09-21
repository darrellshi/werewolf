import React, { Component } from 'react'
import logo from './logo.svg'
import Paper from 'material-ui/Paper'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const joinURL = 'http://localhost:3333/join/'
const hostURL = 'http://localhost:3333/host/'

export default class JoinSession extends Component {

    constructor() {
        super()

        this.state = {
            name: '',
            isHost: false,
            numOfWerewolves: 3,
            numOfVillagers: 3,
            hasProphet: true,
            hasWitch: true,
            hasGuard: true,
            hasCupid: false
        }
    }

    componentDidMount() {
        this.setState({ isHost: this.isUserHost() })
    }

    isUserHost() {
        var query = window.location.search.substring(1)
        return query === 'role=host'
    }

    onClickHostOrJoin() {
        if (this.state.name === '') {
            window.alert("Please enter your name")
        } else {
            if (this.state.isHost) {
                fetch(hostURL + this.state.name + '&'
                    + this.state.numOfWerewolves
                    + this.state.numOfVillagers
                    + (this.state.hasProphet ? 1 : 0)
                    + (this.state.hasWitch ? 1 : 0)
                    + (this.state.hasGuard ? 1 : 0)
                    + (this.state.hasCupid ? 1 : 0)
                )
            } else {
                fetch(joinURL + this.state.name)
            }

            var query = window.location.search.substring(1)
            window.location = '/game?' + query + '&name=' + this.state.name
        }
    }

    handleChangeName = (event, newValue) => {
        this.setState({ name: newValue })
    }

    handleChangeNumberOfWerewolves = (event, index, value) => {
        this.setState({ numOfWerewolves: value })
    }

    handleChangeNumberOfVillagers = (event, index, value) => {
        this.setState({ numOfVillagers: value })
    }

    handleChangeProphetCheckbox = (event, isInputChecked) => {
        this.setState((prevState) => {
            return { hasProphet: !prevState.hasProphet }
        })
    }

    handleChangeWitchCheckbox = (event, isInputChecked) => {
        this.setState((prevState) => {
            return { hasWitch: !prevState.hasWitch }
        })
    }

    handleChangeGuardCheckbox = (event, isInputChecked) => {
        this.setState((prevState) => {
            return { hasGuard: !prevState.hasGuard }
        })
    }

    handleChangeCupidCheckbox = (event, isInputChecked) => {
        this.setState((prevState) => {
            return { hasCupid: !prevState.hasCupid }
        })
    }

    render() {
        if (!this.state) {
            return null
        }

        const styles = {
            settingsPaperStyle: {
                height: 60 + 51 * 6,
                width: 300,
                margin: 20,
                textAlign: 'center',
                display: 'inline-block'
            },
            namePaperStyle: {
                height: 100,
                width: 300,
                margin: 20,
                textAlign: 'center',
                display: 'inline-block'
            },
            checkbox: {
                marginBottom: 16
            },
            button: {
                margin: 12
            }
        }

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to Werewolf</h2>
                </div>
                {
                    this.state.isHost ?
                        <div>
                            <Paper style={styles.settingsPaperStyle} zDepth={1}>
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
                                                <DropDownMenu value={this.state.numOfWerewolves}
                                                    onChange={this.handleChangeNumberOfWerewolves.bind(this)}>
                                                    <MenuItem value={1} primaryText="1" />
                                                    <MenuItem value={2} primaryText="2" />
                                                    <MenuItem value={3} primaryText="3" />
                                                    <MenuItem value={4} primaryText="4" />
                                                    <MenuItem value={5} primaryText="5" />
                                                </DropDownMenu>
                                            </TableRowColumn>
                                            <TableRowColumn>Werewolf</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>
                                                <DropDownMenu value={this.state.numOfVillagers}
                                                    onChange={this.handleChangeNumberOfVillagers.bind(this)}>
                                                    <MenuItem value={1} primaryText="1" />
                                                    <MenuItem value={2} primaryText="2" />
                                                    <MenuItem value={3} primaryText="3" />
                                                    <MenuItem value={4} primaryText="4" />
                                                    <MenuItem value={5} primaryText="5" />
                                                </DropDownMenu>
                                            </TableRowColumn>
                                            <TableRowColumn>Villager</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>
                                                <Checkbox className='prophetCheckbox' style={styles.checkbox}
                                                    defaultChecked={this.state.hasProphet}
                                                    onCheck={this.handleChangeProphetCheckbox.bind(this)} />
                                            </TableRowColumn>
                                            <TableRowColumn>Prophet</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>
                                                <Checkbox className='witchCheckbox' style={styles.checkbox}
                                                    defaultChecked={this.state.hasWitch}
                                                    onCheck={this.handleChangeWitchCheckbox.bind(this)} />
                                            </TableRowColumn>
                                            <TableRowColumn>Witch</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>
                                                <Checkbox className='guardCheckbox' style={styles.checkbox}
                                                    defaultChecked={this.state.hasGuard}
                                                    onCheck={this.handleChangeGuardCheckbox.bind(this)} />
                                            </TableRowColumn>
                                            <TableRowColumn>Guard</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>
                                                <Checkbox className='cupidCheckbox' style={styles.checkbox}
                                                    defaultChecked={this.state.hasCupid}
                                                    onCheck={this.handleChangeCupidCheckbox.bind(this)} />
                                            </TableRowColumn>
                                            <TableRowColumn>Cupid</TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                        </div>
                        : ''
                }
                <div>
                    <Paper style={styles.namePaperStyle} zDepth={1}>
                        <TextField
                            className='nameTextField'
                            errorText=''
                            floatingLabelText="Enter you name here"
                            onChange={this.handleChangeName.bind(this)}
                        />
                        <RaisedButton label={this.state.isHost ? 'host' : 'join'}
                            primary={true} style={styles.button} onClick={this.onClickHostOrJoin.bind(this)} />
                    </Paper>
                </div>
            </div>
        )
    }
}
