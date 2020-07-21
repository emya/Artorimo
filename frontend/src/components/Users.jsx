import React, { Component } from 'react';
import {connect} from 'react-redux';

import {auth, artists} from "../actions";
import Header from './Header';
import Footer from './Footer';

import '../css/style.scss';
import { keys } from '../keys.js';

class Users extends Component {
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

        <div class="illustrator-list">
          {this.props.artists && this.props.artists.artists && (
            <p> The number of Users: {this.props.artists.length}</p>
          )}
          <ul>
          {this.props.artists && this.props.artists.artists && this.props.artists.artists.map((artist) => (
            <li>
              <div class="illustrator">
                {artist.image0 ? (
                 <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${artist.user.id}/${artist.image0}`} />
                  ) : (
                 <img src={require('../img/portrait.png')}/>
                )}
                <a class="illustrator-username" href={`/artists/portfolio/${artist.user.id}`}>
                {artist.profile.user_name ? (
                  <p> {artist.profile.user_name} </p>
                ) :(
                  <p> Artist </p>
                )}
                </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);
