import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import Header from './Header';
import {auth} from "../actions";
import '../css/style.scss';

class AdminLogin extends Component {
  componentDidMount() {
    this.props.checkAdmin();
    console.log(this.props.isSuperuser);
  }

  state = {
    username: "",
    password: "",
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }

  render() {
    console.log(this.props.isSuperuser);

    const errors = this.state.errors;
    if (this.props.isSuperuser === null) {
      return null
    }

    if (this.props.isSuperuser) {
      return (
      <div>

      <div class="wrapper clearfix">
        <form onSubmit={this.onSubmit}>
          <fieldset class="signin-box">
            <legend>Login</legend>
            {this.props.errors.length > 0 && (
              <div>
                {this.props.errors.map(error => (
                  <p class="start-error" key={error.field}>{error.message}</p>
                ))}
              </div>
            )}

            <p>
              <label class="start" htmlFor="username">username</label>
              <input
                type="username" id="username"
                onChange={e => this.setState({username: e.target.value})} required/>
            </p>
            <p>
              <label class="start" htmlFor="password">Password</label>
              <input
                type="password" id="password"
                onChange={e => this.setState({password: e.target.value})} required/>
            </p>
            <p>
              <button class="btn start-page" type="submit">Login to Admin</button>
            </p>

          </fieldset>
        </form>

        <div class="fb-login-button" data-width="" data-size="large"
          data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true">
        </div>

      </div>
      </div>
    )}

    if (this.props.isSuperuser === false) {
      return <Redirect to='/myportfolio' />
    }
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    });
  }

  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated,
    isSuperuser: state.auth.isSuperuser,
    user: state.auth.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    checkAdmin: () => {
      return dispatch(auth.checkAdmin());
    },
    login: (email, password) => {
      return dispatch(auth.login(email, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
