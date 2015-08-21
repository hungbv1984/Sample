/**
 * @Author : HungBV
 */

import React from 'react';
import Router from 'react-router';
import MainApp from '../handlers/Main';
import Index from '../handlers/Index';
import Login from '../handlers/Login';
import Register from '../handlers/Register';
import NotFound from '../handlers/NotFound';
import Logout from '../handlers/Logout';

/*
 * Variables
 */
var { DefaultRoute, Route, NotFoundRoute } = Router;

export default ([
	<Route name="index" path="/" handler={MainApp}>
		<DefaultRoute handler={Index} />
		<Route name="register" path="/register" handler={Register}/>
	    <Route name="login" path="/login" handler={Login}/>
	    <Route name="logout" path="/logout" handler={Logout}/>
	</Route>,
	<NotFoundRoute handler={NotFound}/>
	]
);