import React, { Component } from 'react';
import {connect} from 'react-redux';

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

  render() {
    return (
  <div>
    <Header />

    <div class="wrapper clearfix">
      <div class="sidemenu">
        <ul>
          <li><a href={'/artists'}>Search Artists</a></li>
        </ul>
      </div>

      {this.props.portfolio && this.props.portfolio.myportfolio && this.props.portfolio.myportfolio.map((portfolio) => (
        <div class="illustrator-list port placeholder">
          <h2>Portfolio</h2>


          <div class="profile-left">
            {portfolio.profile.image && (
                <img class="portfolio-pic" src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/profiles/${portfolio.profile.user.id}/${portfolio.profile.image}`} />
              )}
            {!portfolio.profile.image && (<img class="portfolio-pic" src={require('../img/default.png')} />)}
          </div>

          <div class="profile-right">
            {portfolio.profile.user_name && (<p class="user-name">{portfolio.profile.user_name}</p>)}
            <p>Illustrator</p>
          </div>


          <ul class="port-list">
            <li><div class="illustrator">
              {portfolio.image0 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image0}`} />
                  ) : (
                 <img src={require('../img/portrait.png')}/>
              )}
            </div></li>

            <li><div class="illustrator">
              {portfolio.image1 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image1}`} />
                  ) : (
                 <img src={require('../img/portrait.png')}/>
              )}
            </div></li>

            <li><div class="illustrator">
              {portfolio.image2 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image2}`} />
                  ) : (
                 <img src={require('../img/portrait.png')}/>
              )}
            </div></li>

            <li><div class="illustrator">
              {portfolio.image3 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image3}`} />
                  ) : (
                 <img src={require('../img/portrait.png')}/>
              )}
            </div></li>

            <li><div class="illustrator">
              {portfolio.image4 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image4}`} />
                  ) : (
                 <img src={require('../img/portrait.png')}/>
              )}
            </div></li>

            <li><div class="illustrator">
              {portfolio.image5 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image5}`} />
                  ) : (
                 <img src={require('../img/portrait.png')}/>
              )}
            </div></li>

            <li><div class="illustrator">
              {portfolio.image6 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image6}`} />
                  ) : (
                 <img src={require('../img/portrait.png')}/>
              )}
            </div></li>

            <li><div class="illustrator">
              {portfolio.image7 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image7}`} />
                  ) : (
                 <img src={require('../img/portrait.png')}/>
              )}
            </div></li>

            <li><div class="illustrator">
              {portfolio.image8 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image8}`} />
                  ) : (
                 <img src={require('../img/portrait.png')}/>
              )}
            </div></li>
          </ul>
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
