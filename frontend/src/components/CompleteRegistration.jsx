import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import Header from './Header';
import Footer from './Footer';
import {auth, contact} from "../actions";
import '../css/style.scss';

class CompleteRegistration extends Component {

  state = {
    email: "",
    isSent: false,
  }


  onSubmit = e => {
    e.preventDefault();
    this.props.completeRegister(this.state.email);
    this.setState({isSent: true})
  }

  createErrorMessage = (error) => {
    let content = [];
    if (error.message && error.message == "No user is registered with the email."){
      return content;
    } else if(error.message && error.message == "The user is inactive"){
      return content;
    } else if(error.message && error.message == "The user is already activated"){
      return content;
    }
    return content;
  }

  render() {

    if (this.state.isSent) {
      return (
  <div>
  <Header />
  <div class="wrapper clearfix">

    <div class="placeholder">
      <h3 class="thankyou">会員登録認証メールを送信しました</h3>
      <div>
         下記のメールアドレスに本登録のご案内をお送りしました。
         メールに記載されたURLを開くと登録完了となります。

         <p> {this.state.email} </p>
      </div>

      <div style={{marginTop: "100px", fontSize: "13px"}}>
         もしメールが届かない場合は以下の点をご確認ください。
         <ul style={{listStyleType: "none"}}>
           <li>仮登録に使用したメールアドレスと上記のメールアドレスが一致しているか</li>
           <li>仮登録を完了しているか (仮登録がまだの場合は<a href="/register">こちらから</a>)</li>
           <li>本登録が既に完了している (本登録が完了している場合は<a href="/login">こちらからログイン</a>)</li>
           <li>以前に退会手続きをした (<a href="mailto:ohcheestudio@gmail.com">弊社メールアドレス</a>までご連絡ください)</li>
         </ul>

         <br />
         <br />
         その他何かご質問等ございましたら下記の宛先までお気軽にご連絡ください。
         <br />
         <br />
         <a href="mailto:ohcheestudio@gmail.com">ohcheestudio@gmail.com</a>

      </div>
    </div>
  </div>
  <Footer />
  </div>
      )
    }

    return (
    <div>
      <Header />

      <div class="wrapper clearfix">

      <form onSubmit={this.onSubmit}>
        <fieldset class="signin-box">
          {this.props.errors.length > 0 && (
              <div>
                {this.props.errors.map((error) => (
                  this.createErrorMessage(error)
                )
                )}
              </div>
          )}

          <p>
            <label class="start" htmlFor="email">メールアドレス</label>
            <input
              type="email" id="email"
              onChange={e => this.setState({email: e.target.value})} required/>
          </p>
          <p>
            <button
              class="btn start-page" type="submit"
              onclick="gtag('event', 'Register', {'event_category': 'register', 'event_label': 'register1'});">
              本登録完了へ
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
    completeRegister: (email) => dispatch(auth.completeRegister(email)),
    askGoods: ()  => {
      return dispatch(
        contact.askGoods()
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteRegistration);
