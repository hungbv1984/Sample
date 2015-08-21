/**
 * @Author : HungBV
 */

import React from 'react';
import {APPLICATION_NAME} from '../constants/AppConstants';
import Router from 'react-router';
import AuthService from '../services/AuthService'

var {Link} = Router;

export default class Header extends React.Component {

	/**
     * Contructor
     */
	constructor () {
		super();
	    this.state = {
	      loggedIn: AuthService.loggedIn()
	    };
	}

	setStateOnAuth (loggedIn) {
		this.setState({
		  loggedIn: loggedIn
		});
	}

	componentWillMount () {
		AuthService.onChange = this.setStateOnAuth.bind(this);
	}

	/**
	 * @return {object}
	 */
  	render() {
  		return (
        	<div id="header">
        		<div className="header-link"><Link to="index"><i className="fa fa-list-ol"> {APPLICATION_NAME}</i></Link></div>
			</div>
    	);
  	}

  	/**
    *
    *<div className="header-link floatR"><Link to="register">Register</Link></div>
    *<div className="header-link floatR">Logout</div>
    *<div className="header-link floatR"><Link to="login">Login</Link></div>
    *<div className="header-link floatR"><Link to="index">My Board</Link></div>
    */
}