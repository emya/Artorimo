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

class IconioDownload extends Component {
  componentDidMount() {
    //this.props.fetchOrder(this.props.match.params.token);
    //this.props.fetchOrder("53a647c19b0b42dcb395b1bc0c943bb5");
  }

  saveToPng = (e) => {
    e.preventDefault();
    var node = document.getElementById('my-iconio');

    htmlToImage.toPng(document.getElementById('my-iconio'))
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.style.cssText = 'position:absolute;top:0;left:0;width:500px;height:500px;padding:0;';

        link.download = 'my-iconio.png';
        link.href = dataUrl;
        link.click();
    });

    /*
    htmlToImage.toPng(document.getElementById('my-iconio'))
      .then(function (dataUrl) {
        download(dataUrl, 'my-iconio.png');
    });
    */
  }

  render() {

    //const icon_state = this.props.icons.order;
    // This is the test data
    // TODO: use the above icon_state
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

    // This should be used once test is done
    //const artist_id = this.props.icons.order.artist.id;
    const artist_id = "0707d4f7-cecf-480b-845e-11bbff0a45e0";

    return (
  <div>
  <Header />
  <div class="wrapper clearfix">
  <div class="download-screen">
    <h2>Thank You for Using Iconio!</h2>
    <div class="spacer"></div>
    <button class="btn savep two-btn" onClick={this.saveToPng}> ダウンロード </button>

    {/*this.props && this.props.icons.isDownloadReady && ( */}
    {this.props && (

    <div class="download-parent" id="my-iconio">
      {icon_state.face > 0 && (
        <img class="download-image1 imgFace"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/face${icon_state.face}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/face_line${icon_state.face}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/hair${icon_state.hair}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/hair_line${icon_state.hair}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/bang${icon_state.bang}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/bang_line${icon_state.bang}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/side${icon_state.side}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/side_line${icon_state.side}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/eyes_line${icon_state.eyes}.png`}
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}
      {icon_state.eyes > 0 && (
        <img class="download-image1 imgEyeballs"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/eyes${icon_state.eyes}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/eyebrows${icon_state.eyebrows}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/eyebrows_line${icon_state.eyebrows}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/nose${icon_state.nose}.png`}
        />
      )}

      {/* Mouth */}
      {icon_state.mouth > 0 && (
        <img class="download-image1 imgMouth"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/mouth${icon_state.mouth}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/mouth_line${icon_state.mouth}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3.us-west-2.amazonaws.com/icons/${artist_id}/cloth${icon_state.cloth}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3.us-west-2.amazonaws.com/icons/${artist_id}/cloth_line${icon_state.cloth}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/accessories${icon_state.accessories}.png`}
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
    ) }


    <div id="image">
    </div>
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
    fetchOrder: (token) => {
      dispatch(icons.fetchOrderForDownload(token));
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconioDownload);
