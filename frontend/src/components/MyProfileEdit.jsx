import React, { Component } from 'react';
import {connect} from 'react-redux';

import '../css/style.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer';
import {profile, auth} from "../actions";

library.add(faIgloo)

class MyProfileEdit extends Component {
  componentDidMount() {
    this.props.fetchProfile(this.props.user.id);
  }

  state = {
    residence: null,
    style: null,
    work_process: null,
    employment_type: null,
    availability: null,
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
      this.props.profile[0].id, this.state.residence, this.state.style,
      this.state.work_process, this.state.employment_type,
      this.state.availability, this.state.payment_method,
      this.state.image
    ).then(this.resetForm);
  }

  handleChange = (propertyName, profile, event) => {
    profile[propertyName] = event.target.value;
    this.setState({
      residence: profile.residence, style: profile.style,
      work_process: profile.work_process, employment_type: profile.employment_type,
      availability: profile.availability, payment_method: profile.payment_method,
      isChanged: true
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
    const errors = this.state.errors;
    return (
  <div>
    <Header />

    <div class="menu">
      <a href="/how-it-works">How It Works</a>
      <a href="/about">About Us</a>
      <a href="/contact-us">Contact Us</a>
    </div>

    <div class="wrapper clearfix">

    <SideMenu />

      <div class="profile">
      <h2>My Profile</h2>
        <form onSubmit={this.submitProfile}>
          {errors.map(error => (
            <p class="error-heading" key={error}>Error: {error}</p>
          ))}
          {this.props.profile.map((profile) => (
            <div class="wrapper clearfix">
              <div class="profile-left">
                {this.state.image && (<img src={URL.createObjectURL(this.state.image)} />)}
                {!this.state.image && profile.image && (
                  <img src={require('../img/default.png')} />
                 )}
                {!this.state.image && !profile.image && (<img src={require('../img/default.png')} />)}

                <input class="picture-upload" type="file" id="image" accept="image/png, image/jpeg"  onChange={this.handleImageChange} />

              </div>

              <div class="profile-right">
                <p class="user-name"> {profile.user.last_name} {profile.user.first_name} </p>

                <p class="object">都市</p>
                <p class="user-data">Tokyo</p>
                <input placeholder="例：東京"　type="text" class="user-data" onChange={this.handleChange.bind(this, 'residence', profile)} value={profile.residence}/>
                <p class="object">イラストスタイル</p>
                <input placeholder="例：アニメ、実写風、ファッション" type="text" class="user-data" onChange={this.handleChange.bind(this, 'style', profile)} value={profile.style}/>
                <p class="object">作業の進め方</p>
                <input placeholder="例：ラフとカラーの後にそれぞれクライアントチェック" type="text" class="user-data" onChange={this.handleChange.bind(this, 'work_process', profile)} value={profile.work_process}/>
                <p class="object">活動形態</p>
                <input placeholder="例：フリーランス、副業" type="text" class="user-data" onChange={this.handleChange.bind(this, 'employment_type', profile)} value={profile.employment_type}/>
                <p class="object">週あたり稼働時間</p>
                <input placeholder="例：10時間" type="text" class="user-data" onChange={this.handleChange.bind(this, 'availability', profile)} value={profile.availability}/>
                <p class="object">可能入金方法</p>
                <input placeholder="例：銀行振り込み、PayPay、Paypal" type="text" class="user-data" onChange={this.handleChange.bind(this, 'payment_method', profile)} value={profile.payment_method}/>
              </div>
            </div>
          ))}
          <input class="btn savep" type="submit" value="Save Profile" />

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
    updateProfile: (id, residence, style, work_process, employment_type, availability, payment_method, img) => {
      return dispatch(
        profile.updateProfile(id, residence, style, work_process, employment_type, availability, payment_method, img)
      );
    },
    logout: () => dispatch(auth.logout()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyProfileEdit);
