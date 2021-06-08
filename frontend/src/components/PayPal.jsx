import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import moment from 'moment';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import Filters from './Filters';
import AdditionalItems from './AdditionalItems';

import {payment, icons, auth} from "../actions";

import { keys } from '../keys.js';
import '../css/style.scss';

class PayPal extends Component {

  state = {
    additional_items: null,
  }

  handleCallback = (childData) =>{
    this.setState({additional_items: childData})
  }

  componentDidMount() {
    this.props.getPaypal(this.props.icons.order.id);
  }

  render() {
    if (this.props.icons === null || this.props.icons.isOrdered == null || this.props.icons.order === null){
        return <Redirect to="/iconmaker/test" />;
    }

    const icon_state = this.props.icons.order;
    // This should be used once test is done
    //const artist_id = this.props.icons.order.artist.id;
    const artist_id = "d9d5c4f7-8977-4181-a94a-cc811c15b4be";

    return (
  <div>
    <Header />
    <Filters />

    <div class="wrapper clearfix">
        <div class="parent">
        {icon_state.face > 0 && (
          <img class="image1 imgFace"
               style={{filter: `url(#filterSkinColor${icon_state.face_filter})`, WebkitFilter: `url(#filterSkinColor${icon_state.face_filter})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/face${icon_state.face}.png`}
          />
        )}

        // Hair
        {icon_state.hair > 0 && (
          <img class="image1 imgHair"
               style={{filter: `url(#filterHairColor${icon_state.hair_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.hair_filter})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/hair${icon_state.hair}.png`}
          />
        )}
        {icon_state.bang > 0 && (
          <img class="image1 imgBang"
               style={{filter: `url(#filterHairColor${icon_state.bang_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.bang_filter})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/bang${icon_state.bang}.png`}
          />
        )}
        {icon_state.side > 0 && (
          <img class="image1 imgSide"
               style={{filter: `url(#filterHairColor${icon_state.side_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.side_filter})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/side${icon_state.side}.png`}
          />
        )}

        // Eyes
        {icon_state.eyes > 0 && (
          <img class="image1 imgEyes"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/eyes${icon_state.eyes}.png`}
          />
        )}
        {icon_state.eyes > 0 && (
          <img class="image1 imgEyeballs"
               style={{filter: `url(#filterEyesColor${icon_state.eyes_filter})`, WebkitFilter: `url(#filterEyesColor${icon_state.eyes_filter})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/eyeballs${icon_state.eyes}.png`}
          />
        )}

        // Eyebrow
        {icon_state.eyebrows > 0 && (
          <img class="image1 imgEyebrows"
               style={{filter: `url(#filterHairColor${icon_state.eyebrows_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.eyebrows_filter})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/eyebrows${icon_state.eyebrows}.png`}
          />
        )}

        // Nose
        {icon_state.nose > 0 && (
          <img class="image1 imgNose"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/nose${icon_state.nose}.png`}
          />
        )}

        // Mouth
        {icon_state.mouth > 0 && (
          <img class="image1 imgMouth"
               style={{filter: `url(#filterMouthColor${icon_state.mouth_filter})`, WebkitFilter: `url(#filterMouthColor${icon_state.mouth_filter})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/mouth${icon_state.mouth}.png`}
          />
        )}

        // Cloth
        {icon_state.cloth > 0 && (
          <img class="image1 imgCloth"
               style={{filter: `url(#filterClothColor${icon_state.cloth_filter})`, WebkitFilter: `url(#filterClothColor${icon_state.cloth_filter})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/cloth${icon_state.cloth}.png`}
          />
        )}
      </div>

      <div class="profile">
        <h2>Checkout</h2>
        <h3>Your Order</h3>
        <div dangerouslySetInnerHTML={{__html: this.props.payment.paypal_form}} />

        <AdditionalItems parentCallback = {this.handleCallback} />
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
