import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toSvg } from 'html-to-image';

import html2canvas from 'html2canvas';

import download from 'downloadjs';

import AWS from 'aws-sdk';

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
    this.props.fetchOrder(this.props.match.params.token);
    //this.props.fetchOrder("53a647c19b0b42dcb395b1bc0c943bb5");
    //this.props.generateOrder("53a647c19b0b42dcb395b1bc0c943bb5");
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

    htmlToImage.toPng(document.getElementById('my-iconio'))
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.style.cssText = 'position:absolute;top:0;left:0;width:500px;height:500px;padding:0;';

        link.download = 'my-iconio.png';
        link.href = dataUrl;
        link.click();
    });

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

    // This should be used once test is done
    //const artist_id = this.props.icons.order.artist.id;
    const artist_id = "0707d4f7-cecf-480b-845e-11bbff0a45e0";
    */

    return (
  <div>
  <Header />
  <div class="wrapper clearfix">
  <div class="download-screen">
    <h2 style={{textAlign: "left"}}>Iconio</h2>

  {this.props.icons.order && (
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
      </div>
    </div>
  )}

  {!this.props.icons.order && (
    <div id="my-iconio-parent">
      <div id="my-iconio">
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
    fetchOrder: (token) => {
      dispatch(icons.fetchOrderForDownload(token));
    },
    generateOrder: (order_id) => {
      dispatch(icons.generateIconio(order_id));
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconioDownload);
