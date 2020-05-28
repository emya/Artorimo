import React, { Component } from 'react';
import {connect} from 'react-redux';

import {auth} from "../actions";
import Header from './Header';
import Footer from './Footer';

import '../css/style.scss';

class ClientLanding extends Component {

  render() {
    return (
      <div>
        <Header />
        <header class="header">
          <div class="catchcopy clearfix">
            <img class="lpimage englishlp" src={require('../img/lp-english.jpg')}/>
            <img class="lpimage-mobile" src={require('../img/lp-english.jpg')}/>
              <div class="catch-english">
                <h1 class="site-title2">Looking to work with a<span class="bold"> Japanese Illustrator</span>?<br/><br/>Ohchee Studio is here to help you <span class="bold">from initial search to delivering a finished piece.</span></h1>
                <a class="button" href="mailto:ohcheestudio@gmail.com"> Contact Us</a>
              </div>
          </div>
        </header>

        <div class="menu">
          <a href="/how-it-works">How It Works</a>
          <a href="/about">About Us</a>
          <a href="/contact-us">Contact Us</a>
        </div>

        {/* Use this once we support search function
        <div class="illustrator-sort">
          <div class="search-title">Style</div>
          <ul>
            <li><input type="checkbox" class="checkbox" />Character</li>
            <li><input type="checkbox" class="checkbox" />Character</li>
            <li><input type="checkbox" class="checkbox" />Character</li>
            <li><input type="checkbox" class="checkbox" />Character</li>
            <li><input type="checkbox" class="checkbox" />Character</li>
            <li><input type="checkbox" class="checkbox" />Character</li>
            <li><input type="checkbox" class="checkbox" />Character</li>
            <li><input type="checkbox" class="checkbox" />Character</li>
            <li><input type="checkbox" class="checkbox" />Character</li>
            <li><input type="checkbox" class="checkbox" />Character</li>
            <li><input type="checkbox" class="checkbox" />Character</li>
            <li><input type="checkbox" class="checkbox" />Character</li>
            <li><input type="checkbox" class="checkbox" />Character</li>
            <li><input type="checkbox" class="checkbox" />Character</li>
            <li><input type="checkbox" class="checkbox" />Character</li>
            <li><input type="checkbox" class="checkbox" />Character</li>
            <li><input type="checkbox" class="checkbox" />Character</li>
          </ul>
          <div class="search">
            <div class="search-title bottom">Free Search</div>
            <input type="text" class="searchbox" />
          </div>
          <div class="search">
            <div class="search-title bottom">Artist Name</div>
            <input type="text" class="searchbox" />
          </div>
          <div class="button searchbtn">Search</div>
        </div>
        */}

        <script src="https://snapwidget.com/js/snapwidget.js"></script>
        <link rel="stylesheet" href="https://snapwidget.com/stylesheets/snapwidget-lightbox.css" />
        <script src="https://snapwidget.com/js/snapwidget-lightbox.js"></script>
        <iframe
          src="https://snapwidget.com/embed/831134" class="snapwidget-widget"
          allowtransparency="true" frameborder="0" scrolling="no"
          style={{border:'none', overflow:'hidden',  width:'100%', height:'300px'}}>
        </iframe>

        {/* Use this once we get portfolio page
        <div class="illustrator-list">
          <ul>
            <li><div class="illustrator">
              <img src={require('../img/portrait.png')}/>
              <div class="illustrator-username">Chloe Takahashi</div>
            </div></li>
            <li><div class="illustrator">
              <img src={require('../img/portrait.png')}/>
              <div class="illustrator-username">Chloe Takahashi</div>
            </div></li>
            <li><div class="illustrator">
              <img src={require('../img/portrait.png')}/>
              <div class="illustrator-username">Chloe Takahashi</div>
            </div></li>
            <li><div class="illustrator">
              <img src={require('../img/portrait.png')}/>
              <div class="illustrator-username">Chloe Takahashi</div>
            </div></li>
            <li><div class="illustrator">
              <img src={require('../img/portrait.png')}/>
              <div class="illustrator-username">Chloe Takahashi</div>
            </div></li>
            <li><div class="illustrator">
              <img src={require('../img/portrait.png')}/>
              <div class="illustrator-username">Chloe Takahashi</div>
            </div></li>
            <li><div class="illustrator">
              <img src={require('../img/portrait.png')}/>
              <div class="illustrator-username">Chloe Takahashi</div>
            </div></li>
          </ul>
        </div>
        */}

    <Footer />
  </div>
    )
  }
}

export default ClientLanding;
