import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import Header from './Header';
import {auth} from "../actions";
import '../css/style.scss';

class Login extends Component {

  state = {
    email: "",
    password: "",
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/myportfolio' />
    }

    const errors = this.state.errors;

    return (
    <div>
      <Header />

      <div class="menu">
        <a href="/how-it-works">How It Works</a>
        <a href="/about">About Us</a>
        <a href="/contact-us">Contact Us</a>
      </div>

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
              <label class="start" htmlFor="email">e-mail</label>
              <input
                type="email" id="email"
                onChange={e => this.setState({email: e.target.value})} required/>
            </p>
            <p>
              <label class="start" htmlFor="password">パスワード</label>
              <input
                type="password" id="password"
                onChange={e => this.setState({password: e.target.value})} required/>
            </p>
            <p>
              <button class="btn start-page" type="submit">ログイン</button>
            </p>

            <p>
              新規登録の方はこちら <a href="/register">サインアップ</a>
            </p>
            <p>
              <a href="/reset/password"> パスワードを忘れた方はこちら </a>
            </p>
          </fieldset>
        </form>

        <div class="fb-login-button" data-width="" data-size="large"
          data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true">
        </div>

      </div>
    </div>
    )
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
        user: state.auth.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => {
            return dispatch(auth.login(email, password));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
