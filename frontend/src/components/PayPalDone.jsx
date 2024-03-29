import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toSvg } from 'html-to-image';

import AWS from 'aws-sdk';

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
AWS.config.update({
  accessKeyId: keys.AWS_ACCESS_KEY_ID,
  secretAccessKey: keys.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-2'
});

class PayPalDone extends Component {
  componentWillMount() {

    var approved_order_id = localStorage.getItem('approved_order_id');

    if (approved_order_id) {
      this.props.fetchApprovedOrder(approved_order_id);
    }
    //this.props.fetchOrder("53a647c19b0b42dcb395b1bc0c943bb5");
  }

  downloadImage = (order_id) => {
      let bucket = keys.AWS_BUCKET;
      let s3 = new AWS.S3({ params: { Bucket: bucket }})
      let key = `icon_orders/my-iconio-${order_id}.png`
      let params = {Bucket: bucket, Key: key}
      s3.getObject(params, (err, data) => {
        if (err){
          console.log(err)
        }

        let blob=new Blob([data.Body], {type: data.ContentType});
        let link=document.createElement('a');
        link.href=window.URL.createObjectURL(blob);
        link.download='my-iconio.png';
        link.click();
      })
    }

  saveToPng = (e) => {
    e.preventDefault();
    var node = document.getElementById('my-iconio');

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


    //htmlToImage.toPng(document.getElementById('my-iconio'), { allowTaint : true, useCORS: true, useCorsEverywhereProxy: true, cache: false })
    htmlToImage.toPng(document.getElementById('my-iconio'), { cacheBust: true, fetchRequestInit: {cache: 'no-cache'} })
      .then(function (dataUrl) {
        //console.log(dataUrl);

        var link = document.createElement('a');
        link.style.cssText = 'position:absolute;top:0;left:0;width:500px;height:500px;padding:0;';
        link.crossOrigin = "anonymous";
        link.download = 'my-iconio.png';
        link.href = dataUrl;
        link.click();
    });


    /*
    htmlToImage.toCanvas(document.getElementById('my-iconio'))
      .then(function (canvas) {
        document.body.appendChild(canvas);
    });
    */

    /*
    htmlToImage.toPng(document.getElementById('my-iconio'))
      .then(function (dataUrl) {
        console.log(dataUrl);
        var img = new Image();
        img.height = 500;
        img.width = 500;
        img.src = dataUrl;
        document.body.appendChild(img);
        //download(dataUrl, 'my-iconio.png');
    });
    */
  }

  render() {
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
    */

    // This should be used once test is done
    // const artist_id = this.props.icons.order.artist.id;
    // const artist_id = "0707d4f7-cecf-480b-845e-11bbff0a45e0";

    return (
  <div>
  <Header />
  <div class="wrapper clearfix">

  <div class="download-screen">
    <h2 style={{textAlign: "left"}}>Iconio</h2>

    <div class="spacer"></div>
    {/*<button class="btn savep two-btn" onClick={this.saveToPng}> ダウンロード </button>*/}
    {this.props.icons.order && !this.props.icons.orderApproved && (
       <div class="parent">
          <p>
            ご注文のIconioの画像がうまく表示されない等の問題がありましたら、
            <a href="mailto:ohcheestudio@gmail.com">OhcheeStudio</a>までご連絡ください
          </p>
       </div>
    )}

    {this.props.icons.order && this.props.icons.orderApproved && (


  <div id="my-iconio-parent">
    <div id="my-made-iconio">
      <img
         src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icon_orders/my-iconio-${icon_state.id}.png`}
         width="500px"
         height="500px"
      />
      <button class="btn savep two-btn" onClick={this.downloadImage.bind(this, icon_state.id)}> ダウンロード </button>
      <p>
        ダウンロードできない、画像がうまく表示されない等の問題がありましたら、
        <a href="mailto:ohcheestudio@gmail.com">OhcheeStudio</a>までご連絡ください
      </p>

      {/*
      <Filters />
      {icon_state.face > 0 && (
        <img class="download-image1 imgFace"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/face${icon_state.face}.png`}
             style={{filter: `url(#filterSkinColor${icon_state.face_filter})`, WebkitFilter: `url(#filterSkinColor${icon_state.face_filter})`}}
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

      {icon_state.hair > 0 && (
        <img class="download-image1 imgHair"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/hair${icon_state.hair}.png`}
             style={{filter: `url(#filterHairColor${icon_state.hair_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.hair_filter})`}}
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

      {icon_state.bang > 0 && (
        <img class="download-image1 imgBang"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/bang${icon_state.bang}.png`}
             style={{filter: `url(#filterHairColor${icon_state.bang_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.bang_filter})`}}
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

      {icon_state.side > 0 && (
        <img class="download-image1 imgSide"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/side${icon_state.side}.png`}
             style={{filter: `url(#filterHairColor${icon_state.side_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.side_filter})`}}
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
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}

      {icon_state.eyebrows > 0 && (
        <img class="download-image1 imgEyebrows"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/eyebrows${icon_state.eyebrows}.png`}
             style={{filter: `url(#filterHairColor${icon_state.eyebrows_filter})`, WebkitFilter: `url(#filterHairColor${icon_state.eyebrows_filter})`}}
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


      {icon_state.nose > 0 && (
        <img class="download-image1 imgNose"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/nose${icon_state.nose}.png`}
        />
      )}

      {icon_state.mouth > 0 && (
        <img class="download-image1 imgMouth"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/mouth${icon_state.mouth}.png`}
             style={{filter: `url(#filterMouthColor${icon_state.mouth_filter})`, WebkitFilter: `url(#filterMouthColor${icon_state.mouth_filter})`}}
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


      {icon_state.cloth > 0 && (
        <img class="download-image1 imgCloth"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/cloth${icon_state.cloth}.png`}
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
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/cloth_line${icon_state.cloth}.png`}
             source={{
               header: {
                 'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
               }
             }}
        />
      )}

      {icon_state.accessories > 0 && (
        <img class="download-image1 imgAccessories"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${icon_state.artist.id}/${icon_state.iconio_version}/accessories${icon_state.accessories}.png`}
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
      */}
      </div>


    </div>
    ) }

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
    fetchApprovedOrder: (order_id) => {
      dispatch(icons.fetchApprovedOrder(order_id));
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayPalDone);
