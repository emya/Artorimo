import React, { Component } from 'react';
import {connect} from 'react-redux';

import ReactDropzone from 'react-dropzone';

import {auth} from "../actions";
import Filters from './Filters';
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import AdditionalItems from './AdditionalItems'
import '../css/style.scss';


class Test extends Component {

  state = {
    data: null
  }

  handleCallback = (childData) =>{
    console.log("childData", childData)
    this.setState({data: childData})
  }

  render() {
    console.log(this.state);

    return (
  <div>
  <Header />
  <div class="wrapper clearfix">
    <div class="profile">
    </div>

    <AdditionalItems parentCallback = {this.handleCallback} />

  </div>
  <Footer />
  </div>
    )
  }
}

export default Test;
