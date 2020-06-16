import React, { Component } from 'react';
import '../css/style.scss';

import {connect} from 'react-redux';

import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer'

import {contact} from "../actions";


class AskHelp extends Component {
  state = {
    email: this.props.user.email,
    message: "",
    errors: []
  }

  validateForm = (email, message) => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if (email.length === 0 || message.length === 0) {
      errors.push("Email and Message can't be empty. メールアドレス、依頼案件が空白です。");
    }

    return errors;
  }

  sendAskHelp = (e) => {
    e.preventDefault();
    const errors = this.validateForm(
      this.state.email, this.state.message);

    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    this.props.askHelp(this.state.email, this.state.message);
  }

  render() {
    if (this.props.isSubmissionSucceeded) {
     return (
      <div>
        <Header />

        <div class="wrapper clearfix">
          <SideMenu />
          <div class="request-conf">
            <p>ご依頼・ご相談を受け付けました。２日以内にご入力されたメールアドレスにご連絡致します。</p>
          </div>
        </div>

        <Footer />

      </div>
      )
    }

    const errors = this.state.errors;
    return (
    <div>
      <Header />

      <div class="wrapper clearfix">
        <SideMenu />

        <form class="form">

          <h2>仲介を相談する</h2>
          <div class="form-wrapper">
            <div class="form-section">
              {errors.map(error => (
                <p key={error}>Error: {error}</p>
              ))}
              <p class="form-heading">Ohchee Studioとの連絡で使いたいメールアドレス<span class="asterisk">*</span></p><br/>
              <input type="email" maxLength="200" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} required /><br/>

              <p class="form-heading">案件依頼<span class="asterisk">*</span></p><br/>
              <input type="textarea" class="contact-message" maxLength="300" value={this.state.message} onChange={(e) => this.setState({message: e.target.value})}  required /><br/>
            </div>
            <button class="form-send-btn btn" onClick={this.sendAskHelp}>Submit</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isSubmissionSucceeded: state.contact.isSubmissionSucceeded,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    askHelp: (email, message)  => {
      return dispatch(
        contact.askHelp(email, message)
      );
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AskHelp);
