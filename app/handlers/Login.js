/**
 * @Author : HungBV
 */
import React from 'react';
import Header from '../components/Header';
import LoginPanel from '../components/LoginPanel';

/*
 * Variables
 */
var Router = require('react-router');

export default class Login extends React.Component {
	/**
	 * @return {object}
	 */
  	render() {
  		return (
          <LoginPanel />
    	);
  	}
}
