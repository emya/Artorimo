import React, { Component } from 'react';
import {connect} from 'react-redux';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import {portfolio, auth} from "../actions";

import { keys } from '../keys.js';
import '../css/style.scss';

class Community extends Component {

  componentDidMount() {
  }

  state = {
    errors: []
  }

  submitCommunityPost = (e) => {
    e.preventDefault();
  }

  render() {
    const errors = this.state.errors;

    return (
  <div>
    <Header />

    <div class="wrapper clearfix">
      <SideMenu />
      <div class="profile">
        <h2>Community</h2>
        <form onSubmit={this.submitCommunityPost}>
          {errors.map(error => (
            <p class="error-heading" key={error}>Error: {error}</p>
          ))}

          <p class="object">Post</p>
          <input type="text" class="user-data" />
        </form>
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
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Community);
