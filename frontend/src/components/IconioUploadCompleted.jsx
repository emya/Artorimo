import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import Header from './Header';
import Footer from './Footer';
import {auth, contact} from "../actions";
import '../css/style.scss';

class IconioUploadCompleted extends Component {
state = {
    errors: [],
  }

  render() {
    return (
  <div>
  <Header />
  <div class="wrapper clearfix">

    <div class="placeholder">
      <h2 class="thankyou">Iconio にご参加いただき<br/>ありがとうございます！</h2>

      <h3 class="next">NEXT STEP</h3>
      <div class="next-step">
        <ol>
          <li><span class="todo">Iconioスタッフがアップロードされたパーツを確認</span>
          </li>
          <li><span class="todo">弊社よりアイコンメーカー専用URLをメールでお知らせ</span>
            <ul>
              <li>URLをブログやSNSでファンの皆さんにシェアしてください♪</li>
            </ul>
          </li>
        </ol>
        <div class="shop-survey">
          <p><span class="bold"> Iconioへのフィードバックはございますか？</span></p>
            <div class="yesno">
              <p class="yesno-yes">今回のアップロードでわかりにくかった点やIconioについてのご意見等ございましたら、
              ぜひ<a href="mailto:ohcheestudio@gmail.com">ohcheestudio@gmail.com</a>までご連絡ください！</p>
            </div>
        </div>
      </div>
      <a class="btn savep" href="/myportfolio/"> マイページトップへ</a>
    </div>
  </div>
  <Footer />
  </div>
      )
    }

}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    });
  }
  return {
    errors,
    icons: state.icons,
    user: state.auth.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    askGoods: ()  => {
      return dispatch(
        contact.askGoods()
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IconioUploadCompleted);
