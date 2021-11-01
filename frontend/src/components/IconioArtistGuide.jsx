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

class IconioArtistGuide extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    isAgreed: null,
    personal_use: true,
    commercial_use: null,
    noncommercial_use: null,
    retouch_use: null,
    agree_check_error: null,
  }

  handleAgreementCheck = (e) => {
    this.setState({
      isAgreed: e.target.checked
    })
  }

  handleUseCheck = (propertyName, e) => {
    this.setState({
      [propertyName]: e.target.checked
    })
  }

  iconUploadComplete = () => {
    if (!this.state.isAgreed) {
      this.setState({agree_check_error: "Please read and agree to the Terms"})
      return false;
    } else {
      this.setState({agree_check_error: null})
    }

    var use_range_ls = [];
    if (this.state.personal_use) {use_range_ls.push(0)}
    if (this.state.commercial_use) {use_range_ls.push(1)}
    if (this.state.noncommercial_use) {use_range_ls.push(2)}
    if (this.state.retouch_use) {use_range_ls.push(3)}

    var use_range = use_range_ls.join(",");
    this.props.completeIconUpload(this.props.user.id, use_range);
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {

    if (this.props.icons.uploadCompleted){
       return <Redirect to="/iconio/upload/completed" />;
    }

    if (this.props.icons.uploadCompleted === false){
       return <Redirect to="/iconio/upload/failed" />;
    }


    const { pageNumber, numPages } = this.state;
    return (
    <div class="policy-wrapper">
      <iframe
        src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/Iconio_User_Guide.pdf`}
        style={{width: "100%", height: "75vmin"}}
        class="policy-doc"
        source={{
          header: {
            'Access-Control-Allow-Origin': `${keys.Access_Control_Allow_Origin}`
          }
        }}
      />
      <div class="sign-area">
        <div>
          <input type="checkbox" id="terms" checked={this.state.isAgreed} onChange={this.handleAgreementCheck} />
          <p class="agree">利用規約に同意します</p>
        </div>
        <div class="use-wrapper">
          <p class="use-header">利用許可</p>
          <input type="checkbox" id="terms" checked={this.state.personal_use} onChange={this.handleUseCheck.bind(this, "personal_use")} />
          <p class="agree">個人 (推奨)</p>
          <input type="checkbox" id="terms" checked={this.state.commercial_use} onChange={this.handleUseCheck.bind(this, "commercial_use")} />
          <p class="agree">商用</p>
          <input type="checkbox" id="terms" checked={this.state.noncommercial_use} onChange={this.handleUseCheck.bind(this, "noncommercial_use")} />
          <p class="agree">非商用</p>
          <input type="checkbox" id="terms" checked={this.state.retouch_use} onChange={this.handleUseCheck.bind(this, "retouch_use")} />
          <p class="agree">加工</p>
        </div>
        {this.state.agree_check_error && (
            <p class="start-error" style={{color:"red"}}> {this.state.agree_check_error} </p>
        )}
        <button class="btn savep two-btn" onClick={this.iconUploadComplete}> 完了する </button>
      </div>
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
        icons: state.icons,
        user: state.auth.user
    };
}

const mapDispatchToProps = dispatch => {
  return {
    completeIconUpload: (artist_id, use_range) => {
      dispatch(icons.completeIconUpload(artist_id, use_range));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconioArtistGuide);
