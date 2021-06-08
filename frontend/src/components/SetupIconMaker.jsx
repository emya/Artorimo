import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import Dropzone from 'react-dropzone';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import Filters from './Filters';

import {icons, auth} from "../actions";

import { keys } from '../keys.js';
import '../css/icons.scss';
import '../css/filters.scss';

class SetupIconMaker extends Component {

  componentDidMount() {
    //this.props.fetchIconParts("d9d5c4f7-8977-4181-a94a-cc811c15b4be");
    this.props.fetchIconParts("0707d4f7-cecf-480b-845e-11bbff0a45e0");
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.icons);
    console.log(this.props.icons);
    if (prevProps.icons !== this.props.icons){
      if (this.props.icons.icon_parts){
        for (var key in this.props.icons.icon_parts) {
          if (this.props.icons.icon_parts.hasOwnProperty(key)) {
            if (this.props.icons.icon_parts[key] === 0){
              this.setState({
                [key]: null
              })
            }else{
              this.setState({
                [key]: 1
              })
            }
          }
        }
      }
    }
  }

  state = {
    // Test id
    artist_id: "0707d4f7-cecf-480b-845e-11bbff0a45e0",
    mapping: {
      0: "hair",
      1: "bang",
      2: "side",
      3: "eyes",
      4: "eyebrows",
      5: "nose",
      6: "mouth",
      7: "cloth",
      8: "face",
    },
    removedFiles: [],
    unselectable_options: ["bang", "side", "cloth"],
    looked_element: 0,
    hair: 1,
    bang: 1,
    side: 1,
    eyes: 1,
    eyebrows: 1,
    mouth: 1,
    cloth: 1,
    face: 1,
    hair_classes: 1,
    bang_classes: 1,
    side_classes: 1,
    eyes_classes: 1,
    eyebrows_classes: 1,
    mouth_classes: 1,
    cloth_classes: 1,
    face_classes: 1,

    // imageFiles to upload
    imageFiles: [],
    eyesFile: [],
    eyeballsFile: [],
    eyes_errors: null,
    eyeballs_errors: null,
    errors: []
  }

  changeColorFilter = (filter) => {
    let className = `${this.state.mapping[this.state.looked_element]}_classes`;
    console.log(className);
    this.setState({
      [className]: filter
    })

  }

  changeLookedElement = (value) => {
    console.log("changeLookedElement", value);
    this.setState({
      looked_element: value,
      removedFiles: []
    })
  }

  changeOption = (optionName, optionValue) => {
    this.setState({
      [optionName]: optionValue
    })
  }

  handleRemoveOption = (optionNumber) => {
    console.log("handleRemoveOption", optionNumber);
    this.setState({ removedFiles: [...this.state.removedFiles, optionNumber] })
  }

  removeChosenOption = (e) => {
    console.log("removeChosenOption");
    e.preventDefault();
    this.props.removeIconParts(
      this.state.artist_id,
      this.state.mapping[this.state.looked_element],
      this.state.removedFiles
    );
  }

  getAvailableOptions = (optionName) => {
    //console.log(this.props.icons.icon_parts);
    console.log(optionName);
    console.log(this.state[optionName]);

    if (this.props.icons && this.props.icons.icon_parts && this.props.icons.icon_parts[optionName]){
      let content = [];
      console.log(this.props.icons.icon_parts[optionName]);

      if (this.state.unselectable_options.includes(optionName)) {
        content.push(
          <div class="column">
            {this.state[optionName] === null ? (
              <button class="choosed"
                   onClick={this.changeOption.bind(this, optionName, null)}
              > Unselected </button>
            )
            : (
              <button class="choice"
                   onClick={this.changeOption.bind(this, optionName, null)}
              > Disable </button>
            )}
          </div>
        )
      }
      for (var i = 1; i <= this.props.icons.icon_parts[optionName]; i++) {
        content.push(
          <div class="column">
            {this.state[optionName] === i ? (
              <img class="choosed"
                   src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/${optionName}${i}.png`}
                   onClick={this.changeOption.bind(this, optionName, i)}
              />
            )
            : (
              <img class="choice"
                   src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/${optionName}${i}.png`}
                   onClick={this.changeOption.bind(this, optionName, i)}
              />
            )}
            <button> Remove </button>
            <input type="checkbox" onChange={this.handleRemoveOption.bind(this, i)} /> Remove this
          </div>
        )
      }
      content.push(<button class="form-send-btn btn" onClick={this.removeChosenOption} >Remove choosed items</button>)
      return content;
    }
    return [<div>No parts uploaded</div>];
  }

  uploadIconParts = (e) => {
    e.preventDefault();

    if (this.state.looked_element === 3){
      const errors = this.validateEyesUpload();
      if (errors.length > 0) {
        this.setState({ errors });
        return;
      }

      this.props.uploadEyeParts(
        this.state.artist_id,
        this.state.eyesFile,
        this.state.eyeballsFile
      );
    } else {
      this.props.uploadIconParts(
        this.state.artist_id,
        this.state.mapping[this.state.looked_element],
        this.state.imageFiles
      );
    }
  }

  validateEyesUpload = () => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if (this.state.eyesFile.length !== 1){
      errors.push("Please select one image for Eyes.")
    }

    if (this.state.eyeballsFile.length !== 1){
      errors.push("Please select one image for Eyeballs.")
    }
    return errors;
   }

  onDrop = (imageFiles) => {
    this.setState({
        imageFiles: imageFiles
    })
  }

  onDropEyes = (imageFiles) => {

    if (imageFiles.length > 1) {
      this.setState({ eyes_errors: "Only one file allowed for Eyes" });
      return;
    }

    this.setState({
        eyesFile: imageFiles
    })
  }

  onDropEyeballs = (imageFiles) => {
    if (imageFiles.length > 1) {
      this.setState({ eyeballs_errors: "Only one file allowed for Eyes" });
      return;
    }

    this.setState({
        eyeballsFile: imageFiles
    })
  }

  render() {
    const previewStyle = {
      display: 'inline',
      width: 50,
      height: 50,
    };

    const errors = this.state.errors;
    const eyes_errors = this.state.eyes_errors;
    const eyeballs_errors = this.state.eyeballs_errors;

    return (
  <div>
    <Header />
    <Filters />
    <div class="wrapper clearfix">

      <div class="parent">
        {this.state.face > 0 && (
          <img class="image1 imgFace"
               style={{filter: `url(#filterSkinColor${this.state.face_classes})`, WebkitFilter: `url(#filterSkinColor${this.state.face_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/face${this.state.face}.png`}
          />
        )}

        // Hair
        {this.state.hair > 0 && (
          <img class="image1 imgHair"
               style={{filter: `url(#filterHairColor${this.state.hair_classes})`, WebkitFilter: `url(#filterHairColor${this.state.hair_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/hair${this.state.hair}.png`}
          />
        )}
        {this.state.bang > 0 && (
          <img class="image1 imgBang"
               style={{filter: `url(#filterHairColor${this.state.bang_classes})`, WebkitFilter: `url(#filterHairColor${this.state.bang_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/bang${this.state.bang}.png`}
          />
        )}
        {this.state.side > 0 && (
          <img class="image1 imgSide"
               style={{filter: `url(#filterHairColor${this.state.side_classes})`, WebkitFilter: `url(#filterHairColor${this.state.side_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/side${this.state.side}.png`}
          />
        )}

        // Eyes
        {this.state.eyes > 0 && (
          <img class="image1 imgEyes"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyes${this.state.eyes}.png`}
          />
        )}
        {this.state.eyes > 0 && (
          <img class="image1 imgEyeballs"
               style={{filter: `url(#filterEyesColor${this.state.eyes_classes})`, WebkitFilter: `url(#filterEyesColor${this.state.eyes_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyeballs${this.state.eyes}.png`}
          />
        )}

        // Eyebrow
        {this.state.eyebrows > 0 && (
          <img class="image1 imgEyebrows"
               style={{filter: `url(#filterHairColor${this.state.eyebrows_classes})`, WebkitFilter: `url(#filterHairColor${this.state.eyebrows_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyebrows${this.state.eyebrows}.png`}
          />
        )}

        // Nose
        {this.state.nose > 0 && (
          <img class="image1 imgNose"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/nose${this.state.nose}.png`}
          />
        )}

        // Mouth
        {this.state.mouth > 0 && (
          <img class="image1 imgMouth"
               style={{filter: `url(#filterMouthColor${this.state.mouth_classes})`, WebkitFilter: `url(#filterMouthColor${this.state.mouth_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/mouth${this.state.mouth}.png`}
          />
        )}

        // Cloth
        {this.state.cloth > 0 && (
          <img class="image1 imgCloth"
               style={{filter: `url(#filterClothColor${this.state.cloth_classes})`, WebkitFilter: `url(#filterClothColor${this.state.cloth_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/cloth${this.state.cloth}.png`}
          />
        )}

        // Accessories
        {this.state.accessories > 0 && (
          <img class="image1 imgCloth"
            src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/accessories${this.state.accessories}.png`}
          />
        )}

      </div>

      <div>
       <p> Color </p>
       <div style={{ display: (this.state.looked_element === 0 || this.state.looked_element === 1 || this.state.looked_element === 2 || this.state.looked_element === 4)
          ? "block" : "none" }}>
         <span class="dot" style={{filter: "url(#filterHairColor1)", WebkitFilter: "url(#filterHairColor1)"}} onClick={() => this.changeColorFilter("1")} ></span>
         <span class="dot" style={{filter: "url(#filterHairColor2)", WebkitFilter: "url(#filterHairColor2)"}} onClick={() => this.changeColorFilter("2")} ></span>
         <span class="dot" style={{filter: "url(#filterHairColor3)", WebkitFilter: "url(#filterHairColor3)"}} onClick={() => this.changeColorFilter("3")} ></span>
         <span class="dot" style={{filter: "url(#filterHairColor4)", WebkitFilter: "url(#filterHairColor4)"}} onClick={() => this.changeColorFilter("4")} ></span>
         <span class="dot" style={{filter: "url(#filterHairColor5)", WebkitFilter: "url(#filterHairColor5)"}} onClick={() => this.changeColorFilter("5")} ></span>
         <span class="dot" style={{filter: "url(#filterHairColor6)", WebkitFilter: "url(#filterHairColor6)"}} onClick={() => this.changeColorFilter("6")} ></span>
         <span class="dot" style={{filter: "url(#filterHairColor7)", WebkitFilter: "url(#filterHairColor7)"}} onClick={() => this.changeColorFilter("7")} ></span>
       </div>

       <div style={{ display: this.state.looked_element === 3 ? "block" : "none" }}>
         <span class="dot" style={{filter: "url(#filterEyesColor1)", WebkitFilter: "url(#filterEyesColor1)"}} onClick={() => this.changeColorFilter(1)} ></span>
         <span class="dot" style={{filter: "url(#filterEyesColor2)", WebkitFilter: "url(#filterEyesColor2)"}} onClick={() => this.changeColorFilter(2)} ></span>
         <span class="dot" style={{filter: "url(#filterEyesColor3)", WebkitFilter: "url(#filterEyesColor3)"}} onClick={() => this.changeColorFilter(3)} ></span>
         <span class="dot" style={{filter: "url(#filterEyesColor4)", WebkitFilter: "url(#filterEyesColor4)"}} onClick={() => this.changeColorFilter(4)} ></span>
         <span class="dot" style={{filter: "url(#filterEyesColor5)", WebkitFilter: "url(#filterEyesColor5)"}} onClick={() => this.changeColorFilter(5)} ></span>
       </div>

       {/* Mouth */}
       <div style={{ display: this.state.looked_element === 6 ? "block" : "none" }}>
         <span class="dot" style={{filter: "url(#filterMouthColor1)", WebkitFilter: "url(#filterMouthColor1)"}} onClick={() => this.changeColorFilter(1)} ></span>
         <span class="dot" style={{filter: "url(#filterMouthColor2)", WebkitFilter: "url(#filterMouthColor2)"}} onClick={() => this.changeColorFilter(2)} ></span>
         <span class="dot" style={{filter: "url(#filterMouthColor3)", WebkitFilter: "url(#filterMouthColor3)"}} onClick={() => this.changeColorFilter(3)} ></span>
         <span class="dot" style={{filter: "url(#filterMouthColor4)", WebkitFilter: "url(#filterMouthColor4)"}} onClick={() => this.changeColorFilter(4)} ></span>
         <span class="dot" style={{filter: "url(#filterMouthColor5)", WebkitFilter: "url(#filterMouthColor5)"}} onClick={() => this.changeColorFilter(5)} ></span>
         <span class="dot" style={{filter: "url(#filterMouthColor6)", WebkitFilter: "url(#filterMouthColor6)"}} onClick={() => this.changeColorFilter(6)} ></span>
       </div>


       {/* Cloth */}
       <div style={{ display: this.state.looked_element === 7 ? "block" : "none" }}>
         <span class="dot" style={{filter: "url(#filterClothColor1)", WebkitFilter: "url(#filterClothColor1)"}} onClick={() => this.changeColorFilter(1)} ></span>
         <span class="dot" style={{filter: "url(#filterClothColor2)", WebkitFilter: "url(#filterClothColor2)"}} onClick={() => this.changeColorFilter(2)} ></span>
         <span class="dot" style={{filter: "url(#filterClothColor3)", WebkitFilter: "url(#filterClothColor3)"}} onClick={() => this.changeColorFilter(3)} ></span>
         <span class="dot" style={{filter: "url(#filterClothColor4)", WebkitFilter: "url(#filterClothColor4)"}} onClick={() => this.changeColorFilter(4)} ></span>
         <span class="dot" style={{filter: "url(#filterClothColor5)", WebkitFilter: "url(#filterClothColor5)"}} onClick={() => this.changeColorFilter(5)} ></span>
         <span class="dot" style={{filter: "url(#filterClothColor6)", WebkitFilter: "url(#filterClothColor6)"}} onClick={() => this.changeColorFilter(6)} ></span>
         <span class="dot" style={{filter: "url(#filterClothColor7)", WebkitFilter: "url(#filterClothColor7)"}} onClick={() => this.changeColorFilter(7)} ></span>
       </div>

       {/* Face */}
       <div style={{ display: this.state.looked_element === 8 ? "block" : "none" }}>
         <span class="dot" style={{filter: "url(#filterSkinColor1)", WebkitFilter: "url(#filterSkinColor1)"}} onClick={() => this.changeColorFilter(1)} ></span>
         <span class="dot" style={{filter: "url(#filterSkinColor2)", WebkitFilter: "url(#filterSkinColor2)"}} onClick={() => this.changeColorFilter(2)} ></span>
         <span class="dot" style={{filter: "url(#filterSkinColor3)", WebkitFilter: "url(#filterSkinColor3)"}} onClick={() => this.changeColorFilter(3)} ></span>
         <span class="dot" style={{filter: "url(#filterSkinColor4)", WebkitFilter: "url(#filterSkinColor4)"}} onClick={() => this.changeColorFilter(4)} ></span>
         <span class="dot" style={{filter: "url(#filterSkinColor5)", WebkitFilter: "url(#filterSkinColor5)"}} onClick={() => this.changeColorFilter(4)} ></span>
         <span class="dot" style={{filter: "url(#filterSkinColor6)", WebkitFilter: "url(#filterSkinColor6)"}} onClick={() => this.changeColorFilter(4)} ></span>
       </div>

      </div>

      <div>
        <button onClick={() => this.changeLookedElement(8)} > Face </button>
        <button onClick={() => this.changeLookedElement(0)} > Hair </button>
        <button onClick={() => this.changeLookedElement(1)} > Bang </button>
        <button onClick={() => this.changeLookedElement(2)} > Side </button>
        <button onClick={() => this.changeLookedElement(3)} > Eyes </button>
        <button onClick={() => this.changeLookedElement(4)} > Eyebrows </button>
        <button onClick={() => this.changeLookedElement(6)} > Mouth </button>
        <button onClick={() => this.changeLookedElement(7)} > Cloth </button>
      </div>


      {this.state.looked_element !== 3 &&
        <Dropzone onDrop={acceptedFiles => this.onDrop(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div style={{height: "40px", width: "1000px", border: "1px solid black"}} >Drag 'n' drop some files here, or click to select files
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      }

      {this.state.looked_element === 3 &&
        <div>
          <Dropzone onDrop={acceptedFiles => this.onDropEyes(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div style={{height: "40px", width: "1000px", border: "1px solid black"}} >Drag 'n' drop a file for eyes here, or click to select a file
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
          {eyes_errors && <p class="error-heading">エラー: {eyes_errors}</p>}
          <Dropzone onDrop={acceptedFiles => this.onDropEyeballs(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div style={{height: "40px", width: "1000px", border: "1px solid black"}} >Drag 'n' drop a file for eyeballs here, or click to select a file
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      }

      {this.state.imageFiles.length > 0 &&
        <Fragment>
          <h3>Previews</h3>
          {this.state.imageFiles.map((file) => (
            <img
              alt="Preview"
              key={file.preview}
              src={URL.createObjectURL(file)}
              style={previewStyle}
            />
          ))}
        </Fragment>
      }

      {errors.map(error => (
        <p class="error-heading" key={error}>エラー: {error}</p>
      ))}
      <button style={{width:"20%"}} class="form-send-btn btn" onClick={this.uploadIconParts}>
        Upload Parts of {this.state.mapping[this.state.looked_element]}
      </button>

      <div class="function-buttons">
        <div style={{ display: this.state.looked_element === 0 ? "block" : "none" }}>
          <p>Uploaded Hair</p>
          {this.getAvailableOptions("hair")}
        </div>

        <div style={{ display: this.state.looked_element === 1 ? "block" : "none" }}>
          <p>Uploaded Bang</p>
          {this.getAvailableOptions("bang")}
        </div>

        <div style={{ display: this.state.looked_element === 2 ? "block" : "none" }}>
          <p>Uploaded Side</p>
          {this.getAvailableOptions("side")}
        </div>

        <div style={{ display: this.state.looked_element === 3 ? "block" : "none" }}>
          <p>Uploaded Eyes</p>
          {this.getAvailableOptions("eyes")}
        </div>

        <div style={{ display: this.state.looked_element === 4 ? "block" : "none" }}>
          <p>Uploaded Eyebrows</p>
          {this.getAvailableOptions("eyebrows")}
        </div>

        <div style={{ display: this.state.looked_element === 6 ? "block" : "none" }}>
          <p>Uploaded Mouth</p>
          {this.getAvailableOptions("mouth")}
        </div>

        <div style={{ display: this.state.looked_element === 7 ? "block" : "none" }}>
          <p>Uploaded Cloth</p>
          {this.getAvailableOptions("cloth")}
        </div>

        <div style={{ display: this.state.looked_element === 8 ? "block" : "none" }}>
          <p>Uploaded Face</p>
          {this.getAvailableOptions("face")}
        </div>

      </div>
    </div>
    { /*<button class="form-send-btn btn" onClick={this.proceedCheckout}>Proceed to Checkout</button> */}
    <Footer />
  </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    icons: state.icons,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadIconParts: (artist_id, icon_part, imageFiles) => {
      dispatch(icons.uploadIconParts(artist_id, icon_part, imageFiles));
    },
    removeIconParts: (artist_id, icon_part, removedFiles) => {
      dispatch(icons.removeIconParts(artist_id, icon_part, removedFiles));
    },
    uploadEyeParts: (artist_id, eyesFile, eyeballsFile) => {
      dispatch(icons.uploadEyeParts(artist_id, eyesFile, eyeballsFile));
    },
    fetchIconParts: (artist_id) => {
      dispatch(icons.fetchIconParts(artist_id));
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupIconMaker);
