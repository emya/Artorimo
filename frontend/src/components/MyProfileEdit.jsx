import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import '../css/style.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer';
import {profile, auth} from "../actions";

import { keys } from '../keys.js';

library.add(faIgloo)

class MyProfileEdit extends Component {
  componentDidMount() {
    this.props.fetchProfile(this.props.user.id);
  }

  state = {
    user_name: null,
    residence: null,
    style: null,
    work_process: null,
    employment_type: null,
    availability: null,
    tools: null,
    skills: null,
    achievement: null,
    payment_method: null,
    image: null,
    isChanged: false,
    errors: []
  }

  resetForm = () => {
    this.setState({isChanged: false})
  }

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
      isChanged: true
    })
  }

  submitProfile = (e) => {
    e.preventDefault();

    const errors = this.validateForm(this.state.image);

    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    if (this.state.isChanged === false) {
      return;
    }

    this.props.updateProfile(
      this.props.profile.myprofile[0].id, this.state.user_name,
      this.state.residence, this.state.style, this.state.work_process,
      this.state.employment_type, this.state.availability,
      this.state.tools, this.state.skills, this.state.achievement,
      this.state.payment_method, this.state.image
    ).then(this.resetForm);
  }

  handleEmploymentChange = (profile, event) => {
    const checked = event.target.checked;
    const name = event.target.value;
    if (checked) {
      profile.employment_type = name;
      this.setState({employment_type: profile.employment_type, isChanged: true});
    }
  }

  handlePaymentChange = (profile, event) => {
    const checked = event.target.checked;
    const name = event.target.name;
    if (checked) {
      if (profile.payment_method.indexOf(name) === -1){
        profile.payment_method.push(name)
      }
    } else{
      var ind = profile.payment_method.indexOf(name);
      if (ind !== -1) {
        profile.payment_method.splice(ind, 1);
      }
    }
    this.setState({payment_method: profile.payment_method, isChanged: true});
  }

  handleStyleChange = (profile, event) => {
    const checked = event.target.checked;
    const name = event.target.name;
    if (checked) {
      if (profile.style.indexOf(name) === -1){
        profile.style.push(name)
      }
    } else{
      var ind = profile.style.indexOf(name);
      if (ind !== -1) {
        profile.style.splice(ind, 1);
      }
    }
    this.setState({style: profile.style, isChanged: true});
  }

  handleToolsChange = (profile, event) => {
    const checked = event.target.checked;
    const name = event.target.name;
    if (checked) {
      if (profile.tools.indexOf(name) === -1){
        profile.tools.push(name)
      }
    } else{
      var ind = profile.tools.indexOf(name);
      if (ind !== -1) {
        profile.tools.splice(ind, 1);
      }
    }
    this.setState({tools: profile.tools, isChanged: true});
  }

  handleChange = (propertyName, profile, event) => {
    profile[propertyName] = event.target.value;
    this.setState({
      [propertyName]: event.target.value, isChanged: true
    });
  }

  validateForm = (image) => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if (image && image.size > 3145728) {
      errors.push("Please Select an image smaller than 3 MB");
    }
    return errors;
  }

  render() {
    if (this.props.profile.isUpdated) {
      return <Redirect to="/myprofile" />;
    }
    const errors = this.state.errors;
    return (
  <div>
    <Header />

    <div class="wrapper clearfix">

    <SideMenu />

      <div class="profile">
      <h2>My Profile</h2>
        <form onSubmit={this.submitProfile}>
          {errors.map(error => (
            <p class="error-heading" key={error}>Error: {error}</p>
          ))}
          {this.props.profile.myprofile && this.props.profile.myprofile.map((profile) => (
            <div class="wrapper clearfix">
            <div class="profile-top">
              <div class="profile-left">

              <div class="trim-wrap">
                {this.state.image && (<img src={URL.createObjectURL(this.state.image)} />)}
                {!this.state.image && profile.image && (
                  <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/profiles/${profile.user.id}/${profile.image}`} />
                 )}
                {!this.state.image && !profile.image && (<img src={require('../img/default.png')} />)}
              </div>

                <input class="picture-upload" type="file" id="image" accept="image/png, image/jpeg"  onChange={this.handleImageChange} />

                <div class="profile-right-mobile">
                  <p class="user-name"> {profile.user.last_name} {profile.user.first_name} </p>
                  <p>Illustrator</p>
                </div>

              </div>

              <div class="profile-right">
                <p class="user-name"> {profile.user.last_name} {profile.user.first_name} </p>
                <p>Illustrator</p>
              </div>
            </div>

              <div class="profile-detail">
                <p class="object">アーティスト名<br/>（このお名前情報のみ、ポートフォリオ上で公開されます）</p>
                <input type="text" class="user-data" onChange={this.handleChange.bind(this, 'user_name', profile)} value={profile.user_name}/>
                <p class="object">都市</p>
                <input placeholder="例：東京"　type="text" class="user-data" onChange={this.handleChange.bind(this, 'residence', profile)} value={profile.residence}/>
                <p class="object">活動形態</p>
                <div class="checkbox-outline">
                  {profile.employment_type === 0 ? (
                    <input class="checkbox" type="radio" name="employment_type" value="0" onChange={this.handleEmploymentChange.bind(this, profile)} checked/>
                  ): (
                    <input class="checkbox" type="radio" name="employment_type" value="0" onChange={this.handleEmploymentChange.bind(this, profile)} />
                  )}
                  <label for="0">フリーランス／フルタイム</label><br/>

                  {profile.employment_type === 1 ? (
                    <input class="checkbox" type="radio" name="employment_type" value="1" onChange={this.handleEmploymentChange.bind(this, profile)} checked/>
                  ): (
                    <input class="checkbox" type="radio" name="employment_type" value="1" onChange={this.handleEmploymentChange.bind(this, profile)} />
                  )}
                  <label for="1">副業／パートタイム</label><br/>
                </div>

                <p class="object">イラストスタイル</p>
                <div class="checkbox-outline">
                  {profile.style.includes("0") ? (
                    <input type="checkbox" class="checkbox" name="0" onChange={this.handleStyleChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="0" onChange={this.handleStyleChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">キャラクター</p>

                  {profile.style.includes("1") ? (
                    <input type="checkbox" class="checkbox" name="1" onChange={this.handleStyleChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="1" onChange={this.handleStyleChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">ファッション</p>

                  {profile.style.includes("2") ? (
                    <input type="checkbox" class="checkbox" name="2" onChange={this.handleStyleChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="2" onChange={this.handleStyleChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">絵本系</p>

                  {profile.style.includes("3") ? (
                    <input type="checkbox" class="checkbox" name="3" onChange={this.handleStyleChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="3" onChange={this.handleStyleChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">リアル</p>

                  {profile.style.includes("4") ? (
                    <input type="checkbox" class="checkbox" name="4" onChange={this.handleStyleChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="4" onChange={this.handleStyleChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">コミック・漫画</p>

                  {profile.style.includes("5") ? (
                    <input type="checkbox" class="checkbox" name="5" onChange={this.handleStyleChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="5" onChange={this.handleStyleChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">ゲーム</p>

                  {profile.style.includes("6") ? (
                    <input type="checkbox" class="checkbox" name="6" onChange={this.handleStyleChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="6" onChange={this.handleStyleChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">ポップ</p>

                  {profile.style.includes("7") ? (
                    <input type="checkbox" class="checkbox" name="7" onChange={this.handleStyleChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="7" onChange={this.handleStyleChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">和風</p>

                  {profile.style.includes("8") ? (
                    <input type="checkbox" class="checkbox" name="8" onChange={this.handleStyleChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="8" onChange={this.handleStyleChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">水彩</p>

                  {profile.style.includes("9") ? (
                    <input type="checkbox" class="checkbox" name="9" onChange={this.handleStyleChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="9" onChange={this.handleStyleChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">墨絵</p>

                  {profile.style.includes("10") ? (
                    <input type="checkbox" class="checkbox" name="10" onChange={this.handleStyleChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="10" onChange={this.handleStyleChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">線画</p>

                  {profile.style.includes("11") ? (
                    <input type="checkbox" class="checkbox" name="11" onChange={this.handleStyleChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="11" onChange={this.handleStyleChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">アート</p>

                  {profile.style.includes("12") ? (
                    <input type="checkbox" class="checkbox" name="12" onChange={this.handleStyleChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="12" onChange={this.handleStyleChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">3D／CG</p>
                </div>
                <p class="object">稼働時間／週</p>
                <input placeholder="例：10" type="text" class="user-data" onChange={this.handleChange.bind(this, 'availability', profile)} value={profile.availability}/>
                <p class="object">作業の進め方</p>
                <input placeholder="例：ラフとカラーの後にそれぞれクライアントチェック" type="text" class="user-data" onChange={this.handleChange.bind(this, 'work_process', profile)} value={profile.work_process}/>
                <p class="object">経歴・仕事実績</p>
                <textarea class="user-data" onChange={this.handleChange.bind(this, 'achievement', profile)} value={profile.achievement}></textarea>
                <p class="object">使用ツール</p>
                <div class="checkbox-outline">
                  {profile.tools.includes("0") ? (
                    <input type="checkbox" class="checkbox" name="0" onChange={this.handleToolsChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="0" onChange={this.handleToolsChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">Adobe Illustrator</p>

                  {profile.tools.includes("1") ? (
                    <input type="checkbox" class="checkbox" name="1" onChange={this.handleToolsChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="1" onChange={this.handleToolsChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">Adobe Photoshop</p>

                  {profile.tools.includes("2") ? (
                    <input type="checkbox" class="checkbox" name="2" onChange={this.handleToolsChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="2" onChange={this.handleToolsChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">Adobe InDesign</p>

                  {profile.tools.includes("3") ? (
                    <input type="checkbox" class="checkbox" name="3" onChange={this.handleToolsChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="3" onChange={this.handleToolsChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">Clip Studio</p>
                </div>
                <p class="object">その他使用ツール・スキル</p>
                <input class="user-data" placeholder="例：キャラクターデザイン, アニメーション" onChange={this.handleChange.bind(this, 'skills', profile)} value={profile.skills}/>
                <p class="object">可能報酬入金方法</p>
                <div class="checkbox-outline">
                  {profile.payment_method.includes("0") ? (
                    <input type="checkbox" class="checkbox" name="0" onChange={this.handlePaymentChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="0" onChange={this.handlePaymentChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">LINE Pay</p>

                  {profile.payment_method.includes("1") ? (
                    <input type="checkbox" class="checkbox" name="1" onChange={this.handlePaymentChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="1" onChange={this.handlePaymentChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">PayPay</p>

                  {profile.payment_method.includes("2") ? (
                    <input type="checkbox" class="checkbox" name="2" onChange={this.handlePaymentChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="2" onChange={this.handlePaymentChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">Pay-easy</p>

                  {profile.payment_method.includes("3") ? (
                    <input type="checkbox" class="checkbox" name="3" onChange={this.handlePaymentChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="3" onChange={this.handlePaymentChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">Paypal</p>

                  {profile.payment_method.includes("4") ? (
                    <input type="checkbox" class="checkbox" name="4" onChange={this.handlePaymentChange.bind(this, profile)} checked/>
                  ) : (
                    <input type="checkbox" class="checkbox" name="4" onChange={this.handlePaymentChange.bind(this, profile)}/>
                  )}
                  <p class="checkbox-selection">銀行振り込み</p>
                </div>

              </div>
            </div>
          ))}
          <input class="btn savep two-btn" type="submit" value="変更を保存" />
          <a href="/myprofile" class="btn savep two-btn right-btn">戻る</a>

        </form>
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
    updateProfile: (
      id, user_name, residence, style, work_process, employment_type,
      availability, tools, skills, achievement, payment_method, img
      ) => {
      return dispatch(
        profile.updateProfile(
          id, user_name, residence, style, work_process, employment_type,
          availability, tools, skills, achievement, payment_method, img)
      );
    },
    logout: () => dispatch(auth.logout()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyProfileEdit);
