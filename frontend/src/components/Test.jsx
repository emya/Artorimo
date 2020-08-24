import React, { Component } from 'react';
import {connect} from 'react-redux';

import {auth} from "../actions";
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import '../css/style.scss';

class Test extends Component {

  render() {
    return (
  <div>
  <Header />
  <div class="wrapper clearfix">

    <div class="placeholder">
      <h2 class="thankyou">ご登録ありがとうございます！</h2>

      <h3 class="next">NEXT STEP</h3>
      <div class="next-step">
        <ol>
          <li><span class="todo">ポートフォリオを登録する</span>
            <ul>
              <li><a href="/myportfolio">次のページ</a>で、お気に入りの作品をアップロードし、SNSアカウントを連携しましょう！<br/>
              海外クライアント用の検索ページに表示され、お仕事に繋がりやすくなります。</li>
            </ul>
          </li>
          <li><span class="todo">メールで仲介依頼をする</span>
            <ul>
              <li><span class="red">「海外クライアントからの仕事依頼が来たので対応して欲しい」「海外の企業やギャラリーに作品を売り込みたいので手伝って欲しい」</span>
              <br/>そんな時は、<a href="mailto: ohcheestudio@gmail.com">ohcheestudio@gmail.com</a>までまずはご連絡ください！（ご相談は全て無料）</li>
              <li>1案件のみのご利用でももちろんOKです。</li>
            </ul>
          </li>
        </ol>
        <div class="shop-survey">
          <p><span class="bold">※海外向けグッズ販売にご興味はおありですか？</span></p>
            <div class="yesno">
              <input type="checkbox" class="yesnocheckbox" />
              <p class="yesno-yes">はい</p>
            </div>
            <div class="yesno">
              <input type="checkbox" class="yesnocheckbox" />
              <p class="yesno-yes">いいえ</p>
            </div>
        </div>
      </div>
      <a class="btn savep" href="/myportfolio/edit">ポートフォリオページへ</a>
    </div>
  </div>
  <Footer />
  </div>
    )
  }
}

export default Test;
