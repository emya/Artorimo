import React, { Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import {community, auth} from "../actions";

import { keys } from '../keys.js';
import '../css/style.scss';

class CommunityPost extends Component {

  componentDidMount() {
    this.props.fetchCommunityPost(this.props.match.params.postId);
  }

  state = {
    reply: "",
    errors: []
  }

  validateForm = () => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if(this.state.reply.length === 0) {
      errors.push("Bodyを入力してください。Body cannot be empty");
    }
    return errors;
  }

  submitReply = (e) => {
    e.preventDefault();
    const errors = this.validateForm();

    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    this.props.replyCommunity(this.props.match.params.postId, this.state.reply);
    this.setState({ reply: "" });

  }

  render() {
    return (
  <div>
    <Header />

    <div class="wrapper clearfix">
      <SideMenu />
      <div class="community">
        <h2>Community</h2>

        {this.props.community && this.props.community.communityPost && (
          <div class="topic-component">
            <p>{this.props.community.communityPost.posted_time && moment(this.props.community.communityPost.posted_time, "YYYY-MM-DD HH:mm:ss").format("YYYY/MM/DD")} </p>
            <p class="topic-title"> {this.props.community.communityPost.title} </p>
            <p> {this.props.community.communityPost.body} </p>
            <div class="comment">
              <p class="bold">コメント（匿名）</p>
              <form onSubmit={this.submitReply}>
                <input type="text" class="user-data" placeholder="100字以内" value={this.state.reply} onChange={(e) => this.setState({reply: e.target.value})} />
                <input class="btn savep two-btn" type="submit" value="投稿する" />
              </form>
            </div>
          </div>
        )}

        {this.props.community && this.props.community.communityReplies && this.props.community.communityReplies.map((reply) => (
          <div class="topic-component">
            <p>{reply.posted_time && moment(reply.posted_time, "YYYY-MM-DD HH:mm:ss").format("YYYY/MM/DD")} </p>
            <p>{reply.body}</p>
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
    fetchCommunityPost: (postId) => {
      dispatch(community.fetchCommunityPost(postId));
    },
    replyCommunity: (post_id, message)  => {
      return dispatch(
        community.replyCommunity(post_id, message)
      );
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityPost);
