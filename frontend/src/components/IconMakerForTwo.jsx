import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

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

class IconMakerForTwo extends Component {

  componentDidMount() {
    this.props.fetchIconParts("0b86df2e-2ed7-48d0-a4e9-7f79d4cbaf35");
  }

  state = {
    artist_id: "0b86df2e-2ed7-48d0-a4e9-7f79d4cbaf35",
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
    },
    behind_layout: {
      // Key is layout number,
      // Value is 0: no behind, 1: left person is behind, 2: right person is behind
      1: 0,
      2: 2,
    },
    unselectable_options: ["bang", "side", "cloth", "accessories"],
    line_only_elements: ["nose", "accessories"],
    looked_element: 0,
    // 1: left, 2: right
    looked_person: 1,
    person_key: "person_left",
    pair_layout: 1,
    person_left: {
      hair: 1,
      bang: 1,
      side: 1,
      eyes: 1,
      eyebrows: 1,
      nose: 1,
      mouth: 1,
      cloth: 1,
      face: 1,
      accessories: 0,
      hair_classes: 1,
      bang_classes: 1,
      side_classes: 1,
      eyes_classes: 1,
      eyebrows_classes: 1,
      mouth_classes: 1,
      cloth_classes: 1,
      face_classes: 1,
    },
    person_right: {
      hair: 1,
      bang: 1,
      side: 1,
      eyes: 1,
      eyebrows: 1,
      nose: 1,
      mouth: 1,
      cloth: 1,
      face: 1,
      accessories: 0,
      hair_classes: 1,
      bang_classes: 1,
      side_classes: 1,
      eyes_classes: 1,
      eyebrows_classes: 1,
      mouth_classes: 1,
      cloth_classes: 1,
      face_classes: 1,
    },
  }

  changeColorFilter = (filter) => {
    let className = `${this.state.mapping[this.state.looked_element]}_classes`;
    let person_key = this.state.person_key;

    this.setState({
      [person_key]: {
        ...this.state[person_key],
        [className]: filter
      }
    });
  }

  changeLayout = (layout) => {
    this.setState({
      pair_layout: layout
    });
  }

  changeLookedPerson = (value) => {
    let person_key = "person_left";
    if (value === 2) {
      person_key = "person_right";
    }

    this.setState({
      looked_person: value,
      person_key: person_key
    })
  }

  changeLookedElement = (value) => {
    this.setState({
      looked_element: value
    });
  }

  changeOption = (optionName, optionValue) => {
    let person_key = this.state.person_key;

    this.setState({
      [person_key]: {
        ...this.state[person_key],
        [optionName]: optionValue
      }
    })
  }

  proceedCheckout = (e) => {
    e.preventDefault();

    this.props.orderIcon();
  }

  // place: "left" or "right"
  visualizePerson = (person, place) => {
    console.log(person);
    console.log(place);
    let content = [];
    const behind = this.state.behind_layout[this.state.pair_layout];
    let behind_str = "";
    if (behind === 1 && place === "left"){
      behind_str = "Behind";
    }
    if (behind === 2 && place === "right"){
      behind_str = "Behind";
    }

    if (person.face > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgFace${behind_str}`}
             style={{filter: `url(#filterSkinColor${person.face_classes})`, WebkitFilter: `url(#filterSkinColor${person.face_classes})`}}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/face${person.face}.png`}
        />
    )}
    if (person.face > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgFaceLine${behind_str}`}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/face_line${person.face}.png`}
        />
    )}

    if (person.hair > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgHair${behind_str}`}
             style={{filter: `url(#filterHairColor${person.hair_classes})`, WebkitFilter: `url(#filterHairColor${person.hair_classes})`}}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/hair${person.hair}.png`}
        />
    )}
    if (person.hair > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgHairLine${behind_str}`}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/hair_line${person.hair}.png`}
        />
    )}

    if (person.eyes > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgEyeballs${behind_str}`}
             style={{filter: `url(#filterEyesColor${person.eyes_classes})`, WebkitFilter: `url(#filterEyesColor${person.eyes_classes})`}}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyes${person.eyes}.png`}
        />
    )}
    if (person.eyes > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgEyes${behind_str}`}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyes_line${person.eyes}.png`}
        />
    )}

    if (person.eyebrows > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgEyebrows${behind_str}`}
             style={{filter: `url(#filterHairColor${person.eyebrows_classes})`, WebkitFilter: `url(#filterHairColor${person.eyebrows_classes})`}}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyebrows${person.eyebrows}.png`}
        />
    )}
    if (person.eyebrows > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgEyebrowsLine${behind_str}`}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyebrows_line${person.eyebrows}.png`}
        />
    )}

    if (person.nose > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgNose${behind_str}`}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/nose${person.nose}.png`}
        />
    )}

    if (person.mouth > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgMouth${behind_str}`}
             style={{filter: `url(#filterMouthColor${person.mouth_classes})`, WebkitFilter: `url(#filterMouthColor${person.mouth_classes})`}}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/mouth${person.mouth}.png`}
        />
    )}
    if (person.mouth > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgMouthLine${behind_str}`}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/mouth_line${person.mouth}.png`}
        />
    )}

    if (person.bang > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgBang${behind_str}`}
             style={{filter: `url(#filterHairColor${person.bang_classes})`, WebkitFilter: `url(#filterHairColor${person.bang_classes})`}}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/bang${person.bang}.png`}
        />
    )}
    if (person.bang > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgBangLine${behind_str}`}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/bang_line${person.bang}.png`}
        />
    )}

    console.log(person.side);
    if (person.side > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgSide${behind_str}`}
             style={{filter: `url(#filterHairColor${person.side_classes})`, WebkitFilter: `url(#filterHairColor${person.side_classes})`}}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/side${person.side}.png`}
        />
    )}
    if (person.side > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgSideLine${behind_str}`}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/side_line${person.side}.png`}
        />
    )}

    if (person.cloth > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgCloth${behind_str}`}
             style={{filter: `url(#filterClothColor${person.cloth_classes})`, WebkitFilter: `url(#filterClothColor${person.cloth_classes})`}}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/cloth${person.cloth}.png`}
        />
    )}
    if (person.cloth > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgClothLine${behind_str}`}
             src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/cloth_line${person.cloth}.png`}
        />
    )}

    if (person.accessories > 0) {
      content.push(
        <img class={`image-pair${this.state.pair_layout}-${place}  imgCloth${behind_str}`}
          src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/accessories${person.accessories}.png`}
        />
    )}

   //content.push(</div>);

    return content;
  }

  getAvailableOptions = (optionName) => {
    let person_key = this.state.person_key;

    if (this.props.icons && this.props.icons.icon_parts && this.props.icons.icon_parts[optionName]){
      let content = [];

      if (this.state.unselectable_options.includes(optionName)) {
        content.push(
          <div class="column">
            {this.state[person_key][optionName] === -1 ? (
              <button class="choosed"
                   onClick={this.changeOption.bind(this, optionName, -1)}
              > Unselected </button>
            )
            : (
              <button class="choice"
                   onClick={this.changeOption.bind(this, optionName, -1)}
              > Disable </button>
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
            {this.state[person_key][optionName] === i ? (
              <img class="choosed"
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
    if (this.props.icons.isOrdered){
        return <Redirect to="/payment/paypal" />;
    }
    return (
  <div>
    <Header />
    <div class="wrapper-icon clearfix">

     <div class="icon-container ">
       <div class="icon-container-left">
         <div class="icon-pair">
           <div class="icon-pair-left">
             {this.visualizePerson(this.state.person_left, "left")}
           </div>
           <div class="icon-pair-right">
             {this.visualizePerson(this.state.person_right, "right")}
           </div>
         </div>
         <div class="image-pair-selection">
           Looking at
           <button class={this.state.looked_person === 1 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedPerson(1)} >
             Left
           </button>
           <button class={this.state.looked_person === 2 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedPerson(2)} >
             Right
           </button>
           Person
         </div>
       </div>

      <div class="icon-container-right">
        <div class="layout-pad">
          <div class="layout-column">
            <img class="layout-img"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/layout1.png`}
               onClick={() => this.changeLayout(1)}
            />
          </div>
          <div class="layout-column">
            <img class="layout-img"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/layout2.png`}
               onClick={() => this.changeLayout(2)}
            />
          </div>
          {/*
          <span onClick={() => this.changeLayout(1)} >Layout1</span>
          <span onClick={() => this.changeLayout(2)} >Layout2</span>
          */}
        </div>

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
       </div>

      <div class="looked-element-pad">
        <button class={this.state.looked_element === 8 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(8)} >
           Face
         </button>
         <button class={this.state.looked_element === 0 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(0)} >
           Hair
         </button>
         <button class={this.state.looked_element === 1 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(1)} >
           Bang
         </button>
         <button class={this.state.looked_element === 2 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(2)} >
           Side
         </button>
         <button class={this.state.looked_element === 3 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(3)} >
           Eyes
         </button>
         <button class={this.state.looked_element === 4 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(4)} >
           Eyebrows
         </button>
         <button class={this.state.looked_element === 5 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(5)} >
           Nose
         </button>
         <button class={this.state.looked_element === 6 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(6)} >
           Mouth
         </button>
         <button class={this.state.looked_element === 7 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(7)} >
           Cloth
         </button>
         <button class={this.state.looked_element === 9 ? "chosen-looked-element-button" : "looked-element-button"} onClick={() => this.changeLookedElement(9)} >
           Accessories
         </button>
      </div>

      <Link to={{
        pathname: "/payment/paypal",
        state: {
          price: 5,
          artist_id: this.state.artist_id,
          hair: this.state.hair,
          bang: this.state.bang,
          side: this.state.side,
          eyes: this.state.eyes,
          eyebrows: this.state.eyebrows,
          mouth: this.state.mouth,
          cloth: this.state.cloth,
          face: this.state.face,
          hair_classes: this.state.hair_classes,
          bang_classes: this.state.bang_classes,
          side_classes: this.state.side_classes,
          eyes_classes: this.state.eyes_classes,
          eyebrows_classes: this.state.eyebrows_classes,
          mouth_classes: this.state.mouth_classes,
          cloth_classes: this.state.cloth_classes,
          face_classes: this.state.face_classes,
        }
      }}>
        <button style={{width:"20%"}} class="form-send-btn btn" onClick={this.proceedCheckout}> Proceed to Checkout </button>
      </Link>
     </div>

     <div class="icon-uploaded-parts">
        <div style={{ display: this.state.looked_element === 0 ? "block" : "none" }}>
          <h3 style={{width:"50%"}}>Uploaded Hair</h3>
          {this.getAvailableOptions("hair")}
        </div>

        <div style={{ display: this.state.looked_element === 1 ? "block" : "none" }}>
          <h3 style={{width:"50%"}}>Uploaded Bang</h3>
          {this.getAvailableOptions("bang")}
        </div>

        <div style={{ display: this.state.looked_element === 2 ? "block" : "none" }}>
          <h3 style={{width:"50%"}}>Uploaded Side</h3>
          {this.getAvailableOptions("side")}
        </div>

        <div style={{ display: this.state.looked_element === 3 ? "block" : "none" }}>
          <h3 style={{width:"50%"}}>Uploaded Eyes</h3>
          {this.getAvailableOptions("eyes")}
        </div>

        <div style={{ display: this.state.looked_element === 4 ? "block" : "none" }}>
          <h3 style={{width:"50%"}}>Uploaded Eyebrows</h3>
          {this.getAvailableOptions("eyebrows")}
        </div>

        <div style={{ display: this.state.looked_element === 5 ? "block" : "none" }}>
          <h3 style={{width:"50%"}}>Uploaded Nose</h3>
          {this.getAvailableOptions("nose")}
        </div>

        <div style={{ display: this.state.looked_element === 6 ? "block" : "none" }}>
          <h3 style={{width:"50%"}}>Uploaded Mouth</h3>
          {this.getAvailableOptions("mouth")}
        </div>

        <div style={{ display: this.state.looked_element === 7 ? "block" : "none" }}>
          <h3 style={{width:"50%"}}>Uploaded Cloth</h3>
          {this.getAvailableOptions("cloth")}
        </div>

        <div style={{ display: this.state.looked_element === 8 ? "block" : "none" }}>
          <h3 style={{width:"50%"}}>Uploaded Face</h3>
          {this.getAvailableOptions("face")}
        </div>

        <div style={{ display: this.state.looked_element === 9 ? "block" : "none" }}>
          <h3 style={{width:"50%"}}>Accessories</h3>
          {this.getAvailableOptions("accessories")}
        </div>
      </div>

    </div>
    </div>
    <Filters />
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

export default connect(mapStateToProps, mapDispatchToProps)(IconMakerForTwo);
