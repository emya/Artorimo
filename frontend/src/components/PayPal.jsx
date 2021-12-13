import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import moment from 'moment';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast from "react-hot-toast";

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import Filters from './Filters';
import AdditionalItems from './AdditionalItems';

import {payment, icons, auth} from "../actions";

import { keys_prod } from '../keys_prod.js';
import { keys_stg } from '../keys.js';
//import '../css/style.scss';
import '../css/icons.scss';

var keys = keys_stg;
if (process.env.NODE_ENV === "production"){
    keys = keys_prod;
}


class PayPal extends Component {

  state = {
    //TODO: This is test id
    // order_id: "385b999abb7e4b929421f75584c40ceb",
    additional_items: null,
    prices: {
      0: 28,
      1: 21,
      2: 34,
      3: 8,
      4: 7,
    },
    item_names: {
      0: "Face Mask",
      1: "iPhone Case",
      2: "Tote Bag",
      3: "Sticker",
      4: "Post card"
    },
    isAgreed: false,
    agree_check_error: null,
    preprocessed_error: null,
  }

  handleAgreementCheck = (e) => {
    this.setState({
      isAgreed: e.target.checked
    })
  }

  onClickCheck = () => {
    const errors = [];

    if (!this.state.isAgreed) {
      errors.push("Please read and agree to the Terms");
      this.setState({agree_check_error: "Please read and agree to the Terms"})
    } else {
      this.setState({agree_check_error: null})
    }

    return errors;
  }
  /* TODO: Enable this when add item is on
  handleCallback = (childData) => {
    this.setState({additional_items: childData})
  }
  */

  // componentDidMount() {
  //   //this.props.getPaypal(this.props.icons.order.id);
  //   this.props.getPaypal("385b999abb7e4b929421f75584c40ceb");
  // }

  getOrderTable() {
    let content = [];

    if (this.state.additional_items) {
      for (const item of this.state.additional_items) {
        content.push(
          <tr>
            <td>{this.state.item_names[item]}</td>
            <td> $ {this.state.prices[item]}</td>
          </tr>
         )
      }
    }

    content.unshift(
        <tr>
          <td align="left"> アイコンダウンロード </td>
          <td align="right"> $ 5 </td>
        </tr>
    )

    return content;
  }

  getTotal() {
    let total = 5;

    if (this.state.additional_items) {
      for (const item of this.state.additional_items) {
        total += this.state.prices[item];
      }
    }
    return total;
  }

  onInitialPaypalClick = async(data, actions) => {
    var errors = this.onClickCheck();
    var isInvalid = errors.length > 0;
    if (isInvalid) {
      return actions.reject();
    }

    var order_id = this.props.icons.order.id;
    var body = JSON.stringify({
      order_id
    })

    let result = await fetch("/api/icons/generator/", {
      method: 'POST',
      body,
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(res) {
      if (res.status == 200){
      }

      if (res.status < 200 || res.status > 299) {
        return false;
      }

      return res.json();
    });

    if (result === false){
      this.setState({preprocessed_error: "Iconio準備がうまくいきませんでした。再度お試しください。"});
      return actions.reject();
    }
  }

  onApproveOrder = async(data, actions) => {
    //this.props.history.push("/iconio/payment/paypal/done");
    var order_id = this.props.icons.order.id;
    localStorage.setItem('approved_order_id', order_id)

    const details = await actions.order.capture();

    var paypal_order_id = details.id;
    var paypal_status = 1;
    var payer_email = details.payer.email_address;
    var body = JSON.stringify({
      paypal_order_id, paypal_status
    })

    return fetch(`/api/order/icon/${order_id}/`, {
      method: 'PATCH',
      body,
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(res) {
      if (res.status == 200){
        window.location.href = '/iconio/payment/paypal/done';
      }

      return res.json();
    }).then(function(data) {
      // If there is a validation error, reject, otherwise resolve
    });
  }


  render() {
    if (this.props.icons === null || this.props.icons.isOrdered == null || this.props.icons.order === null){
      var looking_artist_name = localStorage.getItem('looking_artist_name');
      if (looking_artist_name){
          return <Redirect to={`/iconio/${looking_artist_name}`} />;
      }

      return <Redirect to="/iconio/creators/top" />;
    }

    const icon_state = this.props.icons.order;

    // This is the test data
    // TODO: use the above icon_state

    /*
    const icon_state = {
        bang: 1,
        bang_filter: 5,
        cloth: 1,
        cloth_filter: 1,
        created_time: "2021-09-20T00:39:34.248804Z",
        eyebrows: 1,
        eyebrows_filter: 5,
        eyes: 1,
        eyes_filter: 1,
        face: 1,
        face_filter: 1,
        hair: 1,
        hair_filter: 5,
        mouth: 1,
        mouth_filter: 1,
        nose: 1,
        price: 8,
        side: 1,
        side_filter: 5,
    }

    //const artist_id = "0707d4f7-cecf-480b-845e-11bbff0a45e0";
    //const order_id = "0707d4f7-cecf-480b-845e-11bbff0a45e0";

    */

    // This should be used once test is done
    const artist_id = this.props.icons.order.artist.id;
    const version = this.props.icons.order.iconio_version;
    const order_id = this.props.icons.order.id;

    const agree_check_error = this.state.agree_check_error;
    const preprocessed_error = this.state.preprocessed_error;

    return (
  <div>
    <Header />

    <div class="icon-maker">
    <div class="wrapper-icon clearfix">
      <div class="iconio-uploader">
      <div class="iconio-container ">
      <h2>Iconio</h2>

      <div class="uploader-one clearfix paypal-icon">

      <div class="iconio-container-left">
    {/*<div class="wrapper clearfix">
        <div class="parent-precheckout">*/}
        <img class="image1 imgSample"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/sample.png`}
        />
        {icon_state.face > 0 && (
          <img class="image1 imgFace"
               style={{filter: `url(#filterSkinColor${icon_state.face_filter})`, WebkitFilter: `url(#filterSkinColor${icon_state.face_filter})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/face${icon_state.face}.png`}
          />
        )}
        {icon_state.face > 0 && (
          <img class="image1 imgFaceLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/face_line${icon_state.face}.png`}
          />
        )}

        {/* Hair */}
        {icon_state.hair > 0 && (
          <img class="image1 imgHair"
               style={{filter: `url(#filterHairColor${icon_state.hair_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.hair_filter})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/hair${icon_state.hair}.png`}
          />
        )}
        {icon_state.hair > 0 && (
          <img class="image1 imgHairLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/hair_line${icon_state.hair}.png`}
          />
        )}
        {icon_state.bang > 0 && (
          <img class="image1 imgBang"
               style={{filter: `url(#filterHairColor${icon_state.bang_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.bang_filter})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/bang${icon_state.bang}.png`}
          />
        )}
        {icon_state.bang > 0 && (
          <img class="image1 imgBangLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/bang_line${icon_state.bang}.png`}
          />
        )}
        {icon_state.side > 0 && (
          <img class="image1 imgSide"
               style={{filter: `url(#filterHairColor${icon_state.side_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.side_filter})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/side${icon_state.side}.png`}
          />
        )}
        {icon_state.side > 0 && (
          <img class="image1 imgSideLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/side_line${icon_state.side}.png`}
          />
        )}

        {/* Eyes */}
        {icon_state.eyes > 0 && (
          <img class="image1 imgEyes"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/eyes_line${icon_state.eyes}.png`}
          />
        )}
        {icon_state.eyes > 0 && (
          <img class="image1 imgEyeballs"
               style={{filter: `url(#filterEyesColor${icon_state.eyes_filter})`, WebkitFilter: `url(#filterEyesColor${icon_state.eyes_filter})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/eyes${icon_state.eyes}.png`}
          />
        )}

        {/* Eyebrow */}
        {icon_state.eyebrows > 0 && (
          <img class="image1 imgEyebrows"
               style={{filter: `url(#filterHairColor${icon_state.eyebrows_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.eyebrows_filter})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/eyebrows${icon_state.eyebrows}.png`}
          />
        )}
        {icon_state.eyebrows > 0 && (
          <img class="image1 imgEyebrowsLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/eyebrows_line${icon_state.eyebrows}.png`}
          />
        )}

        {/* Nose */}
        {icon_state.nose > 0 && (
          <img class="image1 imgNose"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/nose${icon_state.nose}.png`}
          />
        )}

        {/* Mouth */}
        {icon_state.mouth > 0 && (
          <img class="image1 imgMouth"
               style={{filter: `url(#filterMouthColor${icon_state.mouth_filter})`, WebkitFilter: `url(#filterMouthColor${icon_state.mouth_filter})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/mouth${icon_state.mouth}.png`}
          />
        )}
        {icon_state.mouth > 0 && (
          <img class="image1 imgMouthLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/mouth_line${icon_state.mouth}.png`}
          />
        )}

        {/* Cloth */}
        {icon_state.cloth > 0 && (
          <img class="image1 imgCloth"
               style={{filter: `url(#filterClothColor${icon_state.cloth_filter})`, WebkitFilter: `url(#filterClothColor${icon_state.cloth_filter})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/cloth${icon_state.cloth}.png`}
          />
        )}
        {icon_state.cloth > 0 && (
          <img class="image1 imgClothLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/cloth_line${icon_state.cloth}.png`}
          />
        )}

        <img class="image1 imgBackGround"
          src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/background.jpg`}
          style={{filter: `url(#filterClothColor${icon_state.background_filter})`, WebkitFilter: `url(#filterClothColor${icon_state.background_filter})`}}
          source={{
               header: {
                'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />

        {icon_state.accessories !== "" && icon_state.accessories.split(",").map(accessory =>
          <img class="image1 imgAccessories"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/accessories${accessory}.png`}
          />
        )}
      </div>

      {/*<div class="profile">*/}
      <div class="iconio-container-right">
        <div class="spacer-precheckout"></div>
        <h3>ご注文内容</h3>
        <div class="checkout">
          <table class="checkout-item">
          {this.getOrderTable()}
          </table>
          <div class="checkout-list-wrapper"><div class="checkout-list">小計:</div><div class="checkout-list-amt">${this.getTotal()}</div></div>
          <div class="checkout-list-wrapper"><div class="checkout-list">送料:</div><div class="checkout-list-amt">$0</div></div>
          <div class="checkout-list-wrapper"><div class="checkout-list total">合計:</div><div class="checkout-list-amt total-amt">${this.getTotal()}</div></div>
        </div>

        {/*<div dangerouslySetInnerHTML={{__html: this.props.payment.paypal_form}} />*/}

        <input type="checkbox" id="terms" checked={this.state.isAgreed} onChange={this.handleAgreementCheck} />
        <p class="agree"><a href="/user-guide" >利用規約</a>に同意します</p>

        {this.state.agree_check_error && (
          <p class="start-error" style={{color:"red"}}> {this.state.agree_check_error} </p>
        )}

        {this.state.preprocessed_error && (
          <p class="start-error" style={{color:"red"}}> {this.state.preprocessed_error} </p>
        )}

        <PayPalScriptProvider options={{ "client-id": keys.PAYPAL_CLIENT_ID, "currency": "USD", "disable-funding": "credit"}}>
            <PayPalButtons
                order_id={order_id}
                style={{ layout: "horizontal" }}
                onClick={(data, actions) => this.onInitialPaypalClick(data, actions)}
                /*
                onClick = {(data, actions) => {
                  var errors = this.onClickCheck();
                  var isInvalid = errors.length > 0;
                  if (isInvalid) {
                    return actions.reject();
                  }
                  var preprocessed = this.onPaypalClick();

                  preprocessed.then(function(result) {
                     // here you can use the result of promiseB
                     console.log(result)
                     if (result === false){
                       errors = "Something wrong";
                       console.log("Something wrong")
                       return actions.reject();
                     }
                  });

                  console.log(errors);

                }}
                */


                createOrder = {(data, actions) => {
                  // Set up the transaction
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: '5.0'
                      }
                    }]
                  })
                }}

                onApprove={(data, actions) => this.onApproveOrder(data, actions)}
                /*
                onClick = {(data, actions) => {
                  console.log("onClick");

                  console.log(data);
                  console.log(actions);
                  // You must return a promise from onClick to do async validation
                  var price = 5;
                  var body = JSON.stringify({
                    price
                  })
                  return fetch(`/api/order/icon/${this.state.order_id}/`, {
                    method: 'PATCH',
                    body,
                    headers: {
                      'content-type': 'application/json'
                    }
                  }).then(function(res) {
                    return res.json();
                  }).then(function(data) {
                    console.log("data", data);
                    // If there is a validation error, reject, otherwise resolve
                    if (data.validationError) {
                      document.querySelector('#error').classList.remove('hidden');
                      return actions.reject();
                    } else {
                      return actions.resolve();
                    }
                  });
                }}
                */

                /*
                onApprove={(data, actions) => {
                  console.log("onApprove");
                  console.log("Navigate to done", this.props);
                  console.log("data", data);
                  console.log("actions", actions);
                  //this.props.history.push("/iconio/payment/paypal/done");

                  const order = actions.order.capture();

                  //console.log(order, typeof(order));
                  //const details = order.value;

                  console.log(order, typeof(order))

                  var paypal_order_id = details.id;
                  var paypal_status = 1;
                  var payer_email = details.payer.email_address;
                  var body = JSON.stringify({
                    paypal_order_id, paypal_status
                  })
                  return fetch(`/api/order/icon/${order_id}/`, {
                    method: 'PATCH',
                    body,
                    headers: {
                      'content-type': 'application/json'
                    }
                  }).then(function(res) {
                    console.log("res", res);
                    if (res.status == 200){
                      window.location.href = '/iconio/payment/paypal/done';
                    }

                    return res.json();
                  }).then(function(data) {
                    console.log("data", data);
                    // If there is a validation error, reject, otherwise resolve
                  });

                }}
                */
            />
        </PayPalScriptProvider>




        {/* <AdditionalItems parentCallback = {this.handleCallback} /> */}
      </div>

      <div class="paypal-instruction">
        <h3>日本のクレジットカードのご使用方法</h3>
        <img
            src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/paypal1.png`}
            width="70%"
        />
        <img
            src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/paypal2.png`}
            width="70%"
        />
      </div>

    </div>
    </div>
    </div>
    </div>
    </div>
    <Filters />
    <Footer />
  </div>
  )}
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
    getPaypal: (order_id) => {
      dispatch(payment.getPaypal(order_id));
    },
    postCommunity: (message)  => {
      return dispatch(
        //community.postCommunity(message)
      );
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayPal);
