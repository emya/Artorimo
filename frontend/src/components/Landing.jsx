import React, { Component } from 'react';

import {auth} from "../actions";
import Header from './Header';
import Footer from './Footer';

import '../css/style.scss';

class Landing extends Component {

  render() {
    return (
  <div>
    <Header />
    <header class="header">
      <div class="catchcopy clearfix">
        <img class="lpimage" src={require('../img/newlp.jpg')}/>
        <img class="lpimage-mobile" src={require('../img/newlp.jpg')}/>
          <div class="catch2">
            <h1 class="site-title2">Be Creative.<br/>Draw Happily &<br/>Border-free.</h1>
          </div>
      </div>
    </header>

    <div class="menu">
      <a href="/how-it-works">How It Works</a>
      <a href="/about">About Us</a>
      <a href="/contact-us">Contact Us</a>
    </div>

    <section class="how">
      <p class="how-intro">スモールビジネス・個人のクリエイターに対するニーズは年々増加。<br/>[弊社]はフリーランスイラストレーターが<span class="bold">好きなことを仕事にする</span>お手伝いをします。</p>
      <h2 class="heading-h">サービスの流れ</h2>
      <img class="lp-how" src={require('../img/howitworksnew.png')}/>
      <div class="how-container">
        <p class="how-1">国内・海外から仕事を受注</p>
        <p class="how-2">[弊社]が報酬交渉＆<br/>依頼内容確認。<br/>クライアントによる仮入金</p>
        <p class="how-3">クリエーターによる<br/>依頼物の作成・納品。<br/>[弊社]が修正依頼もサポート</p>
        <p class="how-4">クリエーターへ報酬を入金</p>
      </div>
      <div class="how-container-mobile">
      <img class="lp-how-mobile" src={require('../img/how-mobile.png')}/>
      <div class="how-description">
        <p class="how-1">Requester requests item<br/> & pays</p>
        <p class="how-2">Traveler purchases item</p>
        <p class="how-3">Requester meets Traveler<br/> & receives item</p>
        <p class="how-4">Traveler gets paid!</p>
      </div>
      </div>
      <a class="button" href="/register" onClick="ga(‘send’, ‘event’, ‘link’, ‘click’,'register2'">無料会員登録</a>
    </section>


    <section class="service">
      <h2 class="heading s">サービス内容</h2>
      <div class="wrapper-service">
      <div class="service-box">
      <img class="service-icon" src={require('../img/shopping-cart.png')} />
      <div class="service-title">アートディレクション</div>
      <p class="service-text">対海外のクライアントでも、弊社の日英バイリンガルがクライアントのニーズを適切に理解・サポートします。</p>
      </div>
      <div class="service-box">
      <img class="service-icon" src={require('../img/globe.png')} />
      <div class="service-title">報酬交渉</div>
      <p class="service-text">ケースバイケースである相場を把握し、個人間ではやりづらい報酬交渉をクリエーターとクライアントの間に立って行います。</p>
      </div>
      <div class="service-box">
      <img class="service-icon" src={require('../img/traveler.png')} />
      <div class="service-title">コミュニティ</div>
      <p class="service-text">クリエイターによる絵のフィードバックや悩み相談まで、フリーランス同士が交流できる会員専用ページを用意しています。（coming soon!）</p>
      </div>
      <div class="service-box">
      <img class="service-icon" src={require('../img/pay.png')} />
      <div class="service-title">報酬の管理</div>
      <p class="service-text">クリエーターが作業する前にクライアントからの仮入金管理とその保管を行い、お金のトラブルを防ぎます。</p>
      </div>
      </div>
    </section>

    <section class="destination">
      <h2 class="heading s">過去のサポート例</h2>
      <table class="table-data">
        <tr class="table-heading-upcoming">
          <td>依頼内容</td>
          <td>報酬</td>
        </tr>
        <tr>
          <td>Youtubeのサムネイルイラスト</td>
          <td>9,000円</td>
        </tr>
        <tr>
          <td>Instagramアイコン作成</td>
          <td>5,000円</td>
        </tr>
        <tr>
          <td>ウェルカムボード作成</td>
          <td>15,000円</td>
        </tr>
      </table>
      <br/>
      <br/>
      <h3>主な依頼カテゴリー</h3>
      <div class="popular-country">
        <div class="popular-country-example">
          <p class="country-name">イラスト</p>
          <img src={require('../img/japan.png')}/>
        </div>
        <div class="popular-country-example">
          <p class="country-name">ロゴ作成</p>
          <img src={require('../img/italy.png')}/>
        </div>
        <div class="popular-country-example">
          <p class="country-name">キャラデザ</p>
          <img src={require('../img/uk.png')}/>
        </div>
        <div class="popular-country-example">
          <p class="country-name">似顔絵</p>
          <img src={require('../img/france.png')}/>
        </div>
      </div>

      <a class="button" href="/register">無料会員登録</a>

    </section>
    <Footer />
  </div>
    )
  }
}


export default Landing;
