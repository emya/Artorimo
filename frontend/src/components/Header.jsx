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
            <a class="signin" href="/login">Login</a>
          </div>
        )}
        { this.props.user && (
          <div class="login">
            <a class="signin" href="/myportfolio">マイページ</a>
          </div>
        )}
      </div>

      <div class="mobile-topbar-contents">

        <a href="/" class="logo-link">Ohchee Studio</a>

        <a href="/login" class="mobile-signin">ログイン</a>

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
