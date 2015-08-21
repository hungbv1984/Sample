/**
 * @Author : HungBV
 */
import React from 'react';
import Router from 'react-router';
import AuthService from '../services/AuthService'

var { RouteHandler, Link } = Router;

export default class LoginPanel extends React.Component {

	constructor() {
		super();
    	this.handleSubmit = this.handleSubmit.bind(this);
    	this.state = {
      		user: '',
      		password: '',
      		error: false
    	};
  	}

	handleSubmit(e) {
    	e.preventDefault();
    	AuthService.doLogin(this.state.user, this.state.password)
      		.catch(function(err) {
        		alert("There's an error logging in");
        		console.log("Error logging in", err);
      	});


  	}

	handleSubmit (event) {
	    event.preventDefault();
	    var { router } = this.context;
	    var nextPath = router.getCurrentQuery().nextPath;
	    var email = this.refs.email.getDOMNode().value;
	    var pass = this.refs.pass.getDOMNode().value;

	    AuthService.doLogin(this.state.user, this.state.password, (loggedIn) => {
	      if (!loggedIn)
	        return this.setState({ error: true });
	      if (nextPath) {
	        router.replaceWith(nextPath);
	      } else {
	        router.replaceWith('/about');
	      }
	    });
	  }

	/**
	 * @return {object}
	 */
  	render() {
  		return (
		    <div className="login-container">
			    <div className="row">
			        <div className="col-md-12">
			            <div className="hpanel">
			                <div className="panel-body">
			                        <form id="loginForm" onSubmit={this.handleSubmit}>
			                            <div className="form-group">
			                                <label className="control-label" for="username">Username</label>
			                                <input type="text" placeholder="example@gmail.com" title="Please enter you username" required="" value="" ref="username" id="username" className="form-control"/>
			                                <span className="help-block small">Your unique username to app</span>
			                            </div>
			                            <div className="form-group">
			                                <label className="control-label" for="password">Password</label>
			                                <input type="password" title="Please enter your password" placeholder="******" required="" value="" ref="password" id="password" className="form-control"/>
			                                <span className="help-block small">Yur strong password</span>
			                            </div>
			                            <div className="checkbox">
			                                <div className="icheckbox_square-green checked" styleName="position: relative;">
			                                <input type="checkbox" className="i-checks" checked="" style={{"position": "absolute", "opacity": "0"}}/>
			                                <ins className="iCheck-helper" styleName="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"></ins></div>
			                                     Remember login
			                                <p className="help-block small">(if this is a private computer)</p>
			                            </div>
			                            <button type="submit" className="btn btn-success btn-block" >Login</button>
			                            <Link className="btn btn-default btn-block" to="register">Register</Link>
			                        </form>
			                </div>
			            </div>
			        </div>
			    </div>
          
			    <RouteHandler/>
			</div>
    	);
  	}
}