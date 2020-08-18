import React, { Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import {community, auth} from "../actions";

import { keys } from '../keys.js';
import '../css/style.scss';

class Community extends Component {

  componentDidMount() {
    this.props.fetchCommunityPosts(this.props.match.params.category);
  }

  render() {
    return (
  <div>
    <Header />

    <div class="wrapper clearfix">
      <SideMenu />
      <div class="community">
        <h2>Topics</h2>
        <a class="btn savep" href="/community/make/post">新規トピックを作成</a>
        <div class="topic-list">

        {this.props.community && this.props.community.communityPosts && this.props.community.communityPosts.map((post) => (
          <div>
            <p>{post.posted_time && moment(post.posted_time, "YYYY-MM-DD HH:mm:ss").format("YYYY/MM/DD")} </p>
            <p> {post.title} </p>
            <a href={`/community/post/${post.id}`}> Detail </a>
          </div>
        ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    community: state.community,
    user: state.auth.user,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchCommunityPosts: (category) => {
      dispatch(community.fetchCommunityPosts(category));
    },
    postCommunity: (message)  => {
      return dispatch(
        community.postCommunity(message)
      );
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Community);
