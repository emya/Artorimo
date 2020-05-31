import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions";

class ResetPassword extends Component {
  componentDidMount() {
    this.props.validateToken(this.props.match.params.token);
  }

  state = {
    isValidToken: false,
    isPasswordUpdated: false,
    password: "",
    password1: "",
    errors: []
  }

  validateForm = (password, password1) => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if (password !== password1) {
      errors.push("Password and conformation password do not match");
    }

    return errors;
  }

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validateForm(this.state.password, this.state.password1);

    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    this.props.updatePassword(this.state.password, this.props.match.params.token);
  }

  componentWillReceiveProps(newProps){
    if(newProps.isValidToken !== this.props.isValidToken){
      this.setState({isValidToken: newProps.isValidToken })
    }
    if(newProps.isPasswordUpdated !== this.props.isPasswordUpdated){
      this.setState({isPasswordUpdated: newProps.isPasswordUpdated })
    }
  }

  render() {
    const errors = this.state.errors;

    if (!this.state.isValidToken) {
      return (
        <p> トークンが期限切れです。もう一度やり直してください。 </p>
      )
    }
    if (this.state.isPasswordUpdated){
      return (
        <p> パスワードがリセットされました。こちらからログインください。 <Link to="/login" style={{color: "black"}}>here</Link> </p>
      )
    }

    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>パスワードをリセット</legend>
          {errors.map(error => (
            <p key={error}>Error: {error}</p>
          ))}
          {this.props.errors.length > 0 && (
            <ul>
              {this.props.errors.map(error => (
                <li key={error.field}>{error.message}</li>
              ))}
            </ul>
          )}
          <p>
            <label htmlFor="email">パスワード</label>
            <input
              type="password"
              onChange={e => this.setState({password: e.target.value})} />
          </p>
          <p>
            <label htmlFor="email">パスワード(確認用)</label>
            <input
              type="password"
              onChange={e => this.setState({password1: e.target.value})} />
          </p>
          <p>
            <button type="submit">パスワードをリセット</button>
          </p>
        </fieldset>
      </form>
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
    user: state.auth.user,
    isValidToken: state.auth.isValidToken,
    isPasswordUpdated: state.auth.isPasswordUpdated,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    validateToken: (token) => {
      return dispatch(auth.validateToken(token));
    },
    updatePassword: (password, token) => {
      return dispatch(auth.updatePassword(password, token));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
