import React, { Component } from 'react';
import '../css/style.scss';

import {connect} from 'react-redux';

import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer'

import {staff} from "../actions";


class SendEmails extends Component {
  state = {
    email: "All",
    subject: "",
    message: "",
    errors: []
  }

  validateForm = (email, subject, message) => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if (email.length === 0 || subject.length === 0 | message.length === 0) {
      errors.push("Email, Subject and Message can't be empty.");
    }

    return errors;
  }

  sendEmails = (e) => {
    e.preventDefault();
    const errors = this.validateForm(
      this.state.email, this.state.subject, this.state.message);

    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    this.props.sendEmails(this.state.email, this.state.subject, this.state.message);
  }

  render() {
    if (this.props.isSubmissionSucceeded) {
     return (
      <div>
        <Header />

        <div class="wrapper clearfix">
          <SideMenu />
          <div class="placeholder">
            <p>Sent emails to {this.state.email}</p>
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

          <h2>Send Emails</h2>

          <div class="form-wrapper">
            <div class="form-section">
              {errors.map(error => (
                <p key={error}>Error: {error}</p>
              ))}
              <p class="form-heading">To<span class="asterisk"> *</span></p><br/>
              <input type="email" maxLength="200" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} required /><br/>

              <p class="form-heading">Subject<span class="asterisk"> *</span></p><br/>
              <input type="text" maxLength="200" value={this.state.subject} onChange={(e) => this.setState({subject: e.target.value})} required /><br/>

              <p class="form-heading">Body<span class="asterisk"> *</span></p><br/>
              <textarea class="contact-message" maxLength="300" value={this.state.message} onChange={(e) => this.setState({message: e.target.value})}  required /><br/>
            </div>
            <button class="form-send-btn btn" onClick={this.sendEmails}>Send</button>
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
    isSubmissionSucceeded: state.staff.isSubmissionSucceeded,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendEmails: (email, subject, message)  => {
      return dispatch(
        staff.sendEmails(email, subject, message)
      );
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendEmails);
