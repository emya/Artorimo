import React, { Component } from 'react';
import {connect} from 'react-redux';

import {auth} from "../actions";
import Header from './Header';
import Footer from './Footer';

import '../css/style.scss';

class Test extends Component {

  render() {
    return (
      <div>

        <Footer />
      </div>
    )
  }
}

export default Test;
