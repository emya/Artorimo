import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import Header from './Header';
import Footer from './Footer';
import {auth, contact} from "../actions";
import '../css/style.scss';

class IconioUploadFailed extends Component {
state = {
    errors: [],
  }

  render() {
    return (
  <div>
  <Header />
  <div class="wrapper clearfix">

    <div class="placeholder">
      <h2 class="thankyou">Iconioへのアップロードができませんでした</h2>

      <h3 class="next"></h3>
      <div class="next-step">
        <ol>
          <li><span class="todo">パーツアップロードの完了作業は一日一回までとなっております。</span>
            <ul>
              <li>申し訳ございませんが、24時間後に再度完了ボタンを押してください。完了ボタンを押す前にアップロードされたパーツはそのまま保存されていますので、ご安心ください。
              </li>
              <li>時間をおいてもアップロード完了できない場合は<a href="mailto:ohcheestudio@gmail.com">ohcheestudio@gmail.com</a>までご連絡ください。
              </li>
            </ul>
          </li>
        </ol>
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

export default connect(mapStateToProps, mapDispatchToProps)(IconioUploadFailed);
