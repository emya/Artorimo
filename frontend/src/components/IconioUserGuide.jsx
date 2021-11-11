import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import {icons, auth} from "../actions";

import { keys_prod } from '../keys_prod.js';
import { keys_stg } from '../keys.js';

var keys = keys_stg;
if (process.env.NODE_ENV === "production"){
  keys = keys_prod;
}

class IconioUserGuide extends Component {
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
      <iframe
        src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/Iconio_User_Guide.pdf`}
        style={{width: "100%", height: "800px", webkitOverflowScrolling: "touch", overflowY: "scroll"}}
        source={{
          header: {
            'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
          }
        }}
      />
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
        icons: state.icons,
        user: state.auth.user
    };
}

export default connect(mapStateToProps, null)(IconioUserGuide);
