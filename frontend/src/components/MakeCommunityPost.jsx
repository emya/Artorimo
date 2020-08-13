import React, { Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import {community, auth} from "../actions";

import { keys } from '../keys.js';
import '../css/style.scss';

class MakeCommunityPost extends Component {

  state = {
    title: "",
    body: "",
    selectedCategory: null,
    errors: []
  }

  handleChange = selectedCategory => {
    this.setState({selectedCategory})
  };

  validatePostForm = () => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if(this.state.title.length === 0) {
      errors.push("Titleを入力してください。Title cannot be empty");
    }
    if(this.state.body.length === 0) {
      errors.push("Bodyを入力してください。Body cannot be empty");
    }
    if(this.state.selectedCategory === null) {
      errors.push("カテゴリを選択してください。Category is not selected");
    }
    return errors;
  }

  submitCommunityPost = (e) => {
    e.preventDefault();
    const errors = this.validatePostForm();

    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    this.props.postCommunity(this.state.title, this.state.body, this.state.selectedCategory.value);
    this.setState({ body: "" });
  }


  render() {
    if (this.props.isSubmissionSucceeded) {
     return (
      <div>
        <Header />

        <div class="wrapper clearfix">
          <SideMenu />
          <div class="placeholder">
            <p>投稿されました</p>
            <a class="btn savep" href="/community/categories">コミュニティトップページに戻る</a>
          </div>
        </div>

        <Footer />

      </div>
      )
    }

    const errors = this.state.errors;

    const categories = [
      { value: 0, label: 'フリーランス悩み' },
      { value: 1, label: 'イラスト批評' },
    ];

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
          <p> Title </p>
          <input type="text" class="user-data" placeholder="50字以内" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})} />
          <p> Body </p>
          <input type="text" class="user-data" placeholder="200字以内" value={this.state.body} onChange={(e) => this.setState({body: e.target.value})} />
          <p> Category </p>
          <Dropdown options={categories} onChange={this.handleChange} value={this.state.selectedCategory} placeholder="カテゴリを選択してください" />
          <input class="btn savep two-btn" type="submit" value="Post" />
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
    community: state.community,
    user: state.auth.user,
    isSubmissionSucceeded: state.community.isSubmissionSucceeded,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    postCommunity: (title, body, category)  => {
      return dispatch(
        community.postCommunity(title, body, category)
      );
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeCommunityPost);
