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

        <h2>Contact Us</h2>
        <div class="page">
          ご質問やご要望などあれば以下にお気軽にご連絡ください。
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
