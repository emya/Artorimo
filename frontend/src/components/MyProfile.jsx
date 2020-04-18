import React, { Component } from 'react';
import {connect} from 'react-redux';

import '../css/style.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import Footer from './Footer';

library.add(faIgloo)

class MyProfile extends Component {
  state = {
    bio: null,
    residence: null,
    residence_search: "",
    occupation: null,
    gender: null,
    image: null,
    isChanged: false,
    errors: []
  }

  resetForm = () => {
    //this.setState({bio: "", residence: "", occupation: "", gender: ""});
    this.setState({isChanged:false})
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

    /*
    this.props.updateProfile(
      this.props.profile[0].id, this.state.bio, this.state.residence,
      this.state.occupation, this.state.gender, this.state.image
    ).then(this.resetForm);
    */
  }

  handleChange = (propertyName, profile, event) => {
    profile[propertyName] = event.target.value;
    this.setState({
      bio: profile.bio, residence: profile.residence,
      occupation: profile.occupation, gender: profile.gender,
      isChanged: true
    });
  }

  handleResidenceChange(propertyName, profile, event) {
    profile[propertyName] = event.target.value;
    this.setState({
      residence_search: event.target.value, residence: event.target.value, isChanged: true
    })
  }

  handleSelectResidenceSuggest(profile, suggest) {
    profile["residence"] = suggest.formatted_address;
    this.setState({
      residence_search: "", residence: suggest.formatted_address, isChanged: true
    })
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

    <div class="wrapper clearfix">
      <div class="profile">
      <h2>My Profile</h2>
          <form onSubmit={this.submitProfile}>
            {errors.map(error => (
               <p class="error-heading" key={error}>Error: {error}</p>
            ))}
            <div class="wrapper clearfix">
              <div class="profile-left">
                <img src={require('../img/default.png')} />


                <input class="picture-upload" type="file" id="image" accept="image/png, image/jpeg"  onChange={this.handleImageChange} />

              </div>

              <div class="profile-right">
                <p class="user-name"> first_name last_name </p>

                <p class="object">居住地</p>
                <input type="text" class="user-data" />
                <p class="object">スタイル</p>
                <input type="text" class="user-data" />
                <p class="object">作業の進め方</p>
                <input type="text" class="user-data" />
                <p class="object">フリーランス・副業</p>
                <input type="text" class="user-data" />
                <p class="object">作業可能曜日・時間</p>
                <input type="text" class="user-data" />
                <p class="object">週あたり稼働時間</p>
                <input type="text" class="user-data" />
                <p class="object">可能入金方法</p>
                <input type="text" class="user-data" />
              </div>
            </div>

            <input class="btn savep" type="submit" value="Save Profile" />

          </form>
      </div>
    </div>

    <Footer />
  </div>

    )
  }
}

export default MyProfile;
