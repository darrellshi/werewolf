import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

export default class YourRoleBar extends Component {
    render() {
        const paperStyle = {
            height: 60,
            width: 300,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block'
        }

        return (
            <div>
                <Paper style={paperStyle} zDepth={1}>
                    <p> You role is: <b><i>{this.props.role}</i></b> </p>
                </Paper>
            </div>
        )
    }
}