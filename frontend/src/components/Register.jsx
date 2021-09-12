import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import Header from './Header';
import Footer from './Footer';
import {auth, contact} from "../actions";
import '../css/style.scss';

class Login extends Component {

  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    isAgreed: false,
    isGoodsChecked: false,
    errors: [],
  }

  handleAgreementCheck = (e) => {
    this.setState({
      isAgreed: e.target.checked
    })
  }

  handleGoodsAnswerChange = (e) => {
    const checked = e.target.checked;
    const name = e.target.value;
    if (checked) {
      this.setState({isGoodsChecked: name});
    }
  }

  notifyGoodsAnswer = () => {
    if (this.state.isGoodsChecked === "1"){
      this.props.askGoods();
    }
    return false;
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

  createErrorMessage = (error) => {
    let content = [];
    if (error.message && error.message == "user with this email address already exists."){
      content.push(<p class="start-error" key={error.field}>このメールアドレスは既に登録(もしくは仮登録)済みです</p>)
      return content;
    }
    return content;
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

  render() {
    if (this.props.isRegistered) {
      return (
  <div>
  <Header />
  <div class="wrapper clearfix">

    <div class="placeholder">
      <h2 class="thankyou">仮登録ありがとうございます！</h2>
      <h3 class="thankyou">会員登録認証メールを送信しました</h3>
      <div>
         下記のメールアドレスに本登録のご案内をお送りしました。
         メールに記載されたURLを開くと登録完了となります。

         <p> {this.state.email} </p>
      </div>
    </div>
  </div>
  <Footer />
  </div>
      )
    }

    if (this.props.isAuthenticated) {
      return <Redirect to='/myprofile' />
    }

    const errors = this.state.errors;

    return (
    <div>
      <Header />

      <div class="wrapper clearfix">

      <form onSubmit={this.onSubmit}>
        <fieldset class="signin-box">
          <legend>新規会員登録</legend>
          {this.props.errors.length > 0 && (
              <div>
                {this.props.errors.map((error) => (
                  this.createErrorMessage(error)
                )
                )}
              </div>
          )}

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
          <p class="agree"><a href="/privacy-policy" >個人情報保護方針</a>に同意します</p>
          <p>
            <button
              class="btn start-page" type="submit"
              onclick="gtag('event', 'Register', {'event_category': 'register', 'event_label': 'register1'});">
              登録
            </button>
          </p>

          <p>
            すでにアカウントをお持ちの方はこちら<br/> <a href="/login">ログイン</a>
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
    isRegistered: state.auth.isRegistered,
    user: state.auth.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    register: (first_name, last_name, email, password) => dispatch(auth.register(first_name, last_name, email, password)),
    askGoods: ()  => {
      return dispatch(
        contact.askGoods()
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
