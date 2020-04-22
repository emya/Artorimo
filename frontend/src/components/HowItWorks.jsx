import React, { Component } from 'react';
import '../css/style.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import Header from './Header';
import Footer from './Footer';

library.add(faIgloo)

class HowItWorks extends Component {

  render() {
    return (
  <div>
    <Header />

    <div class="menu">
      <a href="/how-it-works">How It Works</a>
      <a href="/about">About Us</a>
      <a href="/contact-us">Contact Us</a>
    </div>

    <h2>How It Works</h2>

    <div class="page">

      <h3>サービスの流れ</h3>

      <ol>
        <li>クリエーター様が仕事を受注</li>
        <li>クライアントからのメールもしくはSNS上の依頼メッセージを弊社に転送</li>
        <li>弊社による依頼内容確認及び報酬の交渉</li>
        <li>クライアントより弊社へ仮入金</li>
        <li>クリエーター様の作業開始</li>
        <li>弊社を通してクライアントとの修正作業</li>
        <li>最終版を納品後、弊社からクリエーター様へ報酬の入金</li>
      </ol>


      <h3>サービス使用料</h3>
      <ul>
        <li>報酬の10%をエージェントフィーとして頂きます。</li>
        <li>クリエーター様には上記フィーを差し引いた上で報酬を入金いたします。</li>
        <li>クライアントが海外の場合（報酬が外貨）はクライアントが入金した際の為替レートを使用して最終入金額が計算されます。</li>
        <li>そのほか月額のプラットフォーム使用料は一切発生いたしません。</li>
      </ul>

      <h3>FAQ</h3>
      <ol>
        <li>クライアントが提示した報酬金額は確認できますか？
          <ul><li>全てのメール・コミュニケーションにクリエーター様をCCさせていただきます。</li></ul>
        </li>
        <li>クライアントの提示金額が希望に満たない場合、再交渉もしくは断ることは可能ですか？
          <ul><li>条件を全て日本語で整理した上で、依頼を受ける前にクリエーター様に確認いたします。その上で再交渉及び依頼を断ることも可能です。</li></ul>
        </li>
      </ol>




    </div>

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

export default HowItWorks;
