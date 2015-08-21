/**
 * @Author : HungBV
 */
import React from 'react';
import AuthService from '../services/AuthService'

/*
 * Variables
 */

export default class Logout extends React.Component {
  componentDidMount () {
    AuthService.logout();
  }

  render() {
    return <p>You are now logged out</p>;
  }
}
