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

    <div class="wrapper clearfix">
    <div class="page wrapper clearfix">

    <h2>How It Works</h2>
      <h3>サービスの流れ</h3>

      <p class="bold">イラストレーター様が直接お仕事を受注した場合</p>

      <ol>
        <li>[イラストレーター様] お仕事を受注</li>
        <li>[イラストレーター様] クライアントからのメールもしくは連絡先を<a href="mailto:ohcheestudio@gmail.com">弊社メールアドレス</a>に転送</li>
        <li>[弊社] 依頼内容確認及び報酬の交渉</li>
        <li>[弊社] クライアントから弊社へ報酬の仮入金</li>
        <li>[イラストレーター様] 作業開始</li>
        <li>[イラストレーター様] 弊社を通したクライアントとの修正作業</li>
        <li>[弊社] 最終版を納品後、弊社からイラストレーター様へ報酬の入金</li>
      </ol>
      <br/>
      <p class="bold">弊社がイラストレーター様にお仕事をご紹介した場合</p>
      <ol>
        <li>[弊社] イラストレーター様へ案件内容をご説明</li>
        <li>[弊社] 依頼内容確認及び報酬の交渉</li>
        <li>[弊社] クライアントから弊社へ報酬の仮入金</li>
        <li>[イラストレーター様] 作業開始</li>
        <li>[イラストレーター様] 弊社を通したクライアントとの修正作業</li>
        <li>[弊社] 最終版を納品後、弊社からイラストレーター様へ報酬の入金</li>
      </ol>
      <br/>
      <p>※<a href="https://ohcheestudio.com/register">ご登録</a>いただいた場合、全てのお仕事において弊社を通していただく必要はなく、海外のクライアントの場合のみ、等必要に応じてご利用いただけます。<br/>
      また、独占契約ではないため、他のアーティストグループとの併用も可能です。</p>


      <h3>サービス使用料</h3>
      <ul>
        <li>報酬の10%をエージェントフィーとして頂きます。</li>
        <li>イラストレーター様には上記フィーを差し引いた上で報酬を入金いたします。</li>
        <li>クライアントが海外の場合（報酬が外貨）はクライアントが入金した際の為替レートを使用して最終入金額が計算されます。</li>
        <li>そのほか月額のプラットフォーム使用料は一切発生いたしません。</li>
      </ul>

      <h3>FAQ／よくあるご質問</h3>
      <ol>
        <li>このサービスはイラストレーター限定ですか？
          <ul><li>当サービスはイラストレーター（デジタル納品）に特化しておりますが、その他デザイナーや油彩・水彩専門の方もどうぞお気軽にご登録・ご相談下さい。</li></ul>
        </li>
        <li>クライアントが提示した報酬金額は確認できますか？
          <ul><li>全てのメール・コミュニケーションにイラストレーター様をCCさせていただきます。</li></ul>
        </li>
        <li>クライアントの提示金額が希望に満たない場合、再交渉もしくは断ることは可能ですか？
          <ul><li>条件を全て日本語で整理した上で、依頼を受ける前にイラストレーター様に確認いたします。その上で再交渉及び依頼を断ることも可能です。</li></ul>
        </li>
        <li>海外のクライアントとの報酬のやり取りも代行していただけますか？
          <ul><li>はい、対国内クライアントと同様にスムーズなお仕事ができるよう、条件交渉から報酬の払い込みまでサポートしております。</li></ul>
        </li>
        <li>解約は可能ですか？
          <ul><li>十分なサポートが出来るよう努めさせていただきますが、万が一必要ないと感じた場合の退会はもちろん可能です。<a href="mailto:ohcheestudio@gmail.com">弊社メールアドレス</a>までご連絡ください。</li></ul>
        </li>
      </ol>




    </div>
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
