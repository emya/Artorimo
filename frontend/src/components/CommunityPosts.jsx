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
    this.props.fetchCommunityPosts(this.props.match.params.category);
  }

  render() {
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
        <div class="breadcrumbs"><a href="/community">カテゴリ一覧</a> ＞
          {this.props.match.params.category === "0" && (<a href="#">フリーランス相談</a>)}
          {this.props.match.params.category === "1" && (<a href="#">イラスト批評</a>)}
        </div>
        <a class="btn savep" href="/community/make/post">新規トピックを作成</a>
        <div class="topic-list">

        {this.props.community && this.props.community.communityPosts && this.props.community.communityPosts.map((post) => (
          <a href={`/community/post/${post.id}`}>
          <div class="topic-component">
            <p>{post.posted_time && moment(post.posted_time, "YYYY-MM-DD HH:mm:ss").format("YYYY/MM/DD")} </p>
            <p class="topic-title"> {post.title} </p>
          </div>
          </a>
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
