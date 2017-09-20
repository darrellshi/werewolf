import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Routes />
        </MuiThemeProvider>
      </div>
    )
  }
}