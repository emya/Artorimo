import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import { Document, Page, pdfjs } from 'react-pdf';

import {auth} from "../actions";

import term from '../img/Privacy_Policy.pdf'

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
        <Document
          file={term}
          onLoadSuccess={this.onDocumentLoadSuccess}
          onLoadError={console.error}
        >
          {
            Array.from(
              new Array(numPages),
              (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                />
              ),
            )
          }

        </Document>
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
