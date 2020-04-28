import React, { Component } from 'react';
import '../css/style.scss';

import {connect} from 'react-redux';

import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer'

import {contact} from "../actions";

class ContactUs extends Component {
  render() {
    return (
    <div>
      <Header />
      <div class="wrapper clearfix">

        { this.props.user && (
          <SideMenu />
        )}

        <div class="page wrapper clearfix">
        <h2>Contact Us</h2>
          <p>ご質問やご要望がございましたら下記の宛先までお気軽にご連絡ください。</p>
          <br/>
          <a href="mailto:ohcheestudio@gmail.com">ohcheestudio@gmail.com</a>
        </div>
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

const mapDispatchToProps = dispatch => {
  return {
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
