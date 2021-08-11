import React, { Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import {community, auth} from "../actions";

import '../css/style.scss';

class Community extends Component {

  componentDidMount() {
    this.props.fetchCommunityPosts();
  }

  state = {
    post: "",
    reply: "",
    errors: []
  }

  validatePostForm = () => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if(this.state.post.length === 0) {
      errors.push("入力してください。No Input Found");
    }
    return errors;
  }

  validateReplyForm = () => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if(this.state.reply.length === 0) {
      errors.push("入力してください。No Input Found");
    }
    return errors;
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
        <a href="/community/make/post">投稿する</a>

        {this.props.community && this.props.community.communityPosts && this.props.community.communityPosts.map((post) => (
          <div>
            <p>{post.posted_time && moment(post.posted_time, "YYYY-MM-DD HH:mm:ss").format("YYYY/MM/DD")} </p>
            <p> {post.title} </p>
          </div>
        ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Community);
