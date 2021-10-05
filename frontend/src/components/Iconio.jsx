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
    //this.props.fetchIconParts("d9d5c4f7-8977-4181-a94a-cc811c15b4be");
    this.props.fetchIconParts("0707d4f7-cecf-480b-845e-11bbff0a45e0");
  }

  state = {
    // Test id
    artist_id: "0707d4f7-cecf-480b-845e-11bbff0a45e0",
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


  getAvailableOptions = (optionName) => {
    //console.log(this.props.icons.icon_parts);
    if (this.props.icons && this.props.icons.icon_parts && this.props.icons.icon_parts[optionName]){
      let content = [];

      if (this.state.unselectable_options.includes(optionName)) {
        content.push(
          <div class="column">
            {this.state[optionName] === null ? (
              <button class="chosen"
                   onClick={this.changeOption.bind(this, optionName, null)}
              > 非表示 </button>
            )
            : (
              <button class="choice"
                   onClick={this.changeOption.bind(this, optionName, null)}
              > 選択しない </button>
            )}
          </div>
        )
      }
      let line = "";
      if (!this.state.line_only_elements.includes(optionName)){
        line = "_line";
      }
      for (var i = 1; i <= this.props.icons.icon_parts[optionName]; i++) {
        content.push(
          <div class="column">
            {this.state[optionName] === i ? (
              <img class="chosen"
                   src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/${optionName}${line}${i}.png`}
                   onClick={this.changeOption.bind(this, optionName, i)}
              />
            )
            : (
              <img class="choice"
                   src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/${optionName}${line}${i}.png`}
                   onClick={this.changeOption.bind(this, optionName, i)}
              />
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
    //console.log(this.props.icons.icon_parts);
    const optionName = "accessories"
    if (this.props.icons && this.props.icons.icon_parts && this.props.icons.icon_parts[optionName]){
      let content = [];

      content.push(
        <div class="column">
          {this.state.accessories === [] ? (
            <button class="chosen"
                 //onClick={this.removeChosenAccessory.bind(this, null)}
            > Unselected </button>
          )
          : (
            <button class="choice"
                 //onClick={this.removeChosenAccessory.bind(this, null)}
            > 選択しない </button>
          )}
        </div>
      )

      for (var i = 1; i <= this.props.icons.icon_parts[optionName]; i++) {
        content.push(
          <div class="column">
            {this.state[optionName].includes(i) ? (
              <img class="chosen"
                   src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/${optionName}${i}.png`}
              />
            )
            : (
              <img class="choice"
                   src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/${optionName}${i}.png`}
              />
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

  proceedCheckout = (e) => {
    e.preventDefault();

    this.props.orderIcon(
      this.state.artist_id,
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

    if (this.props.icons.isOrdered){
       return <Redirect to="/iconio/payment/paypal" />;
    }

    if (this.props.icons && this.props.icons.icon_parts) {

    return (
  <div>
    <Header />
    <div class="wrapper-icon clearfix">
    <SideMenu />
      <div class="icon-uploader">
      <div class="icon-container ">
      <h2>Iconio with Artist Name </h2>
      <div class="uploader-one clearfix">
      {/*<div class="parent">*/}

      <div class="icon-container-left">
        {this.state.face > 0 && this.props.icons.icon_parts.face > 0 && (
          <img class="image1 imgFace"
               style={{filter: `url(#filterSkinColor${this.state.face_classes})`, WebkitFilter: `url(#filterSkinColor${this.state.face_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/face${this.state.face}.png`}
          />
        )}
        {this.state.face > 0 && this.props.icons.icon_parts.face > 0 && (
          <img class="image1 imgFaceLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/face_line${this.state.face}.png`}
          />
        )}

        {/* Hair */}
        {this.state.hair > 0 && this.props.icons.icon_parts.hair > 0 && (
          <img class="image1 imgHair"
               style={{filter: `url(#filterHairColor${this.state.hair_classes})`, WebkitFilter: `url(#filterHairColor${this.state.hair_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/hair${this.state.hair}.png`}
          />
        )}
        {this.state.hair > 0 && this.props.icons.icon_parts.hair > 0 && (
          <img class="image1 imgHairLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/hair_line${this.state.hair}.png`}
          />
        )}

        {this.state.bang > 0 && this.props.icons.icon_parts.bang > 0 && (
          <img class="image1 imgBang"
               style={{filter: `url(#filterHairColor${this.state.bang_classes})`, WebkitFilter: `url(#filterHairColor${this.state.bang_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/bang${this.state.bang}.png`}
          />
        )}
        {this.state.bang > 0 && this.props.icons.icon_parts.bang > 0 && (
          <img class="image1 imgBangLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/bang_line${this.state.bang}.png`}
          />
        )}

        {this.state.side > 0 && this.props.icons.icon_parts.side > 0 && (
          <img class="image1 imgSide"
               style={{filter: `url(#filterHairColor${this.state.side_classes})`, WebkitFilter: `url(#filterHairColor${this.state.side_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/side${this.state.side}.png`}
          />
        )}
        {this.state.side > 0 && this.props.icons.icon_parts.side > 0 && (
          <img class="image1 imgSideLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/side_line${this.state.side}.png`}
          />
        )}

        {/* Eyes */}
        {this.state.eyes > 0 && this.props.icons.icon_parts.eyes > 0 && (
          <img class="image1 imgEyes"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyes_line${this.state.eyes}.png`}
          />
        )}
        {this.state.eyes > 0 && this.props.icons.icon_parts.eyes > 0 && (
          <img class="image1 imgEyeballs"
               style={{filter: `url(#filterEyesColor${this.state.eyes_classes})`, WebkitFilter: `url(#filterEyesColor${this.state.eyes_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyes${this.state.eyes}.png`}
          />
        )}

        {/* Eyebrow */}
        {this.state.eyebrows > 0 && this.props.icons.icon_parts.eyebrows > 0 && (
          <img class="image1 imgEyebrows"
               style={{filter: `url(#filterHairColor${this.state.eyebrows_classes})`, WebkitFilter: `url(#filterHairColor${this.state.eyebrows_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyebrows${this.state.eyebrows}.png`}
          />
        )}
        {this.state.eyebrows > 0 && this.props.icons.icon_parts.eyebrows > 0 && (
          <img class="image1 imgEyebrowsLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyebrows_line${this.state.eyebrows}.png`}
          />
        )}

        {/* Nose */}
        {this.state.nose > 0 && this.props.icons.icon_parts.nose > 0 && (
          <img class="image1 imgNose"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/nose${this.state.nose}.png`}
          />
        )}

        {/* Mouth */}
        {this.state.mouth > 0 && this.props.icons.icon_parts.mouth > 0 && (
          <img class="image1 imgMouth"
               style={{filter: `url(#filterMouthColor${this.state.mouth_classes})`, WebkitFilter: `url(#filterMouthColor${this.state.mouth_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/mouth${this.state.mouth}.png`}
          />
        )}
        {this.state.mouth > 0 && this.props.icons.icon_parts.mouth > 0 && (
          <img class="image1 imgMouthLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/mouth_line${this.state.mouth}.png`}
          />
        )}

        {/* Cloth */}
        {this.state.cloth > 0 && this.props.icons.icon_parts.cloth > 0 && (
          <img class="image1 imgCloth"
               style={{filter: `url(#filterClothColor${this.state.cloth_classes})`, WebkitFilter: `url(#filterClothColor${this.state.cloth_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/cloth${this.state.cloth}.png`}
          />
        )}
        {this.state.cloth > 0 && this.props.icons.icon_parts.cloth > 0 && (
          <img class="image1 imgClothLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/cloth_line${this.state.cloth}.png`}
          />
        )}

        {/* Accessories */}
        {accessories.map(accessory => (
          <img class="image1 imgCloth"
            src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/accessories${accessory}.png`}
          />
        ))}

        {/* Glasses */}
        {this.state.glasses > 0 && this.props.icons.icon_parts.glasses > 0 && (
          <img class="image1 imgCloth"
            src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/glasses${this.state.glasses}.png`}
          />
        )}
      </div>

      <div class="icon-container-right">
       <div class="color-pad" style={{ display: (this.state.looked_element === 0 || this.state.looked_element === 1 || this.state.looked_element === 2 || this.state.looked_element === 4)
          ? "block" : "none" }}>
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
        <h3 >髪パーツ</h3>
        {this.getAvailableOptions("hair")}
      </div>

      <div style={{ display: this.state.looked_element === 1 ? "block" : "none" }}>
        <h3 >前髪パーツ</h3>
        {this.getAvailableOptions("bang")}
      </div>

      <div style={{ display: this.state.looked_element === 2 ? "block" : "none" }}>
        <h3 >サイドヘアパーツ</h3>
        {this.getAvailableOptions("side")}
      </div>

      <div style={{ display: this.state.looked_element === 3 ? "block" : "none" }}>
        <h3 >目パーツ</h3>
        {this.getAvailableOptions("eyes")}
      </div>

      <div style={{ display: this.state.looked_element === 4 ? "block" : "none" }}>
        <h3 >眉パーツ</h3>
        {this.getAvailableOptions("eyebrows")}
      </div>

      <div style={{ display: this.state.looked_element === 5 ? "block" : "none" }}>
        <h3 >鼻パーツ</h3>
        {this.getAvailableOptions("nose")}
      </div>

      <div style={{ display: this.state.looked_element === 6 ? "block" : "none" }}>
        <h3 >口パーツ</h3>
        {this.getAvailableOptions("mouth")}
      </div>

      <div style={{ display: this.state.looked_element === 7 ? "block" : "none" }}>
        <h3 >洋服パーツ</h3>
        {this.getAvailableOptions("cloth")}
      </div>

      <div style={{ display: this.state.looked_element === 8 ? "block" : "none" }}>
        <h3 >輪郭パーツ</h3>
        {this.getAvailableOptions("face")}
      </div>

      <div style={{ display: this.state.looked_element === 9 ? "block" : "none" }}>
        <h3 >アクセサリーパーツ</h3>
        {this.getAvailableAccessoriesOptions()}
      </div>

      <div style={{ display: this.state.looked_element === 10 ? "block" : "none" }}>
        <h3>眼鏡パーツ</h3>
        {this.getAvailableOptions("glasses")}
      </div>
    </div>

    </div>
    <button class="btn savep two-btn" onClick={this.proceedCheckout}>ダウンロードへ進む</button>

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
    orderIcon: (
      artist_id, face, face_filter,
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
        artist_id, face, face_filter,
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
