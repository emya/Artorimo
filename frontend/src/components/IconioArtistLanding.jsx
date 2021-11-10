import React, { Component } from 'react';
import {connect} from 'react-redux';

import ReactDropzone from 'react-dropzone';

import {auth} from "../actions";
import Filters from './Filters';
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import AdditionalItems from './AdditionalItems'
import '../css/style.scss';

import { keys_prod } from '../keys_prod.js';
import { keys_stg } from '../keys.js';

var keys = keys_stg;
if (process.env.NODE_ENV === "production"){
  keys = keys_prod;
}

class IconioArtistLanding extends Component {

  state = {
    data: null
  }


  render() {
    return (
  <div>
  <Header />
  <header>
        <div class="catch-iconio">
          <h1 class="catch-iconio-heading">イラストレーターのみなさん、<span class="bold">Iconio</span>で<br/>アイコンメーカーを作って安定収入を得ませんか？</h1>
          <p>「個人からアイコン作成の依頼が来るが、メールのやり取りも含め、<br/>手が回っていない」、「制作に時間がかかる割に単価が安い」<br/>といったアーティスト様からの声を反映して生まれたサービスです。</p>
          <a class="button" href="/register"> 始める</a>
        </div>
  </header>

  <div class="menu">
    <a href="/register">アイコンメーカーを作る</a>
    <a href="/iconio/creators/guide">使い方</a>
    <a href="/about">会社情報</a>
    <a href="/contact-us">お問い合わせ</a>
  </div>

  <div class="lpbody iconio-lp">
    <section class="iconio-description iconio-examples">
        <img class="icon-example-image" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/iconio-example1.jpg`} />
        <img class="icon-example-image" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/iconio-example2.jpg`} />
    </section>
    <section class="iconio-description">
      <h2>Iconioのメリット</h2>
      <div class="wrapper-merit">
        <div class="merit-box">
        <img class="service-icon" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/money.png`} />
        <div class="service-title">安定収入</div>
        <p class="service-text">アイコンのダウンロード毎に売上が発生。一度アイコンメーカーを作れば半永久的な自動収入になります。投げ銭システムやプリントオプションも実装予定。</p>
        </div>
      </div>
      <div class="wrapper-merit">
        <div class="merit-box">
        <img class="service-icon" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/worldwide.png`} />
        <div class="service-title">海外での認知度向上</div>
        <p class="service-text">弊社が国内外へアイコンメーカーのマーケティングを行い、海外展開のお手伝いをします。月額使用料・初期費用無料です！</p>
        </div>
      </div>
      <div class="wrapper-merit">
      <div class="merit-box">
        <img class="service-icon" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/friends.png`} />
      <div class="service-title">ファンサービス</div>
      <p class="service-text">これまで時間が取れなかった方も、アイコンメーカーを通してより多くのファンの方に作品を楽しんでいただけます。</p>
      </div>
      </div>
      <a class="button" href="/register"> 始める</a>
    </section>
    {/*<section class="iconio-artist">
      <h2>Pickup! アーティスト</h2>
      (artist list exactly like client landing)
    </section>*/}

  </div>
  <Footer />
  </div>
    )
  }
}

export default IconioArtistLanding;
