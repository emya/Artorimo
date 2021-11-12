import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import Dropzone from 'react-dropzone';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import Filters from './Filters';

import {icons, auth} from "../actions";

import { keys_prod } from '../keys_prod.js';
import { keys_stg } from '../keys.js';
import '../css/icons.scss';
import '../css/filters.scss';

var keys = keys_stg;
if (process.env.NODE_ENV === "production"){
  keys = keys_prod;
}


class Iconio extends Component {

  componentDidMount() {
    this.props.fetchIconPartsByName(this.props.match.params.artist_name);

    //this.props.fetchIconParts(this.state.artist_id);
    //this.props.fetchIconParts("0707d4f7-cecf-480b-845e-11bbff0a45e0");
  }

  state = {
    // Test id
    artist_id: "a5fb49f8-227d-49f8-96fb-404cced6805b",
    //artist_id: "d9d5c4f7-8977-4181-a94a-cc811c15b4be",
    selected_language: "jpn",
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
      9: "accessories",
      10: "glasses",
    },
    removedFiles: [],
    unselectable_options: ["bang", "side", "cloth", "accessories", "glasses"],
    line_only_elements: ["nose", "accessories", "glasses"],
    looked_element: 8,
    hair: 1,
    bang: 1,
    side: 1,
    eyes: 1,
    eyebrows: 1,
    mouth: 1,
    nose: 1,
    cloth: 1,
    face: 1,
    hair_classes: 5,
    bang_classes: 5,
    side_classes: 5,
    eyes_classes: 1,
    eyebrows_classes: 5,
    mouth_classes: 1,
    cloth_classes: 1,
    face_classes: 1,

    accessories: [],
    glasses: 0,

    // imageFiles to upload
    imageFiles: [],
    lineFile: [],
    fillingFile: [],
    line_errors: [],
    filling_errors: [],
    errors: []
  }

  changeColorFilter = (filter) => {
    let className = `${this.state.mapping[this.state.looked_element]}_classes`;
    this.setState({
      [className]: filter
    })

  }

  changeLookedElement = (value) => {
    this.setState({
      looked_element: value,
      removedFiles: [],
      imageFiles: [],
      lineFile: [],
      fillingFile: [],
      line_errors: [],
      filling_errors: [],
      errors: []
    })
  }

  changeOption = (optionName, optionValue) => {
    this.setState({
      [optionName]: optionValue
    })
  }

  chooseAccessory = (optionNumber) => {
    this.setState({ accessories: [...this.state.accessories, optionNumber] })
  }

  removeAccessory = (optionNumber) => {
    if (optionNumber === null){
      this.setState({accessories: []});
      return false;
    }

    var array = [...this.state.accessories]; // make a separate copy of the array
    var index = array.indexOf(optionNumber)
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({accessories: array});
    }
  }


  getAvailableOptions = (optionName) => {
    if (this.props.icons && this.props.icons.icon_parts && this.props.icons.icon_parts[optionName]){
      const artist_id = this.props.icons.icon_parts.artist_id;
      const version = this.props.icons.icon_parts.version;

      let content = [];
      let line = "";
      if (!this.state.line_only_elements.includes(optionName)){
        line = "_line";
      }
      for (var i = 1; i <= this.props.icons.icon_parts[optionName]; i++) {
        content.push(
          <div class="column">
            {this.state[optionName] === i ? (
              <img class="chosen"
                   src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/${optionName}${line}${i}.png`}
                   onClick={this.changeOption.bind(this, optionName, i)}
              />
            )
            : (
              <img class="choice"
                   src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/${optionName}${line}${i}.png`}
                   onClick={this.changeOption.bind(this, optionName, i)}
              />
            )}
          </div>
        )
      }

      content.push(
        <div class="pleasetap">選択したいパーツをタップしてください。現在赤枠のパーツが選択されています</div>
      )

      if (this.state.unselectable_options.includes(optionName)) {
        content.push(
          <div class="wide-column">
            {this.state[optionName] === 0 ? (
              <button class="chosen-button"
                   onClick={this.changeOption.bind(this, optionName, 0)}
              > 非表示 </button>
            )
            : (
              <button class="unselect"
                   onClick={this.changeOption.bind(this, optionName, 0)}
              > 選択しない </button>
            )}
          </div>
        )
      }
      return content;
    }
    return [<div>
             {this.state.selected_language === "jpn" ? (
                "アイテムはありません"
                 ) : (
                "No items found"
              )}
             </div>];
  }

  getAvailableAccessoriesOptions = () => {
    const optionName = "accessories"
    if (this.props.icons && this.props.icons.icon_parts && this.props.icons.icon_parts[optionName]){
      const artist_id = this.props.icons.icon_parts.artist_id;
      const version = this.props.icons.icon_parts.version;
      let content = [];

      for (var i = 1; i <= this.props.icons.icon_parts[optionName]; i++) {
        content.push(
          <div class="column">
            {this.state[optionName].includes(i) ? (
              <img class="chosen"
                   src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/${optionName}${i}.png`}
                   onClick={this.removeAccessory.bind(this, i)}
              />
            )
            : (
              <img class="choice"
                   src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/${optionName}${i}.png`}
                   onClick={this.chooseAccessory.bind(this, i)}
              />
            )}
          </div>
        )
      }

      content.push(
        <div class="pleasetap">選択したいパーツをタップしてください。現在赤枠のパーツが選択されています</div>
      )

      content.push(
        <div class="wide-column">
          {this.state.accessories === [] ? (
            <button class="chosen-button"
                 onClick={this.removeAccessory.bind(this, null)}
            > 非表示 </button>
          )
          : (
            <button class="unselect"
                 onClick={this.removeAccessory.bind(this, null)}
            > 選択しない </button>
          )}
        </div>
      )

      return content;
    }
    return [<div>
             {this.state.selected_language === "jpn" ? (
                "アイテムはありません"
                 ) : (
                "No items found"
              )}
             </div>];
  }

  proceedCheckout = (artist_id, iconio_version, e) => {
    e.preventDefault();

    this.props.orderIcon(
      artist_id, iconio_version,
      this.state.face, this.state.face_classes,
      this.state.hair, this.state.hair_classes,
      this.state.bang, this.state.bang_classes,
      this.state.side, this.state.side_classes,
      this.state.eyes, this.state.eyes_classes,
      this.state.eyebrows, this.state.eyebrows_classes,
      this.state.nose,
      this.state.mouth, this.state.mouth_classes,
      this.state.cloth, this.state.cloth_classes,
    );
  }

  render() {
    const accessories = this.state.accessories;
    const errors = this.state.errors;

    localStorage.setItem('looking_artist_name', this.props.match.params.artist_name)

    if (this.props.icons.isOrdered){
       return <Redirect to="/iconio/payment/paypal" />;
    }

    if (this.props.icons.fetchFailed){
       return <Redirect to="/iconio/creators/top" />;
    }

    if (this.props.icons && this.props.icons.icon_parts) {

    const artist_id = this.props.icons.icon_parts.artist_id;
    const version = this.props.icons.icon_parts.version;

    return (
  <div>
    <Header />
    <div class="icon-maker">
    <div class="wrapper-icon clearfix">
      <div class="iconio-uploader">
      <div class="iconio-container ">
      <h2>Iconio with Artist Name </h2>
      <div class="uploader-one clearfix">
      {/*<div class="parent">*/}

      <div class="iconio-container-left">
        <img class="image1 imgSample"
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/sample.png`}
        />
        {this.state.face > 0 && this.props.icons.icon_parts.face > 0 && (
          <img class="image1 imgFace"
               style={{filter: `url(#filterSkinColor${this.state.face_classes})`, WebkitFilter: `url(#filterSkinColor${this.state.face_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/face${this.state.face}.png`}
          />
        )}
        {this.state.face > 0 && this.props.icons.icon_parts.face > 0 && (
          <img class="image1 imgFaceLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/face_line${this.state.face}.png`}
          />
        )}

        {/* Hair */}
        {this.state.hair > 0 && this.props.icons.icon_parts.hair > 0 && (
          <img class="image1 imgHair"
               style={{filter: `url(#filterHairColor${this.state.hair_classes})`, WebkitFilter: `url(#filterHairColor${this.state.hair_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/hair${this.state.hair}.png`}
          />
        )}
        {this.state.hair > 0 && this.props.icons.icon_parts.hair > 0 && (
          <img class="image1 imgHairLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/hair_line${this.state.hair}.png`}
          />
        )}

        {this.state.bang > 0 && this.props.icons.icon_parts.bang > 0 && (
          <img class="image1 imgBang"
               style={{filter: `url(#filterHairColor${this.state.bang_classes})`, WebkitFilter: `url(#filterHairColor${this.state.bang_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/bang${this.state.bang}.png`}
          />
        )}
        {this.state.bang > 0 && this.props.icons.icon_parts.bang > 0 && (
          <img class="image1 imgBangLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/bang_line${this.state.bang}.png`}
          />
        )}

        {this.state.side > 0 && this.props.icons.icon_parts.side > 0 && (
          <img class="image1 imgSide"
               style={{filter: `url(#filterHairColor${this.state.side_classes})`, WebkitFilter: `url(#filterHairColor${this.state.side_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/side${this.state.side}.png`}
          />
        )}
        {this.state.side > 0 && this.props.icons.icon_parts.side > 0 && (
          <img class="image1 imgSideLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/side_line${this.state.side}.png`}
          />
        )}

        {/* Eyes */}
        {this.state.eyes > 0 && this.props.icons.icon_parts.eyes > 0 && (
          <img class="image1 imgEyes"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/eyes_line${this.state.eyes}.png`}
          />
        )}
        {this.state.eyes > 0 && this.props.icons.icon_parts.eyes > 0 && (
          <img class="image1 imgEyeballs"
               style={{filter: `url(#filterEyesColor${this.state.eyes_classes})`, WebkitFilter: `url(#filterEyesColor${this.state.eyes_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/eyes${this.state.eyes}.png`}
          />
        )}

        {/* Eyebrow */}
        {this.state.eyebrows > 0 && this.props.icons.icon_parts.eyebrows > 0 && (
          <img class="image1 imgEyebrows"
               style={{filter: `url(#filterHairColor${this.state.eyebrows_classes})`, WebkitFilter: `url(#filterHairColor${this.state.eyebrows_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/eyebrows${this.state.eyebrows}.png`}
          />
        )}
        {this.state.eyebrows > 0 && this.props.icons.icon_parts.eyebrows > 0 && (
          <img class="image1 imgEyebrowsLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/eyebrows_line${this.state.eyebrows}.png`}
          />
        )}

        {/* Nose */}
        {this.state.nose > 0 && this.props.icons.icon_parts.nose > 0 && (
          <img class="image1 imgNose"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/nose${this.state.nose}.png`}
          />
        )}

        {/* Mouth */}
        {this.state.mouth > 0 && this.props.icons.icon_parts.mouth > 0 && (
          <img class="image1 imgMouth"
               style={{filter: `url(#filterMouthColor${this.state.mouth_classes})`, WebkitFilter: `url(#filterMouthColor${this.state.mouth_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/mouth${this.state.mouth}.png`}
          />
        )}
        {this.state.mouth > 0 && this.props.icons.icon_parts.mouth > 0 && (
          <img class="image1 imgMouthLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/mouth_line${this.state.mouth}.png`}
          />
        )}

        {/* Cloth */}
        {this.state.cloth > 0 && this.props.icons.icon_parts.cloth > 0 && (
          <img class="image1 imgCloth"
               style={{filter: `url(#filterClothColor${this.state.cloth_classes})`, WebkitFilter: `url(#filterClothColor${this.state.cloth_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/cloth${this.state.cloth}.png`}
          />
        )}
        {this.state.cloth > 0 && this.props.icons.icon_parts.cloth > 0 && (
          <img class="image1 imgClothLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/cloth_line${this.state.cloth}.png`}
          />
        )}

        {/* Accessories */}
        {accessories.map(accessory => (
          <img class="image1 imgAccessories"
            src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/accessories${accessory}.png`}
          />
        ))}

        {/* Glasses */}
        {this.state.glasses > 0 && this.props.icons.icon_parts.glasses > 0 && (
          <img class="image1 imgCloth"
            src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${artist_id}/${version}/glasses${this.state.glasses}.png`}
          />
        )}

        <img class="image1 imgBackGround"
          src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/background.jpg`}
        />
      </div>

      <div class="iconio-container-right">
       <div class="color-pad" style={{ display: (this.state.looked_element === 0 || this.state.looked_element === 1 || this.state.looked_element === 2 || this.state.looked_element === 4)
          ? "block" : "none"}}>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterHairColor1)", WebkitFilter: "url(#filterHairColor1)"}} onClick={() => this.changeColorFilter(1)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterHairColor2)", WebkitFilter: "url(#filterHairColor2)"}} onClick={() => this.changeColorFilter(2)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterHairColor3)", WebkitFilter: "url(#filterHairColor3)"}} onClick={() => this.changeColorFilter(3)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterHairColor4)", WebkitFilter: "url(#filterHairColor4)"}} onClick={() => this.changeColorFilter(4)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterHairColor5)", WebkitFilter: "url(#filterHairColor5)"}} onClick={() => this.changeColorFilter(5)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterHairColor6)", WebkitFilter: "url(#filterHairColor6)"}} onClick={() => this.changeColorFilter(6)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterHairColor7)", WebkitFilter: "url(#filterHairColor7)"}} onClick={() => this.changeColorFilter(7)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterHairColor8)", WebkitFilter: "url(#filterHairColor8)"}} onClick={() => this.changeColorFilter(8)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterHairColor9)", WebkitFilter: "url(#filterHairColor9)"}} onClick={() => this.changeColorFilter(9)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterHairColor10)", WebkitFilter: "url(#filterHairColor10)"}} onClick={() => this.changeColorFilter(10)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterHairColor11)", WebkitFilter: "url(#filterHairColor11)"}} onClick={() => this.changeColorFilter(11)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterHairColor12)", WebkitFilter: "url(#filterHairColor12)"}} onClick={() => this.changeColorFilter(12)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterHairColor13)", WebkitFilter: "url(#filterHairColor13)"}} onClick={() => this.changeColorFilter(13)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterHairColor14)", WebkitFilter: "url(#filterHairColor14)"}} onClick={() => this.changeColorFilter(14)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterHairColor15)", WebkitFilter: "url(#filterHairColor15)"}} onClick={() => this.changeColorFilter(15)} ></div>
         </div>
       </div>

       <div class="color-pad" style={{ display: this.state.looked_element === 3 ? "block" : "none" }}>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterEyesColor1)", WebkitFilter: "url(#filterEyesColor1)"}} onClick={() => this.changeColorFilter(1)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterEyesColor2)", WebkitFilter: "url(#filterEyesColor2)"}} onClick={() => this.changeColorFilter(2)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterEyesColor3)", WebkitFilter: "url(#filterEyesColor3)"}} onClick={() => this.changeColorFilter(3)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterEyesColor4)", WebkitFilter: "url(#filterEyesColor4)"}} onClick={() => this.changeColorFilter(4)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterEyesColor5)", WebkitFilter: "url(#filterEyesColor5)"}} onClick={() => this.changeColorFilter(5)} ></div>
         </div>
       </div>

       {/* Mouth */}
       <div class="color-pad" style={{ display: this.state.looked_element === 6 ? "block" : "none" }}>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterMouthColor1)", WebkitFilter: "url(#filterMouthColor1)"}} onClick={() => this.changeColorFilter(1)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterMouthColor2)", WebkitFilter: "url(#filterMouthColor2)"}} onClick={() => this.changeColorFilter(2)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterMouthColor3)", WebkitFilter: "url(#filterMouthColor3)"}} onClick={() => this.changeColorFilter(3)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterMouthColor4)", WebkitFilter: "url(#filterMouthColor4)"}} onClick={() => this.changeColorFilter(4)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterMouthColor5)", WebkitFilter: "url(#filterMouthColor5)"}} onClick={() => this.changeColorFilter(5)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterMouthColor6)", WebkitFilter: "url(#filterMouthColor6)"}} onClick={() => this.changeColorFilter(6)} ></div>
         </div>
       </div>


       {/* Cloth */}
       <div class="color-pad" style={{ display: this.state.looked_element === 7 ? "block" : "none" }}>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterClothColor1)", WebkitFilter: "url(#filterClothColor1)"}} onClick={() => this.changeColorFilter(1)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterClothColor2)", WebkitFilter: "url(#filterClothColor2)"}} onClick={() => this.changeColorFilter(2)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterClothColor3)", WebkitFilter: "url(#filterClothColor3)"}} onClick={() => this.changeColorFilter(3)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterClothColor4)", WebkitFilter: "url(#filterClothColor4)"}} onClick={() => this.changeColorFilter(4)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterClothColor5)", WebkitFilter: "url(#filterClothColor5)"}} onClick={() => this.changeColorFilter(5)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterClothColor6)", WebkitFilter: "url(#filterClothColor6)"}} onClick={() => this.changeColorFilter(6)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterClothColor7)", WebkitFilter: "url(#filterClothColor7)"}} onClick={() => this.changeColorFilter(7)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterClothColor8)", WebkitFilter: "url(#filterClothColor8)"}} onClick={() => this.changeColorFilter(8)} ></div>
         </div>
       </div>

       {/* Face */}
       <div class="color-pad" style={{ display: this.state.looked_element === 8 ? "block" : "none" }}>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterSkinColor1)", WebkitFilter: "url(#filterSkinColor1)"}} onClick={() => this.changeColorFilter(1)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterSkinColor2)", WebkitFilter: "url(#filterSkinColor2)"}} onClick={() => this.changeColorFilter(2)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterSkinColor3)", WebkitFilter: "url(#filterSkinColor3)"}} onClick={() => this.changeColorFilter(3)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterSkinColor4)", WebkitFilter: "url(#filterSkinColor4)"}} onClick={() => this.changeColorFilter(4)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterSkinColor5)", WebkitFilter: "url(#filterSkinColor5)"}} onClick={() => this.changeColorFilter(5)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterSkinColor6)", WebkitFilter: "url(#filterSkinColor6)"}} onClick={() => this.changeColorFilter(6)} ></div>
         </div>
         <div class="outer-circle">
           <div class="inner-circle" style={{filter: "url(#filterSkinColor7)", WebkitFilter: "url(#filterSkinColor7)"}} onClick={() => this.changeColorFilter(7)} ></div>
         </div>
       </div>

       {/* Nose/Accessory/Glasses */}
       <div class="color-pad" style={{ display: (this.state.looked_element === 5 || this.state.looked_element === 9 || this.state.looked_element === 10) ? "block" : "none" }}>
       </div>
       <div class="looked-element-pad">
         <button class={this.state.looked_element === 8 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(8)} >
           {this.state.selected_language === "jpn" ? ("輪郭") : ("Face")}
         </button>
         <button class={this.state.looked_element === 0 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(0)} >
           {this.state.selected_language === "jpn" ? ("髪") : ("Hair")}
         </button>
         <button class={this.state.looked_element === 1 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(1)} >
           {this.state.selected_language === "jpn" ? ("前髪") : ("Bang")}
         </button>
         <button class={this.state.looked_element === 2 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(2)} >
           {this.state.selected_language === "jpn" ? ("サイドヘア") : ("Side")}
         </button>
         <button class={this.state.looked_element === 3 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(3)} >
           {this.state.selected_language === "jpn" ? ("目") : ("Eyes")}
         </button>
         <button class={this.state.looked_element === 4 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(4)} >
           {this.state.selected_language === "jpn" ? ("眉") : ("Eyebrows")}
         </button>
         <button class={this.state.looked_element === 5 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(5)} >
           {this.state.selected_language === "jpn" ? ("鼻") : ("Nose")}
         </button>
         <button class={this.state.looked_element === 6 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(6)} >
           {this.state.selected_language === "jpn" ? ("口") : ("Mouth")}
         </button>
         <button class={this.state.looked_element === 7 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(7)} >
           {this.state.selected_language === "jpn" ? ("服") : ("Cloth")}
         </button>
         <button class={this.state.looked_element === 9 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(9)} >
           {this.state.selected_language === "jpn" ? ("アクセサリ") : ("Accessories")}
         </button>
         <button class={this.state.looked_element === 10 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(10)} >
           {this.state.selected_language === "jpn" ? ("眼鏡") : ("Glasses")}
         </button>
       </div>
      </div>
      </div>
    </div>

    <div class="icon-uploaded-parts">
    <div class="uploader-two">
      <div style={{ display: this.state.looked_element === 0 ? "block" : "none" }}>
        {this.getAvailableOptions("hair")}
      </div>

      <div style={{ display: this.state.looked_element === 1 ? "block" : "none" }}>
        {this.getAvailableOptions("bang")}
      </div>

      <div style={{ display: this.state.looked_element === 2 ? "block" : "none" }}>
        {this.getAvailableOptions("side")}
      </div>

      <div style={{ display: this.state.looked_element === 3 ? "block" : "none" }}>
        {this.getAvailableOptions("eyes")}
      </div>

      <div style={{ display: this.state.looked_element === 4 ? "block" : "none" }}>
        {this.getAvailableOptions("eyebrows")}
      </div>

      <div style={{ display: this.state.looked_element === 5 ? "block" : "none" }}>
        {this.getAvailableOptions("nose")}
      </div>

      <div style={{ display: this.state.looked_element === 6 ? "block" : "none" }}>
        {this.getAvailableOptions("mouth")}
      </div>

      <div style={{ display: this.state.looked_element === 7 ? "block" : "none" }}>
        {this.getAvailableOptions("cloth")}
      </div>

      <div style={{ display: this.state.looked_element === 8 ? "block" : "none" }}>
        {this.getAvailableOptions("face")}
      </div>

      <div style={{ display: this.state.looked_element === 9 ? "block" : "none" }}>
        {this.getAvailableAccessoriesOptions()}
      </div>

      <div style={{ display: this.state.looked_element === 10 ? "block" : "none" }}>
        {this.getAvailableOptions("glasses")}
      </div>
    </div>
    </div>
    </div>
    </div>
    <div class="uploader-three">
    <div class="usage-policy">
      {this.props.icons.icon_parts.use_range && this.props.icons.icon_parts.use_range.includes("0") && (
        <div class="usage-policy-sign">個人利用可</div>
      )}
      {this.props.icons.icon_parts.use_range && this.props.icons.icon_parts.use_range.includes("1") && (
        <div class="usage-policy-sign">商用利用可</div>
      )}
      {this.props.icons.icon_parts.use_range && this.props.icons.icon_parts.use_range.includes("2") && (
        <div class="usage-policy-sign">非商用利用可</div>
      )}
      {this.props.icons.icon_parts.use_range && this.props.icons.icon_parts.use_range.includes("3") && (
        <div class="usage-policy-sign">加工可</div>
      )}
    </div>
    <button class="btn savep two-btn" onClick={this.proceedCheckout.bind(this, artist_id, version)}>ダウンロードへ進む</button>
    </div>
    </div>
    { /*<button class="form-send-btn btn" onClick={this.proceedCheckout}>Proceed to Checkout</button> */}
    <Filters />
  </div>
    )} else {
      return (
    <div>
      <Header />
    </div>)}
  }
}

const mapStateToProps = state => {
  return {
    icons: state.icons,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchIconParts: (artist_id) => {
      dispatch(icons.fetchIconParts(artist_id));
    },
    fetchIconPartsByName: (artist_name) => {
      dispatch(icons.fetchIconPartsByName(artist_name));
    },
    orderIcon: (
      artist_id, iconio_version,
      face, face_filter,
      hair, hair_filter,
      bang, bang_filter,
      side, side_filter,
      eyes, eyes_filter,
      eyebrows, eyebrows_filter,
      nose,
      mouth, mouth_filter,
      cloth, cloth_filter
    ) => {
      dispatch(icons.orderIcon(
        artist_id, iconio_version,
        face, face_filter,
        hair, hair_filter,
        bang, bang_filter,
        side, side_filter,
        eyes, eyes_filter,
        eyebrows, eyebrows_filter,
        nose,
        mouth, mouth_filter,
        cloth, cloth_filter
      ));
    },
    fetchIconParts: (artist_id) => {
      dispatch(icons.fetchIconParts(artist_id));
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Iconio);
