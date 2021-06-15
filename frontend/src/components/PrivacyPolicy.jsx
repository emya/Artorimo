import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import { Document, Page, pdfjs } from 'react-pdf';

import {auth} from "../actions";

import { keys } from '../keys.js';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PrivacyPolicy extends Component {
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
        src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/Privacy_Policy.pdf`}
        style={{width: "100%", height: "800px"}}
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
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    };
}

export default connect(mapStateToProps, null)(PrivacyPolicy);
