import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './screens/home'
import JoinSession from './screens/joinSession'
import CurrentSession from './screens/currentSession'

const Routes = () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/join" component={JoinSession} />
        <Route exact path="/game" component={CurrentSession} />
	</Switch>
)

export default Routes
