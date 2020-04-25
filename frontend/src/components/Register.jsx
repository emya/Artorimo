import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import Header from './Header';
import {auth} from "../actions";
import '../css/style.scss';

class Login extends Component {

  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    isAgreed: false,
    errors: [],
  }

  handleAgreementCheck = (e) => {
    this.setState({
      isAgreed: e.target.checked
    })
  }

  validateForm = (isAgreed) => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if (!isAgreed) {
      errors.push("Please read and agree to the Terms");
    }
    return errors;
  }

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validateForm(this.state.isAgreed);

    this.setState({ errors });

    if (errors.length > 0) {
      return;
    }

    this.props.register(this.state.first_name, this.state.last_name, this.state.email, this.state.password);
  }

  componentClicked = () => {
    console.log("Clicked!");
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/myprofile' />
    }

    const errors = this.state.errors;

    return (
    <div>
      <Header />
      <form onSubmit={this.onSubmit}>
        <fieldset class="signin-box">
          {errors.length > 0 && (
            <div>
              {errors.map(error => (
                <p class="start-error" key={error.field}>{error.message}</p>
              ))}
            </div>
          )}
          {errors.map(error => (
             <p class="error-heading" key={error}>Error: {error}</p>
          ))}
          <p>
            <label class="start" htmlFor="first_name">姓</label>
            <input
              type="text" id="last_name"
              onChange={e => this.setState({last_name: e.target.value})} required/>
          </p>
          <p>
            <label class="start" htmlFor="first_name">名</label>
            <input
              type="text" id="first_name"
              onChange={e => this.setState({first_name: e.target.value})} required/>
          </p>
          <p>
            <label class="start" htmlFor="email">メールアドレス</label>
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
          <input type="checkbox" id="terms" checked={this.state.isAgreed} onChange={this.handleAgreementCheck} />
          <p class="agree">I have read and agree to <a href="/terms-conditions" class="start-link">the Terms</a></p>
          <p>
            <button class="btn start-page" type="submit">サインアップ</button>
          </p>

          <p>
            すでにアカウントをお持ちの方はこちら <a class="start-link" href="/login" style={{color: "black"}}>ログイン</a>
          </p>
        </fieldset>
      </form>

      <div class="fb-login-button" data-width="" data-size="large"
        data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true">
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
    register: (first_name, last_name, email, password) => dispatch(auth.register(first_name, last_name, email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
