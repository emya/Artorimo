import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import {auth} from "../actions";

class Header extends Component {
  state = {
    selectedOption: null,
  }

  handleChange = selectedOption => {
    this.setState({selectedOption})
  };

  render() {
    if (this.state.selectedOption !== null){
      this.setState({selectedOption: null})
      return <Redirect to={this.state.selectedOption.value} />;
    }

    const options = [
      { value: '/myportfolio', label: 'My Portfolio' },
      { value: '/myprofile', label: 'My Profile' },
      { value: '/community', label: 'Community' },
    ];

    const defaultOption = options[0];

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

        { !this.props.user && (
          <a href="/login" class="mobile-signin">ログイン</a>
        )}
        { this.props.user && (
          <Dropdown options={options} onChange={this.handleChange} value={defaultOption} placeholder="Select an option" />
        )}
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
