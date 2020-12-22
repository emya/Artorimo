import React, { Component } from 'react';
import {connect} from 'react-redux';

import {auth} from "../actions";
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import '../css/icons.scss';

class IconMaker extends Component {

  state = {
    eyes: 0,
    mouth: 0,
  }

  switchEyes = (neweyes) => {
    console.log("switchEyes");
    this.setState({
      eyes: neweyes
    })
  }

  switchMouth = (newmouth) => {
    console.log("switchMouth");
    this.setState({
      mouth: newmouth
    })
  }

  render() {
    return (
  <div>
    <Header />
    <div class="wrapper clearfix">

      <div class="parent">
        <img class="image1" src={require('../img/hair.png')} />
        {this.state.eyes === 0 && (
          <img class="eyes" src={require('../img/eye0.png')} />
        )}
        {this.state.eyes === 1 && (
          <img class="eyes" src={require('../img/eye1.png')} />
        )}

        {this.state.mouth === 0 && (
          <img class="mouth" src={require('../img/mouth0.png')} />
        )}
        {this.state.mouth === 1 && (
          <img class="mouth" src={require('../img/mouth1.png')} />
        )}

      </div>
      <div class="function-buttons">
        <p>Eyes</p>
        <div class="column">
          {this.state.eyes === 0 && (
            <img class="choosed" src={require('../img/eye0.png')} onClick={() => this.switchEyes(0)} />
          )}
          {this.state.eyes ==! 0 && (
            <img class="choice" src={require('../img/eye0.png')} onClick={() => this.switchEyes(0)} />
          )}
        </div>
        <div class="column">
          {this.state.eyes === 1 && (
            <img class="choosed" src={require('../img/eye1.png')} onClick={() => this.switchEyes(1)} />
          )}
          {this.state.eyes ==! 1 && (
            <img class="choice" src={require('../img/eye1.png')} onClick={() => this.switchEyes(1)} />
          )}
        </div>

        <p>Mouth</p>
        <div class="column">
          {this.state.mouth === 0 && (
            <img class="choosed" src={require('../img/mouth0.png')} onClick={() => this.switchMouth(0)} />
          )}
          {this.state.mouth ==! 0 && (
            <img class="choice" src={require('../img/mouth0.png')} onClick={() => this.switchMouth(0)} />
          )}
        </div>
        <div class="column">
          {this.state.mouth === 1 && (
            <img class="choosed" src={require('../img/mouth1.png')} onClick={() => this.switchMouth(1)} />
          )}
          {this.state.mouth ==! 1 && (
            <img class="choice" src={require('../img/mouth1.png')} onClick={() => this.switchMouth(1)} />
          )}
        </div>
      </div>
    </div>
    <Footer />
  </div>
    )
  }
}

export default IconMaker;
