/**
 * @Author : HungBV
 */

import React from 'react';
import Router from 'react-router';
import routes from './route/MainAppRoute';

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('MainApp'));
});