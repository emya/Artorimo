import React, { Component } from 'react';
import {connect} from 'react-redux';

import {auth, profile} from "../actions";
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import '../css/style.scss';

class AdminUsers extends Component {
  componentDidMount() {
    this.props.fetchProfiles();
  }

  render() {
    return (
  <div>
    <Header />

    <div class="wrapper clearfix">

    {this.props.profile.profiles && (<p>The number of Users: {this.props.profile.profiles.length} </p>)}
    {this.props.profile.profiles && this.props.profile.profiles.map((profile) => (
      <div>
       <p> {profile.user.first_name} {profile.user.last_name} </p>
      </div>
    ))}
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
    fetchProfiles: () => {
      dispatch(profile.fetchProfiles());
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
