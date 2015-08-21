/**
 * @Author : HungBV
 */
import React from 'react';
import Router from 'react-router';
import Header from '../components/Header';
/*
 * Variables
 */
var { RouteHandler } = Router;

export default class Main extends React.Component {
	/**
	 * @return {object}
	 */
  	render() {
  		return (
        <div className="h100p">
  				<Header />
          
          <RouteHandler/>
        </div>
    	);
  	}
}
