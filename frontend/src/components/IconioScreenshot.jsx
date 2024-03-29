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
  <div class="wrapper clearfix">
  <div class="download-screen">
    <div class="spacer"></div>
    {this.props.icons.order && (

    <div id="my-iconio-parent">
      <div id="my-iconio">
      <Filters />
      {icon_state.face > 0 && (
        <img class="download-image1 imgFace"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/face${icon_state.face}.png`}
             style={{filter: `url(#filterSkinColor${icon_state.face_filter})`, WebkitFilter: `url(#filterSkinColor${icon_state.face_filter})`}}
             crossOrigin="anonymous"
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}
      {icon_state.face > 0 && (
        <img class="download-image1 imgFaceLine"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/face_line${icon_state.face}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/hair${icon_state.hair}.png`}
             style={{filter: `url(#filterHairColor${icon_state.hair_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.hair_filter})`}}
             crossOrigin="anonymous"
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}
      {icon_state.hair > 0 && (
        <img class="download-image1 imgHairLine"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/hair_line${icon_state.hair}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/bang${icon_state.bang}.png`}
             style={{filter: `url(#filterHairColor${icon_state.bang_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.bang_filter})`}}
             crossOrigin="anonymous"
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}
      {icon_state.bang > 0 && (
        <img class="download-image1 imgBangLine"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/bang_line${icon_state.bang}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/side${icon_state.side}.png`}
             style={{filter: `url(#filterHairColor${icon_state.side_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.side_filter})`}}
             crossOrigin="anonymous"
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}
      {icon_state.side > 0 && (
        <img class="download-image1 imgSideLine"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/side_line${icon_state.side}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/eyes_line${icon_state.eyes}.png`}
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}
      {icon_state.eyes > 0 && (
        <img class="download-image1 imgEyeballs"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/eyes${icon_state.eyes}.png`}
             style={{filter: `url(#filterEyesColor${icon_state.eyes_filter})`, WebkitFilter: `url(#filterEyesColor${icon_state.eyes_filter})`}}
             crossOrigin="anonymous"
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/eyebrows${icon_state.eyebrows}.png`}
             style={{filter: `url(#filterHairColor${icon_state.eyebrows_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.eyebrows_filter})`}}
             crossOrigin="anonymous"
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}
      {icon_state.eyebrows > 0 && (
        <img class="download-image1 imgEyebrowsLine"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/eyebrows_line${icon_state.eyebrows}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/nose${icon_state.nose}.png`}
        />
      )}

      {/* Mouth */}
      {icon_state.mouth > 0 && (
        <img class="download-image1 imgMouth"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/mouth${icon_state.mouth}.png`}
             style={{filter: `url(#filterMouthColor${icon_state.mouth_filter})`, WebkitFilter: `url(#filterMouthColor${icon_state.mouth_filter})`}}
             crossOrigin="anonymous"
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}
      {icon_state.mouth > 0 && (
        <img class="download-image1 imgMouthLine"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/mouth_line${icon_state.mouth}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3.us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/cloth${icon_state.cloth}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3.us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/cloth_line${icon_state.cloth}.png`}
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}

      {/* Accessories */}
      {icon_state.accessories !== "" && icon_state.accessories.split(",").map(accessory =>
        <img class="download-image1 imgAccessories"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/accessories${accessory}.png`}
             source={{
               header: {
                'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}

      <img class="download-image1 imgBackGround"
          src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/background.jpg`}
          style={{filter: `url(#filterClothColor${icon_state.background_filter})`, WebkitFilter: `url(#filterClothColor${icon_state.background_filter})`}}
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
      dispatch(icons.fetchOrder(order_id));
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconioScreenshot);
