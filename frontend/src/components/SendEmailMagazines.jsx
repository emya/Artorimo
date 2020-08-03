import React, { Component } from 'react';
import '../css/style.scss';

import {connect} from 'react-redux';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer'

import {staff} from "../actions";


class SendEmailMagazines extends Component {
  componentDidMount() {
    this.props.fetchEmailMagazines();
  }

  handleChange = selectedOption => {
    this.setState({selectedOption: selectedOption.value})
  };

  state = {
    email: "All",
    subject: "",
    selectedOption: null,
    errors: []
  }

  validateForm = (email, subject, selectedOption) => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if (email.length === 0 || subject.length === 0 || selectedOption === null) {
      errors.push("Email, Subject and Template can't be empty.");
    }

    return errors;
  }

  sendEmails = (e) => {
    e.preventDefault();
    const errors = this.validateForm(
      this.state.email, this.state.subject, this.state.selectedOption);

    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    this.props.sendEmailMagazines(this.state.email, this.state.subject, this.state.selectedOption);
  }

  render() {
    if (this.props.isEmagazineSubmissionSucceeded) {
     return (
      <div>
        <Header />

        <div class="wrapper clearfix">
          <SideMenu />
          <div class="placeholder">
            <p>Sent emagazines to {this.state.email}</p>
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

              {this.props.staff && this.props.staff.emagazines && (
                <div>
                <Dropdown options={this.props.staff.emagazines} onChange={this.handleChange} value={this.props.staff.emagazines[0]} placeholder="Select a template" />
                </div>
              )}
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
    staff: state.staff,
    isEmagazineSubmissionSucceeded: state.staff.isEmagazineSubmissionSucceeded,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEmailMagazines: () => {
      dispatch(staff.fetchEmailMagazines());
    },
    sendEmailMagazines: (email, subject, template)  => {
      return dispatch(
        staff.sendEmailMagazines(email, subject, template)
      );
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendEmailMagazines);
