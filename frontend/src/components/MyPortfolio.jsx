import React, { Component } from 'react';
import {connect} from 'react-redux';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import {portfolio, auth} from "../actions";

import { keys_prod } from '../keys_prod.js';
import { keys_stg } from '../keys.js';
import '../css/style.scss';

var keys = keys_stg;
if (process.env.NODE_ENV === "production"){
  keys = keys_prod;
}

class MyPortfolio extends Component {

  componentDidMount() {
    this.props.fetchPortfolio(this.props.user.id);
  }

  render() {

    return (
  <div>
    <Header />

    <div class="wrapper clearfix">
      <SideMenu />

      {this.props.portfolio && this.props.portfolio.myportfolio && this.props.portfolio.myportfolio.map((portfolio) => (
      <div class="portfolio placeholder">
        <div class="port-list ">
        <a class="button fixed-btn" href="/ask/help">仲介の相談</a>
        <a class="button fixed-btn-mobile" href="/ask/help">仲介の相談</a>
          <h2>My Portfolio</h2>

          <div class="profile-top">
            <div class="profile-left">
              <div class="trim-wrap">
                {portfolio.profile.image && (
                  <img class="portfolio-pic" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/profiles/${portfolio.profile.user.id}/${portfolio.profile.image}`} />
                )}
                {!portfolio.profile.image && (<img class="portfolio-pic" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/default.png`} />)}
              </div>

              <div class="profile-right-mobile">
                {portfolio.profile.user_name && (<p class="user-name">{portfolio.profile.user_name}</p>)}
                {!portfolio.profile.user_name && (<p>アーティスト名</p>)}
                <p>Illustrator</p>
                {portfolio.ig && (<a href={`https://www.instagram.com/${portfolio.ig}/`}><img class="ig" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/ig.png`} /></a>)}
                {portfolio.twitter && (<a href={`https://twitter.com/${portfolio.twitter}/`}><img class="ig" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/twitter.png`} /></a>)}
              </div>
            </div>

            <div class="profile-right">
              {portfolio.profile.user_name && (<p class="user-name">{portfolio.profile.user_name}</p>)}
              {!portfolio.profile.user_name && (<p>アーティスト名</p>)}
              <p>Illustrator</p>
              {portfolio.ig && (<a href={`https://www.instagram.com/${portfolio.ig}/`}><img class="ig" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/ig.png`} /></a>)}
              {portfolio.twitter && (<a href={`https://twitter.com/${portfolio.twitter}/`}><img class="ig" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/twitter.png`} /></a>)}
            </div>
          </div>

          <ul class="port-list">
            <li>
              {portfolio.image0 ? (
                 <img class="cropped" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image0}`} />
                  ) : (
                 <img class="cropped" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/default.png`} />
              )}
            </li>

            <li>
              {portfolio.image1 ? (
                 <img class="cropped" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image1}`} />
                  ) : (
                 <img class="cropped" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/default.png`} />
              )}
            </li>

            <li>
              {portfolio.image2 ? (
                 <img class="cropped" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image2}`} />
                  ) : (
                 <img class="cropped" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/default.png`} />
              )}
            </li>

            <li>
              {portfolio.image3 ? (
                 <img class="cropped" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image3}`} />
                  ) : (
                 <img class="cropped" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/default.png`} />
              )}
            </li>

            <li>
              {portfolio.image4 ? (
                 <img class="cropped" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image4}`} />
                  ) : (
                 <img class="cropped" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/default.png`} />
              )}
            </li>

            <li>
              {portfolio.image5 ? (
                 <img class="cropped" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image5}`} />
                  ) : (
                 <img class="cropped" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/default.png`} />
              )}
            </li>

            <li>
              {portfolio.image6 ? (
                 <img class="cropped" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image6}`} />
                  ) : (
                 <img class="cropped" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/default.png`} />
              )}
            </li>

            <li>
              {portfolio.image7 ? (
                 <img class="cropped" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image7}`} />
                  ) : (
                 <img class="cropped" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/default.png`} />
              )}
            </li>

          </ul>
          <a class="btn savep two-btn" href="/myprofile/edit">アーティスト名を編集</a>
          <a class="btn savep two-btn" href="/myportfolio/edit">ポートフォリオを編集</a><br/>
        </div>
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
    portfolio: state.portfolio,
    user: state.auth.user,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchPortfolio: (userId) => {
      dispatch(portfolio.fetchPortfolio(userId));
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPortfolio);
