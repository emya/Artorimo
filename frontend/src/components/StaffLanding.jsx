import React, { Component } from 'react';
import {connect} from 'react-redux';

import '../css/style.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer';
import {profile, auth} from "../actions";

import { keys } from '../keys.js';

class StaffLanding extends Component {

  render() {
    return (
  <div>
    <Header />

    <div class="wrapper clearfix">

      <SideMenu />
      <div>
        <ul>
          <li><a href={'/all/users'}>Check All Users</a></li>
          <li><a href={'/send/emails'}>Send users emails</a></li>
          <li><a href={'/send/emagazines'}>Send users emagazines</a></li>
        </ul>
      </div>

    </div>

    <Footer />
  </div>

    )
  }
}

export default StaffLanding;
