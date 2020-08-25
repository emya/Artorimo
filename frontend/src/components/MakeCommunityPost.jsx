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
    image: null,
    selectedCategory: null,
    errors: []
  }

  handleChange = selectedCategory => {
    this.setState({selectedCategory})
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
    })
  }

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

    this.props.postCommunity(this.state.title, this.state.body, this.state.image, this.state.selectedCategory.value);
    this.setState({ body: "" });
  }


  render() {
    if (this.props.isSubmissionSucceeded) {
     return (
      <div>
        <Header />

        <div class="wrapper clearfix">
          <SideMenu />
          <div class="community">
            <p class="post-done">投稿が完了しました！</p>
            <a class="btn savep" href="/community">トピック一覧に戻る</a>
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
      <div class="community">
        <h2>New Topic</h2>
        <form onSubmit={this.submitCommunityPost}>
          {errors.map(error => (
            <p class="error-heading" key={error}>Error: {error}</p>
          ))}

          <p class="bold">タイトル</p>
          <input type="text" class="user-data" placeholder="50字以内" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})} />
          <p class="bold">本文</p>
          <textarea class="user-data" placeholder="200字以内" value={this.state.body} onChange={(e) => this.setState({body: e.target.value})} />

          <p class="bold">画像</p>
          {this.state.image && ( <div class="trim-wrap"> <img src={URL.createObjectURL(this.state.image)} /> </div>)}
          <input class="picture-upload" type="file" id="image" accept="image/png, image/jpeg"  onChange={this.handleImageChange} />

          <p class="bold">ユーザー名</p>
          <p>匿名</p>
          <p class="bold">カテゴリー</p>
          <Dropdown options={categories} onChange={this.handleChange} value={this.state.selectedCategory} placeholder="カテゴリを選択してください" />
          <input class="btn savep" type="submit" value="トピックを作成する" />
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
    postCommunity: (title, body, image, category)  => {
      return dispatch(
        community.postCommunity(title, body, image, category)
      );
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeCommunityPost);
