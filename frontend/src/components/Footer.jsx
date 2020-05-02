import React, { Component } from 'react';
import {connect} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      </footer>
  )}
}

export default Footer;
