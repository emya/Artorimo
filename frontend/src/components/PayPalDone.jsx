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

import { keys } from '../keys.js';
import '../css/style.scss';

class PayPalDone extends Component {
  componentDidMount() {
    console.log("props", this.props)
    this.props.fetchOrder("53a647c19b0b42dcb395b1bc0c943bb5");
  }

  saveToPng = (e) => {
    e.preventDefault();
    var node = document.getElementById('my-node');

    console.log(node);

    /*
    html2canvas([document.getElementById('my-node')], {
      onrendered: function (canvas) {
          document.getElementById('canvas').appendChild(canvas);
          var data = canvas.toDataURL('image/png');
          // AJAX call to send `data` to a PHP file that creates an image from the dataURI string and saves it to a directory on the server

          var image = new Image();
          image.src = data;
          document.getElementById('image').appendChild(image);
      }
    });
    */

    htmlToImage.toPng(document.getElementById('my-node'))
      .then(function (dataUrl) {
        download(dataUrl, 'my-node.png');
    });
  }

  render() {

    console.log(this.props)
    const icon_state = this.props.icons.order;
    // This should be used once test is done
    //const artist_id = this.props.icons.order.artist.id;
    const artist_id = "d9d5c4f7-8977-4181-a94a-cc811c15b4be";

    console.log("icon_state", icon_state);

    return (
  <div>
  <Header />
  <div class="wrapper clearfix">
    <button onClick={this.saveToPng}> Download </button>

    {this.props.icons.order && this.props.icons.orderCompleted && (

    <div class="parent" id="my-node">
      {icon_state.hair > 0 && (
        <img class={`image1 imgFace filterSkinColor${icon_state.face_filter}`}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/face${icon_state.face}.png`}
        />
      )}

      // Hair
      {icon_state.hair > 0 && (
        <img class={`image1 imgHair filterHairColor${icon_state.hair_filter}`}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/hair${icon_state.hair}.png`}
        />
      )}
      {icon_state.bang > 0 && (
        <img class={`image1 imgBang filterHairColor${icon_state.bang_filter}`}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/bang${icon_state.bang}.png`}
        />
      )}
      {icon_state.side > 0 && (
        <img class={`image1 imgSide filterHairColor${icon_state.side_filter}`}
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
        <img class={`image1 imgEyeballs filterEyesColor${icon_state.eyes_filter}`}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/eyeballs${icon_state.eyes}.png`}
        />
      )}

      // Eyebrow
      {icon_state.eyebrows > 0 && (
        <img class={`image1 imgEyebrows filterHairColor${icon_state.eyebrows_filter}`}
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
        <img class={`image1 imgMouth filterMouthColor${icon_state.mouth_filter}`}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/mouth${icon_state.mouth}.png`}
        />
      )}

      // Cloth
      {icon_state.cloth > 0 && (
        <img
          class={`image1 imgCloth filterMouthColor${icon_state.cloth_filter}`}
          src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/cloth${icon_state.cloth}.png`}
        />
      )}

    </div>
    ) }


    <div id="image">
      <p>Image:</p>
    </div>
  </div>
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
      dispatch(icons.fetchOrder(order_id));
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayPalDone);
