import React, { Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import {community, auth} from "../actions";

import { keys } from '../keys.js';
import '../css/style.scss';

class CommunityCategories extends Component {

  render() {
    return (
  <div>
    <Header />

    <div class="wrapper clearfix">
      <SideMenu />
      <div class="community">

        <h2>Community</h2>
        <h3>カテゴリ</h3>
        <ul>
          <a class="category-name" href="/community/posts/0"><li class="category-box">フリーランス悩み相談</li></a>
          <a class="category-name" href="/community/posts/1"><li class="category-box">イラスト批評</li></a>
        </ul>
        <h3>最新の投稿</h3>
        <p>memo: 最近書き込まれたトピックを出す</p>
      </div>

    </div>
    <Footer />
  </div>
    )
  }
}

export default CommunityCategories;
