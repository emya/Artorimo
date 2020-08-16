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
        <ul>
          <li><a href="/community/posts/0">フリーランス悩み相談</a></li>
          <li><a href="/community/posts/1">イラスト批評</a></li>
        </ul>
      </div>

    </div>
    <Footer />
  </div>
    )
  }
}

export default CommunityCategories;
