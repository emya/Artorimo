import React, { Component } from 'react';
import {connect} from 'react-redux';

import {auth} from "../actions";
import Header from './Header';
import Footer from './Footer';

import '../css/style.scss';
import { keys } from '../keys.js';

class Landing extends Component {

  render() {
    return (
  <div>
    <Header />
    <header >
      <div class="catchcopy clearfix">
        <img class="lpimage" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/newlp.jpg`} />
        <img class="lpimage-mobile" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/newlp.jpg`} />
          <div class="catch2">
            <h1 class="site-title2">Be Creative.<br/>Draw Happily &<br/>Border-free.</h1>
          </div>
      </div>
    </header>

    <div class="menu">
      <a href="/how-it-works">サービス</a>
      <a href="/artists">アーティスト一覧</a>
      <a href="https://ohcheestudio.storenvy.com/">オンラインストア</a>
      <a href="/about">会社情報</a>
      <a href="/contact-us">お問い合わせ</a>
    </div>

    <section class="how">
      <p class="how-intro">国内外のスモールビジネス・個人の、クリエイターに対するニーズは年々増加。<br/><br/>Ohchee Studio（オウチスタジオ）は、フリーランスイラストレーターが<br/><span class="bold">好きなことを仕事に、グローバルに活躍する</span>ためのお手伝いをします。</p>
      <br/><br/><br/>

      <h2 class="heading-h">サービスの流れ</h2>
      <img class="lp-how" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/howitworksnew.png`} />
      <div class="how-container">
        <p class="how-1">国内・海外から仕事を受注</p>
        <p class="how-2">弊社が報酬交渉＆<br/>依頼内容確認。<br/>クライアントによる仮入金</p>
        <p class="how-3">クリエーターによる<br/>依頼物の作成・納品。<br/>修正依頼もサポート</p>
        <p class="how-4">クリエーターへ報酬を入金</p>
      </div>
      <div class="how-container-mobile">
        <img class="lp-how-mobile" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/how-mobile2.png`} />
        <div class="how-description">
          <p class="how-1">国内・海外から仕事を受注</p>
          <p class="how-2">弊社が報酬交渉＆<br/>依頼内容確認。<br/>クライアントによる仮入金</p>
          <p class="how-3">クリエーターによる<br/>依頼物の作成・納品。<br/>修正依頼もサポート</p>
          <p class="how-4">クリエーターへ報酬を入金</p>
        </div>
      </div>
      <a class="button" href="/register" onClick="ga(‘send’, ‘event’, ‘link’, ‘click’,'register2'">無料会員登録</a>
    </section>


    <section class="service">
      <h2 class="heading s">サービス内容</h2>
      <div class="wrapper-service">
      <div class="service-box">
      <img class="service-icon" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/earth.png`} />
      <div class="service-title">言語対応</div>
      <p class="service-text">海外のクライアントに対し、弊社の日英バイリンガルがクライアントのニーズを適切に理解・サポートします。</p>
      </div>
      <div class="service-box">
      <img class="service-icon" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/meeting.png`} />
      <div class="service-title">依頼内容・報酬交渉</div>
      <p class="service-text">ケースバイケースである相場を把握し、個人間では行いづらい報酬交渉をクリエーターとクライアントの間に立って行います。</p>
      </div>
      <div class="service-box">
      <img class="service-icon" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/group.png`} />
      <div class="service-title">コミュニティ提供</div>
      <p class="service-text">クリエイターによる絵のフィードバックや悩み相談まで、フリーランス同士が交流できる会員専用ページを用意しています。（coming soon!）</p>
      </div>
      <div class="service-box">
      <img class="service-icon" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/card.png`} />
      <div class="service-title">報酬の管理</div>
      <p class="service-text">クリエーターが作業する前にクライアントからの仮入金管理とその保管を行い、お金のトラブルを防ぎます。</p>
      </div>
      </div>
    </section>

    <section class="destination">
      <h2 class="heading s">直近のサポート例</h2>
      <table class="table-data">
        <tr class="table-heading-upcoming">
          <td>依頼内容</td>
          <td>報酬</td>
        </tr>
        <tr>
          <td>Instagramアイコン作成</td>
          <td>20,000円</td>
        </tr>
        <tr>
          <td>コスメパッケージ用イラスト</td>
          <td>50,000円</td>
        </tr>
        <tr>
          <td>海外音楽レーベルのジャケット</td>
          <td>55,000円</td>
        </tr>
        <tr>
          <td>アパレル用イラスト</td>
          <td>60,000円</td>
        </tr>
        <tr>
          <td>有名海外雑誌カット</td>
          <td>50,000円</td>
        </tr>
        <tr>
        <td>海外個展への出展</td>
        <td>N/A</td>
        </tr>
      </table>
      <br/>
      <br/>
      <h3>依頼カテゴリー例</h3>
      <div class="popular-country">
        <div class="popular-country-example">
          <p class="country-name">SNSアイコン</p>
          <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/sns.png`} />
        </div>
        <div class="popular-country-example">
          <p class="country-name">雑誌カット</p>
          <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/magazine.png`} />
        </div>
        <div class="popular-country-example">
          <p class="country-name">ヘッダー</p>
          <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/header.png`} />
        </div>
        <div class="popular-country-example">
          <p class="country-name">似顔絵</p>
          <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/portrait.png`} />
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
