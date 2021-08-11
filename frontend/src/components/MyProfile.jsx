import React, { Component } from 'react';
import {connect} from 'react-redux';

import '../css/style.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer';
import {profile, auth} from "../actions";

import { keys_prod } from '../keys_prod.js';
import { keys_stg } from '../keys.js';

var keys = keys_stg;
if (process.env.NODE_ENV === "production"){
  keys = keys_prod;
}


library.add(faIgloo)

class MyProfile extends Component {
  componentDidMount() {
    this.props.fetchProfile(this.props.user.id);
  }

  render() {
    return (
  <div>
    <Header />

    <div class="wrapper clearfix">

      <SideMenu />

      <div class="profile">
      <a class="button fixed-btn" href="/ask/help">仲介の相談</a>
      <a class="button fixed-btn-mobile" href="/ask/help">仲介の相談</a>
      <h2>My Profile</h2>
        {this.props.profile.myprofile && this.props.profile.myprofile.map((profile) => (
          <div class="wrapper clearfix">
          <div class="profile-top">
            <div class="profile-left profilepage">
              <div class="trim-wrap">
                {profile.image && (
                  <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/profiles/${profile.user.id}/${profile.image}`} />
                )}
                {!profile.image && (<img src={require('../img/default.png')} />)}
             </div>

             <div class="profile-right-mobile">
               <p class="user-name"> {profile.user_name} </p>
               <p>Illustrator</p>
             </div>


            </div>

            <div class="profile-right">
            <p class="user-name"> {profile.user_name} </p>
            <p>Illustrator</p>
            </div>
          </div>

            <div class="profile-detail">
              <p class="object">アーティスト名</p>
              <div class="checkbox-outline">
                <p> {profile.user_name} </p>
              </div>
              <p class="object">都市</p>
              <div class="checkbox-outline">
                <p> {profile.residence} </p>
              </div>
              <p class="object">活動形態</p>
              <div class="checkbox-outline">
                {profile.employment_type === 0 && (<p>フリーランス／フルタイム</p>)}
                {profile.employment_type === 1 && (<p>副業／パートタイム</p>)}
              </div>
              <p class="object">イラストスタイル</p>
              <div class="checkbox-outline">
                {profile.style.includes("0") && (<p class="checkbox-selection">キャラクター</p>)}
                {profile.style.includes("1") && (<p class="checkbox-selection">ファッション</p>)}
                {profile.style.includes("2") && (<p class="checkbox-selection">絵本系</p>)}
                {profile.style.includes("3") && (<p class="checkbox-selection">リアル</p>)}
                {profile.style.includes("4") && (<p class="checkbox-selection">コミック・漫画</p>)}
                {profile.style.includes("5") && (<p class="checkbox-selection">ゲーム</p>)}
                {profile.style.includes("6") && (<p class="checkbox-selection">ポップ</p>)}
                {profile.style.includes("7") && (<p class="checkbox-selection">和風</p>)}
                {profile.style.includes("8") && (<p class="checkbox-selection">水彩</p>)}
                {profile.style.includes("9") && (<p class="checkbox-selection">墨絵</p>)}
                {profile.style.includes("10") && (<p class="checkbox-selection">線画</p>)}
                {profile.style.includes("11") && (<p class="checkbox-selection">アート</p>)}
                {profile.style.includes("12") && (<p class="checkbox-selection">3D／CG</p>)}
              </div>
              <p class="object">稼働時間／週</p>
              <div class="checkbox-outline">
                <p class="user-data">{profile.availability}</p>
              </div>
              <p class="object">作業の進め方</p>
              <div class="checkbox-outline">
                <p class="user-data">{profile.work_process}</p>
              </div>
              <p class="object">経歴・仕事実績</p>
              <div class="checkbox-outline">
                <p class="user-data">{profile.achievement}</p>
              </div>
              <p class="object">使用ツール</p>
              <div class="checkbox-outline">
                {profile.tools.includes("0") && (<p class="checkbox-selection">Adobe Illustrator</p>)}
                {profile.tools.includes("1") && (<p class="checkbox-selection">Adobe Photoshop</p>)}
                {profile.tools.includes("2") && (<p class="checkbox-selection">Adobe InDesign</p>)}
                {profile.tools.includes("3") && (<p class="checkbox-selection">Clip Studio</p>)}
              </div>
              <p class="object">その他使用ツール・スキル</p>
              <div class="checkbox-outline">
                <p class="user-data">{profile.skills}</p>
              </div>
              <p class="object">可能報酬入金方法</p>
              <div class="checkbox-outline">
                {profile.payment_method.includes("0") && (<p class="checkbox-selection">LINE Pay</p>)}
                {profile.payment_method.includes("1") && (<p class="checkbox-selection">PayPay</p>)}
                {profile.payment_method.includes("2") && (<p class="checkbox-selection">Pay-easy</p>)}
                {profile.payment_method.includes("3") && (<p class="checkbox-selection">Paypal</p>)}
                {profile.payment_method.includes("4") && (<p class="checkbox-selection">銀行振り込み</p>)}
              </div>
              <p class="object">PayPalのアカウント (メールアドレスもしくはID)</p>
              <div class="checkbox-outline">
                <p class="user-data">{profile.paypal_account}</p>
              </div>

            </div>
          </div>
          ))}
          <a class="btn savep two-btn" href="/myprofile/edit">プロフィールを編集</a>
          <a class="btn savep two-btn" href="/myportfolio/edit">ポートフォリオを編集</a><br/>
      </div>
    </div>

    <Footer />
  </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    user: state.auth.user,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchProfile: (userId) => {
      dispatch(profile.fetchProfile(userId));
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
