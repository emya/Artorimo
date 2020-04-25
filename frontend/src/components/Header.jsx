import React, { Component } from 'react';
import {connect} from 'react-redux';

import {auth} from "../actions";

class Header extends Component {
render() {
    return (
  <div>
    <header class="header">
      <div class="topbar-contents">
        <a href="/" class="logo-link">Ohchee Studio</a>
        { !this.props.user && (
          <div class="login">
            <a class="signin" href="/login">ログイン</a>
          </div>
        )}
        { this.props.user && (
          <div class="login">
            <a class="signin" href="/myprofile">マイページ</a>
          </div>
        )}
      </div>

      <div class="mobile-topbar-contents">

        <a href="#"><img class="logo-mobile" src={require('../img/Torimo_new.png')} /></a>
        <a href="/register" class="mobile-signin" onClick="ga('send', 'event', 'link', 'click', 'register3')">
          <p class="mobile-header-link">Register</p>
        </a>
        <a href="/login" class="mobile-signin" onClick="ga('send', 'event', 'link', 'click', 'signin')">
          <p class="mobile-header-link">Sign in</p>
        </a>

      </div>

    </header>
  </div>
  )}
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
