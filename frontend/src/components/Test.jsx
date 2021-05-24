import React, { Component } from 'react';
import {connect} from 'react-redux';

import ReactDropzone from 'react-dropzone';

import {auth} from "../actions";
import Filters from './Filters';
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import '../css/test.scss';
//import '../css/style.scss';

class Test extends Component {
  onDrop = (imageFiles) => {
    /*
    this.setState({
        imageFiles: imageFiles
    })
    */
    console.log(imageFiles);
  }

  render() {
    return (
  <div>
  <Header />
  <div class="wrapper clearfix">

  <img style={{filter: "url(#colorize)", WebkitFilter: "url(#colorize)"}} src="http://richard.parnaby-king.co.uk/basket.svg" />
  <img style={{filter: "url(#colorize1)", WebkitFilter: "url(#colorize1)"}} src="http://richard.parnaby-king.co.uk/basket.svg" />
  <img style={{filter: "url(#filterHairColor7)", WebkitFilter: "url(#filterHairColor7)"}} src="http://richard.parnaby-king.co.uk/basket.svg" />

  <Filters />
  <svg>
    <defs>
      <filter id="colorize" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 .145   0 0 0 0 .160   0 0 0 0 .129   0 0 0 1 0"/>
      </filter>
      <filter id="colorize1" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 .356   0 0 0 0 .121   0 0 0 0 .098   0 0 0 1 0"/>
      </filter>
    </defs>
  </svg>

  </div>
  <Footer />
  </div>
    )
  }
}

export default Test;
