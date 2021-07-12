import React, { Component } from 'react';
import {connect} from 'react-redux';

import Lightbox from 'react-image-lightbox';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import {portfolio, auth} from "../actions";

import { keys } from '../keys.js';
import '../css/style.scss';

class Portfolio extends Component {

  componentDidMount() {
    this.props.fetchPortfolio(this.props.match.params.userId);
  }

  state = {
    isOpen: false,
    portfolio_number: 0
  }

  openLightbox = (portfolio_number) => {
    this.setState({
      isOpen: true,
      portfolio_number: portfolio_number
    })
  };

  render() {
    const pf = this.props.portfolio;
    let opened_image = "";

    if(pf.myportfolio) {
      opened_image = pf.myportfolio[0][`image${this.state.portfolio_number}`];
    }

    return (
  <div>
    {this.state.isOpen &&
      <Lightbox
        mainSrc={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${pf.myportfolio[0].user.id}/${opened_image}`}
        onCloseRequest={() => this.setState({ isOpen: false })}
      />
    }
    <Header />

    <div class="wrapper clearfix">
      <div class="sidemenu">
        <ul>
          <li><a href={'/artists'}>Search Artists</a></li>
        </ul>
      </div>

      {this.props.portfolio && this.props.portfolio.myportfolio && this.props.portfolio.myportfolio.map((portfolio) => (
      <div class="portfolio placeholder">
        <div class="port-list ">
          <h2>Portfolio</h2>

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
              {portfolio.image0 &&
                <img
                  class="cropped"
                  src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image0}`}
                  onClick={() => this.openLightbox(0)}
                />
              }
            </li>

            <li>
              {portfolio.image1 &&
                <img
                  class="cropped"
                  src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image1}`}
                  onClick={() => this.openLightbox(1)}
                />
              }
            </li>

            <li>
              {portfolio.image2 &&
                <img
                  class="cropped"
                  src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image2}`}
                  onClick={() => this.openLightbox(2)}
                />
              }
            </li>

            <li>
              {portfolio.image3 &&
                <img
                  class="cropped"
                  src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image3}`}
                  onClick={() => this.openLightbox(3)}
                />
              }
            </li>

            <li>
              {portfolio.image4 &&
                <img
                  class="cropped"
                  src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image4}`}
                  onClick={() => this.openLightbox(4)}
                />
              }
            </li>

            <li>
              {portfolio.image5 &&
                <img
                  class="cropped"
                  src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image5}`}
                  onClick={() => this.openLightbox(5)}
                />
              }
            </li>

            <li>
              {portfolio.image6 &&
                <img
                  class="cropped"
                  src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image6}`}
                  onClick={() => this.openLightbox(6)}
                />
              }
            </li>

            <li>
              {portfolio.image7 &&
                <img
                  class="cropped"
                  src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image7}`}
                  onClick={() => this.openLightbox(7)}
                />
              }
            </li>


          </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
