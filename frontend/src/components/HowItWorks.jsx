import React, { Component } from 'react';
import '../css/style.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import Header from './Header';
import Footer from './Footer';

library.add(faIgloo)

class HowItWorks extends Component {

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
    </div>
    <Footer />
  </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default HowItWorks;
