import React, { Component } from 'react';
import {connect} from 'react-redux';

import {auth} from "../actions";
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import '../css/style.scss';

class Test extends Component {

  render() {
    return (
  <div>
    <Header />

    <div class="menu">
      <a href="/how-it-works">How It Works</a>
      <a href="/about">About Us</a>
      <a href="/contact-us">Contact Us</a>
    </div>

    <div class="wrapper clearfix">
      <SideMenu />

      <div class="illustrator-list port placeholder">
      <h2>My Portfolio</h2>

      <div class="profile-left">
          <img class="portfolio-pic" src={require('../img/portrait.png')}/>
      </div>

      <div class="profile-right">
        <p class="user-name">Chiaki Takahashi</p>
        <p>Illustrator</p>
      </div>

        <ul class="port-list">
          <li><div class="illustrator">
            <img src={require('../img/portrait.png')}/>
            </div></li>
          <li><div class="illustrator">
            <img src={require('../img/portrait.png')}/>
            </div></li>
          <li><div class="illustrator">
            <img src={require('../img/portrait.png')}/>
            </div></li>
          <li><div class="illustrator">
            <img src={require('../img/portrait.png')}/>
            </div></li>
          <li><div class="illustrator">
            <img src={require('../img/portrait.png')}/>
            </div></li>
          <li><div class="illustrator">
            <img src={require('../img/portrait.png')}/>
            </div></li>
          <li><div class="illustrator">
            <img src={require('../img/portrait.png')}/>
            </div></li>
          <li><div class="illustrator">
            <img src={require('../img/portrait.png')}/>
            </div></li>
          <li><div class="illustrator">
            <img src={require('../img/portrait.png')}/>
            </div></li>

        </ul>
      </div>

    </div>

    <Footer />
  </div>
    )
  }
}

export default Test;
