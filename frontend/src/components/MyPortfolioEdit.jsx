import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

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
    crop: {
      unit: "%",
      width: 30,
      aspect: 1 / 1
    },

    imageRef0: null,
    src0: null,
    crop0: {
      unit: "%",
      width: 30,
      aspect: 1 / 1
    },
    filename0: null,
    croppedImage0: null,

    imageRef1: null,
    src1: null,
    crop1: {
      unit: "%",
      width: 30,
      aspect: 1 / 1
    },
    filename1: null,
    croppedImage1: null,

    imageRef2: null,
    src2: null,
    crop2: {
      unit: "%",
      width: 30,
      aspect: 1 / 1
    },
    filename2: null,
    croppedImage2: null,

    imageRef3: null,
    src3: null,
    crop3: {
      unit: "%",
      width: 30,
      aspect: 1 / 1
    },
    filename3: null,
    croppedImage3: null,

    imageRef4: null,
    src4: null,
    crop4: {
      unit: "%",
      width: 30,
      aspect: 1 / 1
    },
    filename4: null,
    croppedImage4: null,

    imageRef5: null,
    src5: null,
    crop5: {
      unit: "%",
      width: 30,
      aspect: 1 / 1
    },
    filename5: null,
    croppedImage5: null,

    imageRef6: null,
    src6: null,
    crop6: {
      unit: "%",
      width: 30,
      aspect: 1 / 1
    },
    filename6: null,
    croppedImage6: null,

    imageRef7: null,
    src7: null,
    crop7: {
      unit: "%",
      width: 30,
      aspect: 1 / 1
    },
    filename7: null,
    croppedImage7: null,

    imageRef8: null,
    src8: null,
    crop8: {
      unit: "%",
      width: 30,
      aspect: 1 / 1
    },
    filename8: null,
    croppedImage8: null,

    isChanged: false,
    errors: []
  }

  onSelectFile = (src, filename, e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () =>
          this.setState({
            [src]: reader.result,
          }),
        false
      )
      reader.readAsDataURL(e.target.files[0])
      this.setState({
        [filename]: e.target.files[0].name,
        isChanged: true,
      })
    }
  }

  onImageLoaded = (imageRef, image) => {
    this.setState({
      [imageRef]: image
    })
    return false;
  }

  onCropComplete = (croppedImageName, imageRef, cropName, filename, crop) => {
    const croppedImageUrl = this.getCroppedImg(this.state[imageRef], crop, croppedImageName, cropName, filename)
  }

  onCropChange = (cropName, crop) => {
    this.setState({ crop })
    this.setState({ [cropName]: crop })
  }

  getCroppedImg(image, crop, croppedImageName, cropName, filename) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.ceil(crop.width*scaleX);
    canvas.height = Math.ceil(crop.height*scaleY);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY,
    )

    const reader = new FileReader()
    canvas.toBlob(blob => {
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
            this.dataURLtoFile(reader.result, `cropped_${this.state[filename]}_${cropName}.jpeg`, croppedImageName)
        }
    },
    'image/jpeg',1
    )
  }

  dataURLtoFile(dataurl, filename, croppedImageName) {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, {type:mime});
    this.setState({[croppedImageName]: croppedImage })
  }

  resetForm = () => {
    this.setState({isChanged: false})
  }

  validateImageForm = () => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if (
      (this.state.croppedImage0 && this.state.croppedImage0.size > 3145728) ||
      (this.state.croppedImage1 && this.state.croppedImage1.size > 3145728) ||
      (this.state.croppedImage2 && this.state.croppedImage2.size > 3145728) ||
      (this.state.croppedImage3 && this.state.croppedImage3.size > 3145728) ||
      (this.state.croppedImage4 && this.state.croppedImage4.size > 3145728) ||
      (this.state.croppedImage5 && this.state.croppedImage5.size > 3145728) ||
      (this.state.croppedImage6 && this.state.croppedImage6.size > 3145728) ||
      (this.state.croppedImage7 && this.state.croppedImage7.size > 3145728) ||
      (this.state.croppedImage8 && this.state.croppedImage8.size > 3145728)
    ){
      errors.push("Please Select an image smaller than 3 MB. 3MB以下の写真を選択してください。");
    }

    if (
      (this.state.croppedImage0 && this.state.croppedImage0.name.length > 198 ) ||
      (this.state.croppedImage1 && this.state.croppedImage1.name.length > 198 ) ||
      (this.state.croppedImage2 && this.state.croppedImage2.name.length > 198 ) ||
      (this.state.croppedImage3 && this.state.croppedImage3.name.length > 198 ) ||
      (this.state.croppedImage4 && this.state.croppedImage4.name.length > 198 ) ||
      (this.state.croppedImage5 && this.state.croppedImage5.name.length > 198 ) ||
      (this.state.croppedImage6 && this.state.croppedImage6.name.length > 198 ) ||
      (this.state.croppedImage7 && this.state.croppedImage7.name.length > 198 ) ||
      (this.state.croppedImage8 && this.state.croppedImage8.name.length > 198 )
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
      this.state.croppedImage0, this.state.croppedImage1, this.state.croppedImage2,
      this.state.croppedImage3, this.state.croppedImage4, this.state.croppedImage5,
      this.state.croppedImage6, this.state.croppedImage7, this.state.croppedImage8,
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
              <li>
                {this.state.src0 && (
                  <div>
                    <p class="trimming">※画像をトリミングしてから「変更を保存」を押してください</p>
                    <ReactCrop
                      src={this.state.src0}
                      crop={this.state.crop0}
                      onImageLoaded={this.onImageLoaded.bind(this, 'imageRef0')}
                      onComplete={this.onCropComplete.bind(this, 'croppedImage0', 'imageRef0', 'crop0', 'filename0')}
                      onChange={this.onCropChange.bind(this, 'crop0')}
                    />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src0', 'filename0')} />
                  </div>
                )}
                {!this.state.src0 && portfolio.image0 && (
                  <div class="illustrator">
                    <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image0}`} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src0', 'filename0')} />
                  </div>
                )}
                {!this.state.src0 && !portfolio.image0 && (
                  <div class="illustrator">
                    <img src={require('../img/default.png')} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src0', 'filename0')} />
                  </div>
                )}
              </li>

              <li>
                {this.state.src1 && (
                  <div>
                    <p class="trimming">※画像をトリミングしてから「変更を保存」を押してください</p>
                    <ReactCrop
                      src={this.state.src1}
                      crop={this.state.crop1}
                      onImageLoaded={this.onImageLoaded.bind(this, 'imageRef1')}
                      onComplete={this.onCropComplete.bind(this, 'croppedImage1', 'imageRef1', 'crop1', 'filename1')}
                      onChange={this.onCropChange.bind(this, 'crop1')}
                    />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src1', 'filename1')} />
                  </div>
                )}
                {!this.state.src1 && portfolio.image1 && (
                  <div class="illustrator">
                    <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image1}`} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src1', 'filename1')} />
                  </div>
                )}
                {!this.state.src1 && !portfolio.image1 && (
                  <div class="illustrator">
                    <img src={require('../img/default.png')} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src1', 'filename1')} />
                  </div>
                )}
              </li>

              <li>
                {this.state.src2 && (
                  <div>
                    <p class="trimming">※画像をトリミングしてから「変更を保存」を押してください</p>
                    <ReactCrop
                      src={this.state.src2}
                      crop={this.state.crop2}
                      onImageLoaded={this.onImageLoaded.bind(this, 'imageRef2')}
                      onComplete={this.onCropComplete.bind(this, 'croppedImage2', 'imageRef2', 'crop2', 'filename2')}
                      onChange={this.onCropChange.bind(this, 'crop2')}
                    />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src2', 'filename2')} />
                  </div>
                )}
                {!this.state.src2 && portfolio.image2 && (
                  <div class="illustrator">
                    <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image2}`} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src2', 'filename2')} />
                  </div>
                )}
                {!this.state.src2 && !portfolio.image2 && (
                  <div class="illustrator">
                    <img src={require('../img/default.png')} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src2', 'filename2')} />
                  </div>
                )}
              </li>

              <li>
                {this.state.src3 && (
                  <div>
                    <p class="trimming">※画像をトリミングしてから「変更を保存」を押してください</p>
                    <ReactCrop
                      src={this.state.src3}
                      crop={this.state.crop3}
                      onImageLoaded={this.onImageLoaded.bind(this, 'imageRef3')}
                      onComplete={this.onCropComplete.bind(this, 'croppedImage3', 'imageRef3', 'crop3', 'filename3')}
                      onChange={this.onCropChange.bind(this, 'crop3')}
                    />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src3', 'filename3')} />
                  </div>
                )}
                {!this.state.src3 && portfolio.image3 && (
                  <div class="illustrator">
                    <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image3}`} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src3', 'filename3')} />
                  </div>
                )}
                {!this.state.src3 && !portfolio.image3 && (
                  <div class="illustrator">
                    <img src={require('../img/default.png')} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src3', 'filename3')} />
                  </div>
                )}
              </li>

              <li>
                {this.state.src4 && (
                  <div>
                    <p class="trimming">※画像をトリミングしてから「変更を保存」を押してください</p>
                    <ReactCrop
                      src={this.state.src4}
                      crop={this.state.crop4}
                      onImageLoaded={this.onImageLoaded.bind(this, 'imageRef4')}
                      onComplete={this.onCropComplete.bind(this, 'croppedImage4', 'imageRef4', 'crop4', 'filename4')}
                      onChange={this.onCropChange.bind(this, 'crop4')}
                    />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src4', 'filename4')} />
                  </div>
                )}
                {!this.state.src4 && portfolio.image4 && (
                  <div class="illustrator">
                    <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image4}`} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src4', 'filename4')} />
                  </div>
                )}
                {!this.state.src4 && !portfolio.image4 && (
                  <div class="illustrator">
                    <img src={require('../img/default.png')} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src4', 'filename4')} />
                  </div>
                )}
              </li>

              <li>
                {this.state.src5 && (
                  <div>
                    <p class="trimming">※画像をトリミングしてから「変更を保存」を押してください</p>
                    <ReactCrop
                      src={this.state.src5}
                      crop={this.state.crop5}
                      onImageLoaded={this.onImageLoaded.bind(this, 'imageRef5')}
                      onComplete={this.onCropComplete.bind(this, 'croppedImage5', 'imageRef5', 'crop5', 'filename5')}
                      onChange={this.onCropChange.bind(this, 'crop5')}
                    />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src5', 'filename5')} />
                  </div>
                )}
                {!this.state.src5 && portfolio.image5 && (
                  <div class="illustrator">
                    <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image5}`} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src5', 'filename5')} />
                  </div>
                )}
                {!this.state.src5 && !portfolio.image5 && (
                  <div class="illustrator">
                    <img src={require('../img/default.png')} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src5', 'filename5')} />
                  </div>
                )}
              </li>

              <li>
                {this.state.src6 && (
                  <div>
                    <p class="trimming">※画像をトリミングしてから「変更を保存」を押してください</p>
                    <ReactCrop
                      src={this.state.src6}
                      crop={this.state.crop6}
                      onImageLoaded={this.onImageLoaded.bind(this, 'imageRef6')}
                      onComplete={this.onCropComplete.bind(this, 'croppedImage6', 'imageRef6', 'crop6', 'filename6')}
                      onChange={this.onCropChange.bind(this, 'crop6')}
                    />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src6', 'filename6')} />
                  </div>
                )}
                {!this.state.src6 && portfolio.image6 && (
                  <div class="illustrator">
                    <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image6}`} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src6', 'filename6')} />
                  </div>
                )}
                {!this.state.src6 && !portfolio.image6 && (
                  <div class="illustrator">
                    <img src={require('../img/default.png')} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src6', 'filename6')} />
                  </div>
                )}
              </li>

              <li>
                {this.state.src7 && (
                  <div>
                    <p class="trimming">※画像をトリミングしてから「変更を保存」を押してください</p>
                    <ReactCrop
                      src={this.state.src7}
                      crop={this.state.crop7}
                      onImageLoaded={this.onImageLoaded.bind(this, 'imageRef7')}
                      onComplete={this.onCropComplete.bind(this, 'croppedImage7', 'imageRef7', 'crop7', 'filename7')}
                      onChange={this.onCropChange.bind(this, 'crop7')}
                    />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src7', 'filename7')} />
                  </div>
                )}
                {!this.state.src7 && portfolio.image7 && (
                  <div class="illustrator">
                    <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image7}`} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src7', 'filename7')} />
                  </div>
                )}
                {!this.state.src7 && !portfolio.image7 && (
                  <div class="illustrator">
                    <img src={require('../img/default.png')} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src7', 'filename7')} />
                  </div>
                )}
              </li>

              <li>
                {this.state.src8 && (
                  <div>
                    <p class="trimming">※画像をトリミングしてから「変更を保存」を押してください</p>
                    <ReactCrop
                      src={this.state.src8}
                      crop={this.state.crop8}
                      onImageLoaded={this.onImageLoaded.bind(this, 'imageRef8')}
                      onComplete={this.onCropComplete.bind(this, 'croppedImage8', 'imageRef8', 'crop8', 'filename8')}
                      onChange={this.onCropChange.bind(this, 'crop8')}
                    />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src8', 'filename8')} />
                  </div>
                )}
                {!this.state.src8 && portfolio.image8 && (
                  <div class="illustrator">
                    <img src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/portfolios/${portfolio.profile.user.id}/${portfolio.image8}`} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src8', 'filename8')} />
                  </div>
                )}
                {!this.state.src8 && !portfolio.image8 && (
                  <div class="illustrator">
                    <img src={require('../img/default.png')} />
                    <input
                      class="picture-upload portfolio-upload" type="file" accept="image/png, image/jpeg"
                      onChange={this.onSelectFile.bind(this, 'src8', 'filename8')} />
                  </div>
                )}
              </li>

            </ul>
            <input class="btn savep two-btn" type="submit" value="変更を保存" />
            <button class="btn savep two-btn right-btn">戻る</button>
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
