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

      <div class="ad-community">
        <a href="https://px.a8.net/svt/ejp?a8mat=3BK37G+B89EUI+2PEO+6VRR5" rel="nofollow">
        <img border="0" width="320" height="50" alt="" src="https://www29.a8.net/svt/bgt?aid=200811580679&wid=004&eno=01&mid=s00000012624001156000&mc=1"/>
        </a>
        <img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=3BK37G+B89EUI+2PEO+6VRR5" alt=""/>
      </div>

        <h2>Community</h2>

        <h3>カテゴリ</h3>
        <ul>
          <a class="category-name" href="/community/posts/0"><li class="category-box">フリーランス悩み相談</li></a>
          <a class="category-name" href="/community/posts/1"><li class="category-box">イラスト批評</li></a>
        </ul>


        {/*
        <h3>最新の投稿</h3>
        <p>memo: 最近書き込まれたトピックを出す</p>
        */}
      </div>

    </div>
    <Footer />
  </div>
    )
  }
}

export default CommunityCategories;
