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
      errors.push("コメントを入力してください。Comment cannot be empty");
    }
    if(this.state.reply.length > 100) {
      errors.push("コメントは100字以内にしてください。Comment cannot be longer than 100 characters");
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
    const errors = this.state.errors;

    return (
  <div>
    <Header />

    <div class="wrapper clearfix">
      <SideMenu />
      <div class="community">

      <div class="ad-community">
        <a href="https://px.a8.net/svt/ejp?a8mat=3BK37G+B89EUI+2PEO+6VRR5" rel="nofollow">
        <img border="0" width="320" height="50" alt="" src="https://www29.a8.net/svt/bgt?aid=200811580679&wid=004&eno=01&mid=s00000012624001156000&mc=1"/>
        </a>
        <img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=3BK37G+B89EUI+2PEO+6VRR5" alt=""/>
      </div>

        <h2>Community</h2>

        {this.props.community && this.props.community.communityPost && (
          <div class="topic-component">
            <p>{this.props.community.communityPost.posted_time && moment(this.props.community.communityPost.posted_time, "YYYY-MM-DD HH:mm:ss").format("YYYY/MM/DD")} </p>
            <p class="topic-title"> {this.props.community.communityPost.title} </p>
            <p> {this.props.community.communityPost.body} </p>
            {this.props.community.communityPost.image && (
              <div class="community-image">
                <img class="community-image" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/communities/${this.props.community.communityPost.id}/${this.props.community.communityPost.image}`} />
              </div>
            )}
            <div class="comment">
              <p class="bold">コメント（匿名）</p>
              <form onSubmit={this.submitReply}>
                {errors.map(error => (
                    <p class="error-heading" key={error}>Error: {error}</p>
                ))}
                <textarea class="user-data" placeholder="100字以内" value={this.state.reply} onChange={(e) => this.setState({reply: e.target.value})} />
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
