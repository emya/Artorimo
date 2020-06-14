import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import {portfolio, auth} from "../actions";

import { keys } from '../keys.js';
import '../css/style.scss';

class MyPortfolioEdit extends Component {

  componentDidMount() {
    this.props.fetchPortfolio(this.props.user.id);
  }

  state = {
    image0: null,
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    image6: null,
    image7: null,
    image8: null,
    isChanged: false,
    errors: []
  }

  handleImageChange = (propertyName, e) => {
    this.setState({
      [propertyName]: e.target.files[0],
      isChanged: true
    })
  }

  resetForm = () => {
    this.setState({isChanged: false})
  }

  validateImageForm = () => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if (
      (this.state.image0 && this.state.image0.size > 3145728) ||
      (this.state.image1 && this.state.image1.size > 3145728) ||
      (this.state.image2 && this.state.image2.size > 3145728) ||
      (this.state.image3 && this.state.image3.size > 3145728) ||
      (this.state.image4 && this.state.image4.size > 3145728) ||
      (this.state.image5 && this.state.image5.size > 3145728) ||
      (this.state.image6 && this.state.image6.size > 3145728) ||
      (this.state.image7 && this.state.image7.size > 3145728) ||
      (this.state.image8 && this.state.image8.size > 3145728)
    ){
      errors.push("Please Select an image smaller than 3 MB. 3MB以下の写真を選択してください。");
    }

    if (
      (this.state.image0 && this.state.image0.name.length > 198 ) ||
      (this.state.image1 && this.state.image1.name.length > 198 ) ||
      (this.state.image2 && this.state.image2.name.length > 198 ) ||
      (this.state.image3 && this.state.image3.name.length > 198 ) ||
      (this.state.image4 && this.state.image4.name.length > 198 ) ||
      (this.state.image5 && this.state.image5.name.length > 198 ) ||
      (this.state.image6 && this.state.image6.name.length > 198 ) ||
      (this.state.image7 && this.state.image7.name.length > 198 ) ||
      (this.state.image8 && this.state.image8.name.length > 198 )
    ){
      errors.push("Image file name exceeds 200 characters. 写真のファイル名を２００文字以下にしてください。");
    }
    return errors;
  }

  submitPortfolio = (e) => {
    e.preventDefault();
    const errors = this.validateImageForm();

    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    if (this.state.isChanged === false) {
      return;
    }

    this.props.updatePortfolio(
      this.props.portfolio.myportfolio[0].id,
      this.state.image0, this.state.image1, this.state.image2,
      this.state.image3, this.state.image4, this.state.image5,
      this.state.image6, this.state.image7, this.state.image8,
    ).then(this.resetForm);
  }

  render() {
    if (this.props.portfolio.isUpdated) {
      return <Redirect to="/myportfolio" />;
    }

    const errors = this.state.errors;
    return (
  <div>
    <Header />

    <div class="wrapper clearfix">
      <SideMenu />

      {this.props.portfolio && this.props.portfolio.myportfolio && this.props.portfolio.myportfolio.map((portfolio) => (
        <div class="illustrator-list port placeholder">
          <h2>My Portfolio</h2>
          <p>お気に入りの作品を9枚アップロードしましょう！<br/>ポートフォリオはアーティストページで海外クライアント向けに紹介されます。</p>
          <form onSubmit={this.submitPortfolio}>
            {errors.map(error => (
              <p class="error-heading" key={error}>Error: {error}</p>
            ))}
            <ul class="port-list port-edit">
              <li><div class="illustrator">
                {this.state.image0 && (<img src={URL.createObjectURL(this.state.image0)} />)}
                {!this.state.image0 && portfolio.image0 && (
                  <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image0}`} />
                 )}
                {!this.state.image0 && !portfolio.image0 && (<img src={require('../img/portrait.png')} />)}

                <input class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg" onChange={this.handleImageChange.bind(this, 'image0')} />
              </div></li>

              <li><div class="illustrator">
                {this.state.image1 && (<img src={URL.createObjectURL(this.state.image1)} />)}
                {!this.state.image1 && portfolio.image1 && (
                  <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image1}`} />
                 )}
                {!this.state.image1 && !portfolio.image1 && (<img src={require('../img/portrait.png')} />)}

                <input class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg" onChange={this.handleImageChange.bind(this, 'image1')} />
              </div></li>

              <li><div class="illustrator">
                {this.state.image2 && (<img src={URL.createObjectURL(this.state.image2)} />)}
                {!this.state.image2 && portfolio.image2 && (
                  <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image2}`} />
                 )}
                {!this.state.image2 && !portfolio.image2 && (<img src={require('../img/portrait.png')} />)}

                <input class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg" onChange={this.handleImageChange.bind(this, 'image2')} />
              </div></li>

              <li><div class="illustrator">
                {this.state.image3 && (<img src={URL.createObjectURL(this.state.image3)} />)}
                {!this.state.image3 && portfolio.image3 && (
                  <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image3}`} />
                 )}
                {!this.state.image3 && !portfolio.image3 && (<img src={require('../img/portrait.png')} />)}

                <input class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg" onChange={this.handleImageChange.bind(this, 'image3')} />
              </div></li>

              <li><div class="illustrator">
                {this.state.image4 && (<img src={URL.createObjectURL(this.state.image4)} />)}
                {!this.state.image4 && portfolio.image4 && (
                  <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image4}`} />
                 )}
                {!this.state.image4 && !portfolio.image4 && (<img src={require('../img/portrait.png')} />)}

                <input class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg" onChange={this.handleImageChange.bind(this, 'image4')} />
              </div></li>

              <li><div class="illustrator">
                {this.state.image5 && (<img src={URL.createObjectURL(this.state.image5)} />)}
                {!this.state.image5 && portfolio.image5 && (
                  <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image5}`} />
                 )}
                {!this.state.image5 && !portfolio.image5 && (<img src={require('../img/portrait.png')} />)}

                <input class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg" onChange={this.handleImageChange.bind(this, 'image5')} />
              </div></li>

              <li><div class="illustrator">
                {this.state.image6 && (<img src={URL.createObjectURL(this.state.image6)} />)}
                {!this.state.image6 && portfolio.image6 && (
                  <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image6}`} />
                 )}
                {!this.state.image6 && !portfolio.image6 && (<img src={require('../img/portrait.png')} />)}

                <input class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg" onChange={this.handleImageChange.bind(this, 'image6')} />
              </div></li>

              <li><div class="illustrator">
                {this.state.image7 && (<img src={URL.createObjectURL(this.state.image7)} />)}
                {!this.state.image7 && portfolio.image7 && (
                  <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image7}`} />
                 )}
                {!this.state.image7 && !portfolio.image7 && (<img src={require('../img/portrait.png')} />)}

                <input class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg" onChange={this.handleImageChange.bind(this, 'image7')} />
              </div></li>

              <li><div class="illustrator">
                {this.state.image8 && (<img src={URL.createObjectURL(this.state.image8)} />)}
                {!this.state.image8 && portfolio.image8 && (
                  <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image8}`} />
                 )}
                {!this.state.image8 && !portfolio.image8 && (<img src={require('../img/portrait.png')} />)}

                <input class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg" onChange={this.handleImageChange.bind(this, 'image8')} />
              </div></li>
            </ul>
            <input class="btn savep" type="submit" value="変更を保存" />
          </form>
        </div>
      ))}
    </div>
    <Footer />
  </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    portfolio: state.portfolio,
    user: state.auth.user,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchPortfolio: (userId) => {
      dispatch(portfolio.fetchPortfolio(userId));
    },
    updatePortfolio: (
      id, img0, img1, img2, img3, img4, img5, img6, img7, img8
      ) => {
      return dispatch(
        portfolio.updatePortfolio(
          id, img0, img1, img2, img3, img4, img5, img6, img7, img8
        )
      );
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPortfolioEdit);
