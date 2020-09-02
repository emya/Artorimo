import React, { Component } from 'react';
import {connect} from 'react-redux';
import {auth} from "../actions";

class SideMenu extends Component {
render() {
    return (
      <div class="sidemenu">
        <ul>
          <li><a href={'/ask/help'} class="contact-us-sidebar">仲介を相談する</a></li>
          <li><a href={'/myportfolio'}>My Portfolio</a></li>
          <li><a href={'/myprofile'}>My Profile</a></li>
          <li><a href={'/community'}>Community</a></li>
          <li><a href={'/how-it-works'}>How It Works</a></li>
          <li><a class="logout" onClick={this.props.logout}>Logout</a></li>
        </ul>
      </div>
  )}
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
