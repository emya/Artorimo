import React, { Component } from 'react';
import '../css/style.scss';

import {connect} from 'react-redux';

import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer'

import {contact} from "../actions";

class ContactUs extends Component {
  state = {
    language: 0,
  }

  switchLanguage = (lan) => {
    this.setState({
      language: lan
    })
  }

  render() {
    return (
    <div>
      <Header />
      <div class="wrapper clearfix">

        <div class="page wrapper clearfix">
        <h2>Contact Us</h2>
        <p style={{textAlign:"right"}}>
          <a onClick={this.switchLanguage.bind(this, 0)}>日本語</a> | <a onClick={this.switchLanguage.bind(this, 1)}>English</a>
        </p>
        {this.state.language === 0 && (
          <p>ご質問やご要望がございましたら下記の宛先までお気軽にご連絡ください。</p>
        )}
        {this.state.language === 1 && (
          <p>Please contact us if you want to work with Japanese Illustrators, or have any inquiries!</p>
        )}
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
