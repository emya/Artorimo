import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import {icons, auth} from "../actions";

import '../css/icons.scss';

class IconMaker extends Component {

  state = {
    eyes: 0,
    mouth: 0,
  }

  switchEyes = (neweyes) => {
    this.setState({
      eyes: neweyes
    })
  }

  switchMouth = (newmouth) => {
    this.setState({
      mouth: newmouth
    })
  }

  proceedCheckout = (e) => {
    e.preventDefault();

    this.props.orderIcon();
  }

  render() {
    console.log(this.props.icons);

    if (this.props.icons.isOrdered) {
        return <Redirect to="/payment/paypal" />;
    }

    return (
  <div>
    <Header />
    <div class="wrapper clearfix">
      {/*
      <div class="parent">
        <img class="image1" src={require('../img/hair.png')} />
        {this.state.eyes === 0 && (
          <img class="eyes" src={require('../img/eye0.png')} />
        )}
        {this.state.eyes === 1 && (
          <img class="eyes" src={require('../img/eye1.png')} />
        )}

        {this.state.mouth === 0 && (
          <img class="mouth" src={require('../img/mouth1.png')} />
        )}
        {this.state.mouth === 1 && (
          <img class="mouth" src={require('../img/mouth2.png')} />
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
            <img class="choosed" src={require('../img/mouth1.png')} onClick={() => this.switchMouth(0)} />
          )}
          {this.state.mouth ==! 0 && (
            <img class="choice" src={require('../img/mouth1.png')} onClick={() => this.switchMouth(0)} />
          )}
        </div>
        <div class="column">
          {this.state.mouth === 1 && (
            <img class="choosed" src={require('../img/mouth2.png')} onClick={() => this.switchMouth(1)} />
          )}
          {this.state.mouth ==! 1 && (
            <img class="choice" src={require('../img/mouth2.png')} onClick={() => this.switchMouth(1)} />
          )}
        </div>
      </div>
      */}
    </div>
    { /*<button class="form-send-btn btn" onClick={this.proceedCheckout}>Proceed to Checkout</button> */}
    <Footer />
  </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    icons: state.icons,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    orderIcon: () => {
      dispatch(icons.orderIcon());
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconMaker);
