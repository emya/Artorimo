import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions";

import { keys_prod } from '../keys_prod.js';
import { keys_stg } from '../keys.js';

var keys = keys_stg;
if (process.env.NODE_ENV === "production"){
  keys = keys_prod;
}

class HowToUseIconio extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {

    const { pageNumber, numPages } = this.state;
    return (
    <div class="scroll-wrapper">
    <iframe
      src={`https://docs.google.com/viewer?url=https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/HowToUseIconio.pdf&embedded=true`}
      style={{width: "100%", height: "800px", webkitOverflowScrolling: "touch", overflowY: "scroll"}}
      source={{
        header: {
          'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
        }
      }}
    />
    </div>
    )
  }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return {field, message: state.auth.errors[field]};
        });
    }

    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    };
}

export default connect(mapStateToProps, null)(HowToUseIconio);
