import React, { Component } from 'react';
import {connect} from 'react-redux';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import {portfolio, auth} from "../actions";

import { keys } from '../keys.js';
import '../css/style.scss';

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
        <div class="illustrator-list port placeholder">
        <a class="button fixed-btn" href="/ask/help">仲介の相談</a>
          <h2>My Portfolio</h2>


          <div class="profile-top">
            <div class="profile-left">
            <div class="trim-wrap">
              {portfolio.profile.image && (
                  <img class="portfolio-pic" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/profiles/${portfolio.profile.user.id}/${portfolio.profile.image}`} />
                )}
              {!portfolio.profile.image && (<img class="portfolio-pic" src={require('../img/default.png')} />)}
            </div>
            </div>

            <div class="profile-right">
              {portfolio.profile.user_name && (<p class="user-name">{portfolio.profile.user_name}</p>)}
              {!portfolio.profile.user_name && (<p>アーティスト名</p>)}
              <p>Illustrator</p>
            </div>
          </div>


          <ul class="port-list">
            <li><div class="illustrator">
              {portfolio.image0 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image0}`} />
                  ) : (
                 <img src={require('../img/default.png')}/>
              )}
            </div></li>

            <li><div class="illustrator">
              {portfolio.image1 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image1}`} />
                  ) : (
                 <img src={require('../img/default.png')}/>
              )}
            </div></li>

            <li><div class="illustrator">
              {portfolio.image2 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image2}`} />
                  ) : (
                 <img src={require('../img/default.png')}/>
              )}
            </div></li>

            <li><div class="illustrator">
              {portfolio.image3 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image3}`} />
                  ) : (
                 <img src={require('../img/default.png')}/>
              )}
            </div></li>

            <li><div class="illustrator">
              {portfolio.image4 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image4}`} />
                  ) : (
                 <img src={require('../img/default.png')}/>
              )}
            </div></li>

            <li><div class="illustrator">
              {portfolio.image5 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image5}`} />
                  ) : (
                 <img src={require('../img/default.png')}/>
              )}
            </div></li>

            <li><div class="illustrator">
              {portfolio.image6 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image6}`} />
                  ) : (
                 <img src={require('../img/default.png')}/>
              )}
            </div></li>

            <li><div class="illustrator">
              {portfolio.image7 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image7}`} />
                  ) : (
                 <img src={require('../img/default.png')}/>
              )}
            </div></li>

            <li><div class="illustrator">
              {portfolio.image8 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image8}`} />
                  ) : (
                 <img src={require('../img/default.png')}/>
              )}
            </div></li>
          </ul>
          <a class="btn savep two-btn" href="/myprofile/edit">アーティスト名を編集</a>
          <a class="btn savep two-btn" href="/myportfolio/edit">ポートフォリオを編集</a><br/>
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
