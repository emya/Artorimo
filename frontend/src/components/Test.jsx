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


class Test extends Component {

  state = {
    data: null
  }


  render() {
    console.log(this.state);

    return (
  <div>
  <Header />
  <header>
    <div class="catchcopy clearfix">


        <div class="catch-english">
          <h1 class="site-title2">イラストレーターのみなさん、<span class="bold">Iconio</span>でアイコンメーカーを作って安定収入を得ませんか？</h1>
          <p>Iconioは、「個人からアイコン作成の依頼が来るが、メールのやり取りも含め、手が回っていない」、<br/>「制作に時間がかかる割に単価が安い」といったアーティスト様からの声を反映して生まれました。</p>
          <a class="button" href="https://ohcheestudio.com/iconio/uploader"> 始める</a>
        </div>
    </div>
  </header>

  <div class="menu">
    <a href="/about">アイコンメーカーを作る</a>
    <a href="/about">使い方</a>
    <a href="/contact-us">お問い合わせ</a>
  </div>

  <div class="lpbody iconio-lp">
    <section class="iconio-description">
      <h2>Iconioのメリット</h2>
      <div class="wrapper-service">
        <div class="service-box">
        // <img money class="service-icon"/>
        <div class="service-title">安定収入</div>
        <p class="service-text">アイコンのダウンロード毎に売上が発生。一度アイコンメーカーを作れば半永久的な自動収入になります。投げ銭システムやプリントオプションも実装予定。</p>
        </div>
      </div>
      <div class="wrapper-service">
        <div class="service-box">
        // <img worldwide class="service-icon"/>
        <div class="service-title">海外での認知度向上</div>
        <p class="service-text">弊社が国内外へアイコンメーカーのマーケティングを行い、海外展開のお手伝いをします。月額使用料・初期費用無料です！</p>
        </div>
      </div>
      <div class="wrapper-service">
      <div class="service-box">
      // <img friends class="service-icon"/>
      <div class="service-title">ファンサービス</div>
      <p class="service-text">これまで時間が取れなかった方も、アイコンメーカーを通してより多くのファンの方に作品を楽しんでいただけます。</p>
      </div>
      </div>
      <a class="button" href="https://ohcheestudio.com/iconio/uploader"> 始める</a>
    </section>
    <section class="iconio-artist">
      <h2>Pickup! アーティスト</h2>
      (artist list exactly like client landing)
    </section>

  </div>
  <Footer />
  </div>
    )
  }
}

export default Test;
