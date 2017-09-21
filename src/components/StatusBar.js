import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

export default class StatusBar extends Component {
    render() {
        const paperStyle = {
            height: 100,
            width: 300,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block'
        }

        const waitingNumber = this.props.waitingNumber

        return (
            <Paper style={paperStyle} zDepth={1}>
                <p> Host: {this.props.host} </p>
                {
                    waitingNumber > 0 ?
                        <p> Waiting for <b><i>{waitingNumber}</i></b> more {waitingNumber > 1 ? 'people' : 'person'} </p>
                        :
                        <p><b><i> Ready to start! </i></b></p>
                }
            </Paper>
        )
    }
}