import React, { Component } from 'react';
import {connect} from 'react-redux';

import {auth} from "../actions";
import Header from './Header';
import Footer from './Footer';

import '../css/style.scss';

class Landing extends Component {

  render() {
    console.log(this.state);
    console.log(this.props);
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
      <p class="how-intro">国内外のスモールビジネス・個人の、クリエイターに対するニーズは年々増加。<br/><br/>Ohchee Studio（オウチスタジオ）は、フリーランスイラストレーターが<br/><span class="bold">好きなことを仕事に、グローバルに活躍する</span>ためのお手伝いをします。</p>
      <br/><br/><br/>

      <h2 class="heading-h">サービスの流れ</h2>
      <img class="lp-how" src={require('../img/howitworksnew.png')}/>
      <div class="how-container">
        <p class="how-1">国内・海外から仕事を受注</p>
        <p class="how-2">弊社が報酬交渉＆<br/>依頼内容確認。<br/>クライアントによる仮入金</p>
        <p class="how-3">クリエーターによる<br/>依頼物の作成・納品。<br/>修正依頼もサポート</p>
        <p class="how-4">クリエーターへ報酬を入金</p>
      </div>
      <div class="how-container-mobile">
      </div>
      <a class="button" href="/register" onClick="ga(‘send’, ‘event’, ‘link’, ‘click’,'register2'">無料会員登録</a>
    </section>


    <section class="service">
      <h2 class="heading s">サービス内容</h2>
      <div class="wrapper-service">
      <div class="service-box">
      <img class="service-icon" src={require('../img/earth.png')} />
      <div class="service-title">言語対応</div>
      <p class="service-text">海外のクライアントに対し、弊社の日英バイリンガルがクライアントのニーズを適切に理解・サポートします。</p>
      </div>
      <div class="service-box">
      <img class="service-icon" src={require('../img/meeting.png')} />
      <div class="service-title">依頼内容・報酬交渉</div>
      <p class="service-text">ケースバイケースである相場を把握し、個人間では行いづらい報酬交渉をクリエーターとクライアントの間に立って行います。</p>
      </div>
      <div class="service-box">
      <img class="service-icon" src={require('../img/group.png')} />
      <div class="service-title">コミュニティ提供</div>
      <p class="service-text">クリエイターによる絵のフィードバックや悩み相談まで、フリーランス同士が交流できる会員専用ページを用意しています。（coming soon!）</p>
      </div>
      <div class="service-box">
      <img class="service-icon" src={require('../img/card.png')} />
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
          <td>海外アパレルの販促キャンペーン用イラスト</td>
          <td>35,000円</td>
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
      <h3>依頼カテゴリー例</h3>
      <div class="popular-country">
        <div class="popular-country-example">
          <p class="country-name">SNSアイコン</p>
          <img src={require('../img/sns.png')}/>
        </div>
        <div class="popular-country-example">
          <p class="country-name">雑誌カット</p>
          <img src={require('../img/magazine.png')}/>
        </div>
        <div class="popular-country-example">
          <p class="country-name">ヘッダー</p>
          <img src={require('../img/header.png')}/>
        </div>
        <div class="popular-country-example">
          <p class="country-name">似顔絵</p>
          <img src={require('../img/portrait.png')}/>
        </div>
      </div>

      <a class="button" href="/register">無料会員登録</a>

    </section>
    <Footer />
  </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(auth.logout()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Landing);
