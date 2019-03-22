import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import './App.scss';
import Topics from "./views/topics";
import Topic from "./views/topic";
import About from "./views/about";
import Backtop from "./components/backtop";

function App(props) {
	return (
		<div className="main-wrap">
			<Router>
				<Route exact path="/" render={() => (
					<Redirect to="/topics/all"/>
				)}/>
				<Switch>
					<Route path="/topics/:tab(all|ask|share|job|good)" component={Topics}></Route>
					<Route path="/topic/:id" component={Topic}></Route>
					<Route path="/about" component={About}></Route>
				</Switch>
			</Router>
			<Backtop />
		</div>
	)
}

export default App;
