import React, { Component } from 'react';
import {connect} from 'react-redux';

import {auth} from "../actions";
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import '../css/style.scss';

class Test extends Component {

  render() {
    return (
  <div>
    <Header />

    <div class="menu">
      <a href="/how-it-works">How It Works</a>
      <a href="/about">About Us</a>
      <a href="/contact-us">Contact Us</a>
    </div>

    <div class="wrapper clearfix">
      <SideMenu />

    </div>

    <Footer />
  </div>
    )
  }
}

export default Test;
