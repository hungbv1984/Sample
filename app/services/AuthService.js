/**
 * @Author : HungBV
 */
import request from 'reqwest';
import when from 'when';
var localStorage = require('localStorage');

class AuthService {

  doLogin(username, password, callback) {
    // We call the server to log the user in.
    return when(request({
      url: 'http://localhost:3001/sessions/create',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        username, password
      }
    }))
    .then(function(response) {
        // We get a JWT back.
        let jwt = response.id_token;
        // Trigger the LoginAction with that JWT.
        LoginActions.doLogin(jwt);
        return true;
    });
  }

  doLogout(callback) {
    delete localStorage.token;
    if (cb) cb();
    this.onChange(false);
  }

  loggedIn() {
    return !!localStorage.token;
  }

  onChange() {}
}

export default new AuthService()