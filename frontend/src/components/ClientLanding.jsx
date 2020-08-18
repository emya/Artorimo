import React, { Component } from 'react';
import {connect} from 'react-redux';

import {auth, artists} from "../actions";
import Header from './Header';
import Footer from './Footer';

import '../css/style.scss';
import { keys } from '../keys.js';

class ClientLanding extends Component {
  state = {
    style: null,
    isChanged: false,
    errors: []
  }

  componentDidMount() {
    this.props.fetchArtists(null);
  }

  handleStyleChange = (event) => {
    const checked = event.target.checked;
    const name = event.target.name;
    const style = this.state.style;

    if (checked) {
      if (style === null) {
        this.setState({style: [name], isChanged: true});
      }
      else if (style.indexOf(name) === -1){
        style.push(name);
        this.setState({style: style, isChanged: true});
      }
    } else{
      var ind = style.indexOf(name);
      if (ind !== -1) {
        style.splice(ind, 1);
        this.setState({style: style, isChanged: true});
      }
    }
  }

  fetchArtists = () => {
    this.props.fetchArtists(this.state.style);
  }

  render() {
    return (
      <div>
        <Header />
        <header>
          <div class="catchcopy clearfix">
            <img class="lpimage englishlp" src={require('../img/lp-english.jpg')}/>
            <img class="lpimage-mobile englishlp" src={require('../img/lp-english.jpg')}/>
              <div class="catch-english">
                <h1 class="site-title2">Looking to work with a<span class="bold"> Japanese Illustrator</span>?<br/><br/>Ohchee Studio is here to help you <span class="bold">from initial search to delivering a finished piece.</span></h1>
                <a class="button" href="mailto:ohcheestudio@gmail.com"> Contact Us</a>
              </div>
          </div>
        </header>

        <div class="menu">
          <a href="/about">About Us</a>
          <a href="/contact-us">Contact Us</a>
        </div>

        <div class="lpbody">

          <div class="illustrator-sort">
            <div class="search-title">Illustration Style</div>
            <ul>
              <li><input type="checkbox" class="checkbox" name="0" onChange={this.handleStyleChange} />Character</li>
              <li><input type="checkbox" class="checkbox" name="1" onChange={this.handleStyleChange} />Fashion</li>
              <li><input type="checkbox" class="checkbox" name="2" onChange={this.handleStyleChange} />Picture Books</li>
              <li><input type="checkbox" class="checkbox" name="3" onChange={this.handleStyleChange} />Realistic</li>
              <li><input type="checkbox" class="checkbox" name="4" onChange={this.handleStyleChange} />Comic/Anime</li>
              <li><input type="checkbox" class="checkbox" name="5" onChange={this.handleStyleChange} />Games</li>
              <li><input type="checkbox" class="checkbox" name="6" onChange={this.handleStyleChange} />Pop</li>
              <li><input type="checkbox" class="checkbox" name="7" onChange={this.handleStyleChange} />Japanese</li>
              <li><input type="checkbox" class="checkbox" name="8" onChange={this.handleStyleChange} />Watercolor</li>
              <li><input type="checkbox" class="checkbox" name="9" onChange={this.handleStyleChange} />Sumie</li>
              <li><input type="checkbox" class="checkbox" name="10" onChange={this.handleStyleChange} />Line Drawing</li>
              <li><input type="checkbox" class="checkbox" name="11" onChange={this.handleStyleChange} />Arts</li>
              <li><input type="checkbox" class="checkbox" name="12" onChange={this.handleStyleChange} />3D</li>
            </ul>
            {/*
            <div class="search">
              <div class="search-title bottom">Free Search</div>
              <input type="text" class="searchbox" />
            </div>
            <div class="search">
              <div class="search-title bottom">Artist Name</div>
              <input type="text" class="searchbox" />
            </div>
            */}
            <button class="button searchbtn" onClick={this.fetchArtists}>Search</button>
          </div>

          {/*}
          <script src="https://snapwidget.com/js/snapwidget.js"></script>
          <link rel="stylesheet" href="https://snapwidget.com/stylesheets/snapwidget-lightbox.css" />
          <script src="https://snapwidget.com/js/snapwidget-lightbox.js"></script>
          <iframe
            src="https://snapwidget.com/embed/831134" class="snapwidget-widget"
            allowtransparency="true" frameborder="0" scrolling="no"
            style={{border:'none', overflow:'hidden',  width:'100%', height:'300px'}}>
          </iframe>
          */}

          <div class="illustrator-list">
            <ul>
            {this.props.artists && this.props.artists.artists && this.props.artists.artists.map((artist) => (
              <li>
                <div class="illustrator">
                  {artist.image0 && (
                   <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${artist.user.id}/${artist.image0}`} />
                  )}

                  {!artist.image0 && artist.profile.image && (
                   <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/profiles/${artist.user.id}/${artist.profile.image}`} />
                  )}

                  {(artist.image0 || artist.profile.image ) && artist.profile.user_name && (
                    <a class="illustrator-username" href={`/artists/portfolio/${artist.user.id}`}>
                      <p class="lp-artistname"> {artist.profile.user_name} </p>
                    </a>
                  )}

                  {(artist.image0 || artist.profile.image ) && !artist.profile.user_name && (
                    <a class="illustrator-username" href={`/artists/portfolio/${artist.user.id}`}>
                      <p class="lp-artistname"> Artist </p>
                    </a>
                  )}

                </div>
              </li>
            ))}
            {this.props.artists && this.props.artists.artists && this.props.artists.artists.length === 0 && (
              <div>
                No Artists Found
              </div>
            )}
            </ul>
          </div>
        </div>

    <Footer />
  </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    artists: state.artists,
    user: state.auth.user,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchArtists: (style) => {
      dispatch(artists.fetchArtists(style));
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientLanding);
