import React, { Component } from 'react';
import {connect} from 'react-redux';

import {auth} from "../actions";
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import '../css/style.scss';

class IconMaker extends Component {

  render() {
    return (
  <div>
    <Header />
    <div class="wrapper clearfix">
      <div id="icon-container">
        <img class="portfolio-pic" src={require('../img/sample_circle.jpg')} />
      </div>
      <p>Eyes</p>
      <p>Nose</p>
    </div>
    <Footer />
  </div>
    )
  }
}

export default IconMaker;
