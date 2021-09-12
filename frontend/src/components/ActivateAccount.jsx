import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import Header from './Header';
import Footer from './Footer';
import {auth} from "../actions";
import Welcome from "./Welcome";

class ActivateAccount extends Component {
  state = {
    isActivated: false,
    isAuthenticated: false,
    errors: []
  }

  createErrorMessage = (error) => {
    let content = [];
    if (error.message && error.message == "The link is invalid."){
      content.push(<p class="start-error" style={{color: "red"}} key={error.field}>仮登録はお済みですか？<a href="/register">まだの方はこちらから</a></p>)

      return content;
    } else if(error.message && error.message == "The user is not active."){
      content.push(<p class="start-error" style={{color: "red"}} key={error.field}>過去に退会手続きをしましたか？ <a href="mailto:ohcheestudio@gmail.com">弊社メールアドレス</a>までご連絡ください </p>)
      return content;
    } else if(error.message && error.message == "The token is invalid."){
      content.push(<p class="start-error" style={{color: "red"}} key={error.field}>リンクの有効期限が切れています。<a href="/complete/registration">もう一度こちらから本登録を完了させてください</a></p>)
      return content;
    }
    return content;
  }

  activateAccount = () => {
    this.props.activateAccount(this.props.match.params.uidb64, this.props.match.params.activeToken);
  }

  componentWillReceiveProps(newProps){
    if(newProps.isActivated !== this.props.isActivated){
      this.setState({isActivated: newProps.isActivated })
    }
    if(newProps.isAuthenticated !== this.props.isAuthenticated){
      this.setState({isAuthenticated: newProps.isAuthenticated })
    }
  }


  render() {
    const errors = this.state.errors;

    if (!this.state.isAuthenticated) {
      return (
  <div>
  <Header />
  <div class="wrapper clearfix">

    <div class="placeholder">
      <h3 class="thankyou">仮登録ありがとうございます</h3>
      {this.props.errors.length > 0 && (
          <div>
            {this.props.errors.map((error) => (
              this.createErrorMessage(error)
            )
            )}
          </div>
      )}
      <p>下のボタンをクリックして本登録を完了してください。</p>
      <a class="btn savep" onClick={this.activateAccount}>本登録を完了する</a>
    </div>
  </div>
  <Footer />
  </div>
      )
    }
    if (this.state.isAuthenticated){
      return (
        <Redirect to="/welcome" />
      )
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
    user: state.auth.user,
    isActivated: state.auth.isActivated,
    isAuthenticated: state.auth.isAuthenticated,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    validateToken: (token) => {
      return dispatch(auth.validateToken(token));
    },
    activateAccount: (uidb64, activeToken) => {
      return dispatch(auth.activateAccount(uidb64, activeToken));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivateAccount);
