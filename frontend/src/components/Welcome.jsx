import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import Header from './Header';
import Footer from './Footer';
import {auth, contact} from "../actions";
import '../css/style.scss';

class Welcome extends Component {
state = {
    isGoodsChecked: false,
    errors: [],
  }

  handleGoodsAnswerChange = (e) => {
    const checked = e.target.checked;
    const name = e.target.value;
    if (checked) {
      this.setState({isGoodsChecked: name});
    }
  }

  notifyGoodsAnswer = () => {
    if (this.state.isGoodsChecked === "1"){
      this.props.askGoods();
    }
    return false;
  }

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
              <br/>そんな時は、<a href="mailto:ohcheestudio@gmail.com">ohcheestudio@gmail.com</a>までまずはご連絡ください！（ご相談は全て無料）</li>
              <li>1案件のみのご利用でももちろんOKです。</li>
            </ul>
          </li>
        </ol>
        <div class="shop-survey">
          <p><span class="bold">※海外向けグッズ販売にご興味はおありですか？</span></p>
            <div class="yesno">
              {this.state.isGoodsChecked === "1" ?
                (<input type="checkbox" class="yesnocheckbox" onChange={this.handleGoodsAnswerChange} value="1" checked />) :
                (<input type="checkbox" class="yesnocheckbox" onChange={this.handleGoodsAnswerChange} value="1" />)
              }
              <p class="yesno-yes">はい</p>
            </div>
            <div class="yesno">
              {this.state.isGoodsChecked === "0" ?
                (<input type="checkbox" class="yesnocheckbox" onChange={this.handleGoodsAnswerChange} value="0" checked />) :
                (<input type="checkbox" class="yesnocheckbox" onChange={this.handleGoodsAnswerChange} value="0" />)
              }
              <p class="yesno-yes">いいえ</p>
            </div>
        </div>
      </div>
      <a class="btn savep" href="/myportfolio/edit" onClick={this.notifyGoodsAnswer}>ポートフォリオページへ</a>
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
    isAuthenticated: state.auth.isAuthenticated,
    isActivated: state.auth.isActivated,
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

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
