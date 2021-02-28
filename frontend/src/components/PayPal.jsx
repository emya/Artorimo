import React, { Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import {community, auth} from "../actions";

import { keys } from '../keys.js';
import '../css/style.scss';

class PayPal extends Component {

  componentDidMount() {
    this.props.fetchCommunityPosts();
  }

  render() {
    const errors = this.state.errors;

    return (
  <div>
    <Header />

    <div class="wrapper clearfix">
      <SideMenu />
      <div class="profile">
        <h2>PayPal</h2>
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
    fetchCommunityPosts: () => {
      dispatch(community.fetchCommunityPosts());
    },
    postCommunity: (message)  => {
      return dispatch(
        community.postCommunity(message)
      );
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayPal);
