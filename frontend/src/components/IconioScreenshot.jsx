import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toSvg } from 'html-to-image';

import html2canvas from 'html2canvas';

import download from 'downloadjs';

import {icons, auth} from "../actions";
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import Filters from './Filters';
import { keys_prod } from '../keys_prod.js';
import { keys_stg } from '../keys.js';
import '../css/icons.scss';

var keys = keys_stg;
if (process.env.NODE_ENV === "production"){
  keys = keys_prod;
}

class IconioScreenshot extends Component {
  componentDidMount() {
    this.props.fetchOrder(this.props.match.params.order_id);
  }

  render() {
    const icon_state = this.props.icons.order;

    return (

  <div>
  <Header />
  <div class="wrapper clearfix">
  <div class="download-screen">
    <h2>Thank You for Using Iconio!</h2>
    <div class="spacer"></div>
    {this.props.icons.order && (

    <div id="my-iconio-parent">
      <div id="my-iconio">
      <Filters />
      {icon_state.face > 0 && (
        <img class="download-image1 imgFace"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/face${icon_state.face}.png`}
             style={{filter: `url(#filterSkinColor${icon_state.face_filter})`, WebkitFilter: `url(#filterSkinColor${icon_state.face_filter})`}}
             crossorigin="anonymous"
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}
      {icon_state.face > 0 && (
        <img class="download-image1 imgFaceLine"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/face_line${icon_state.face}.png`}
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}

      {/* Hair */}
      {icon_state.hair > 0 && (
        <img class="download-image1 imgHair"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/hair${icon_state.hair}.png`}
             style={{filter: `url(#filterHairColor${icon_state.hair_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.hair_filter})`}}
             crossorigin="anonymous"
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}
      {icon_state.hair > 0 && (
        <img class="download-image1 imgHairLine"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/hair_line${icon_state.hair}.png`}
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}

      {/* Bang */}
      {icon_state.bang > 0 && (
        <img class="download-image1 imgBang"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/bang${icon_state.bang}.png`}
             style={{filter: `url(#filterHairColor${icon_state.bang_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.bang_filter})`}}
             crossorigin="anonymous"
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}
      {icon_state.bang > 0 && (
        <img class="download-image1 imgBangLine"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/bang_line${icon_state.bang}.png`}
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}

      {/* Side */}
      {icon_state.side > 0 && (
        <img class="download-image1 imgSide"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/side${icon_state.side}.png`}
             style={{filter: `url(#filterHairColor${icon_state.side_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.side_filter})`}}
             crossorigin="anonymous"
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}
      {icon_state.side > 0 && (
        <img class="download-image1 imgSideLine"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/side_line${icon_state.side}.png`}
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}


      {/* Eyes */}
      {icon_state.eyes > 0 && (
        <img class="download-image1 imgEyes"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/eyes_line${icon_state.eyes}.png`}
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}
      {icon_state.eyes > 0 && (
        <img class="download-image1 imgEyeballs"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/eyes${icon_state.eyes}.png`}
             style={{filter: `url(#filterEyesColor${icon_state.eyes_filter})`, WebkitFilter: `url(#filterEyesColor${icon_state.eyes_filter})`}}
             crossorigin="anonymous"
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}

      {/* Eyebrow */}
      {icon_state.eyebrows > 0 && (
        <img class="download-image1 imgEyebrows"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/eyebrows${icon_state.eyebrows}.png`}
             style={{filter: `url(#filterHairColor${icon_state.eyebrows_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.eyebrows_filter})`}}
             crossorigin="anonymous"
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}
      {icon_state.eyebrows > 0 && (
        <img class="download-image1 imgEyebrowsLine"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/eyebrows_line${icon_state.eyebrows}.png`}
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}


      {/* Nose */}
      {icon_state.nose > 0 && (
        <img class="download-image1 imgNose"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/nose${icon_state.nose}.png`}
        />
      )}

      {/* Mouth */}
      {icon_state.mouth > 0 && (
        <img class="download-image1 imgMouth"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/mouth${icon_state.mouth}.png`}
             style={{filter: `url(#filterMouthColor${icon_state.mouth_filter})`, WebkitFilter: `url(#filterMouthColor${icon_state.mouth_filter})`}}
             crossorigin="anonymous"
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}
      {icon_state.mouth > 0 && (
        <img class="download-image1 imgMouthLine"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/mouth_line${icon_state.mouth}.png`}
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}


      {/* Cloth */}
      {icon_state.cloth > 0 && (
        <img class="download-image1 imgCloth"
             src={`https://${keys.AWS_BUCKET}.s3.us-west-2.amazonaws.com/icons/${icon_state.artist.id}/cloth${icon_state.cloth}.png`}
             style={{filter: `url(#filterClothColor${icon_state.cloth_filter})`, WebkitFilter: `url(#filterClothColor${icon_state.cloth_filter})`}}
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}
      {icon_state.cloth > 0 && (
        <img class="download-image1 imgClothLine"
             src={`https://${keys.AWS_BUCKET}.s3.us-west-2.amazonaws.com/icons/${icon_state.artist.id}/cloth_line${icon_state.cloth}.png`}
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}

      {/* Accessories */}
      {icon_state.accessories > 0 && (
        <img class="download-image1 imgAccessories"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/accessories${icon_state.accessories}.png`}
             source={{
               header: {
                'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}

      <img class="download-image1 imgBackGround"
          src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/background.jpg`}
          source={{
               header: {
                'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
      />
      </div>
    </div>

   )}

    </div>
  </div>
  <Filters />
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
    fetchOrder: (order_id) => {
      dispatch(icons.fetchApprovedOrder(order_id));
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconioScreenshot);
