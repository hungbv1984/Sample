/**
 * @Author : HungBV
 */
import React from 'react';
import TaskGroupContainer from '../components/TaskGroupContainer';

/*
 * Variables
 */
var Router = require('react-router');

export default class Index extends React.Component {
	/**
	 * @return {object}
	 */
  	render() {
  		return (
	        <TaskGroupContainer />
    	);
  	}
}
