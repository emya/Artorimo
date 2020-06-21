import React, { Component } from 'react';
import {connect} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {auth} from "../actions";


class Footer extends Component {
render() {
    return (
    <footer>
      <div class="footer-item">
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
        </ul>
      </div>
      <div class="footer-item">
        <ul>
          <li><a href="/how-it-works">How It Works</a></li>
          <li><a href="/contact-us">Contact Us</a></li>
        </ul>
      </div>
      { this.props.user && (
      <div class="footer-item">
        <ul>
          <li><a class="logout" onClick={this.props.logout}>Logout</a></li>
        </ul>
      </div>
      )}
    </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
