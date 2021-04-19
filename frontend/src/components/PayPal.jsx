import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import moment from 'moment';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import {payment, icons, auth} from "../actions";

import { keys } from '../keys.js';
import '../css/style.scss';

class PayPal extends Component {

  componentDidMount() {
    this.props.getPaypal();
  }

  render() {
    if (this.props.icons === null || this.props.icons.isOrdered === null){
        return <Redirect to="/iconmaker" />;
    }

    return (
  <div>
    <Header />

    <div class="wrapper clearfix">
      <SideMenu />
      <div class="profile">
        <h2>Checkout</h2>
        <h3>Your Order</h3>
        <div dangerouslySetInnerHTML={{__html: this.props.payment.paypal_form}} />

      </div>

    </div>
    <Footer />
  </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    payment: state.payment,
    icons: state.icons,
    user: state.auth.user,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    getPaypal: () => {
      dispatch(payment.getPaypal());
    },
    postCommunity: (message)  => {
      return dispatch(
        //community.postCommunity(message)
      );
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayPal);
