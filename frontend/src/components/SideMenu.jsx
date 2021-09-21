import React, { Component } from 'react';
import {connect} from 'react-redux';
import {auth} from "../actions";

class SideMenu extends Component {
render() {
    return (
      <div class="sidemenu">
        <ul>
          <li><a href={'/ask/help'} class="contact-us-sidebar">仲介を相談する</a></li>
          <li><a href={'/myportfolio'}>ポートフォリオ</a></li>
          <li><a href={'/myprofile'}>プロフィール</a></li>
          <li><a href={'/iconio/uploader'}>Iconio アップローダー</a></li>
          <li><a href={'/community'}>コミュニティ</a></li>
          <li><a href={'/how-it-works'}>サービス</a></li>
          <li><a class="logout" onClick={this.props.logout}>ログアウト</a></li>
        </ul>
      </div>
  )}
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
