import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import Filters from './Filters';

import {icons, auth} from "../actions";

import { keys } from '../keys.js';
import '../css/icons.scss';
import '../css/filters.scss';

class IconMakerTest extends Component {

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
    unselectable_options: ["bang", "side", "cloth", "accessories"],
    looked_element: 0,
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
      looked_element: value
    })
  }

  changeOption = (optionName, optionValue) => {
    this.setState({
      [optionName]: optionValue
    })
  }

  proceedCheckout = (e) => {
    e.preventDefault();

    this.props.orderIcon();
  }

  getAvailableOptions = (optionName) => {
    if (this.props.icons && this.props.icons.icon_parts && this.props.icons.icon_parts[optionName]){
      let content = [];
      let line = "_line";
      if (optionName === "accessories") {
        line = "";
      }

      if (this.state.unselectable_options.includes(optionName)) {
        content.push(
          <div class="column">
            {this.state[optionName] === -1 ? (
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
      for (var i = 1; i <= this.props.icons.icon_parts[optionName]; i++) {
        content.push(
          <div class="column">
            {this.state[optionName] === i ? (
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
    <Filters />
    <div class="wrapper clearfix">

      <div class="parent">
        {this.state.face > 0 && (
          <img class="image1 imgFace"
               style={{filter: `url(#filterSkinColor${this.state.face_classes})`, WebkitFilter: `url(#filterSkinColor${this.state.face_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/face${this.state.face}.png`}
          />
        )}
        {this.state.face > 0 && (
          <img class="image1 imgFaceLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/face_line${this.state.face}.png`}
          />
        )}

        // Hair
        {this.state.hair > 0 && (
          <img class="image1 imgHair"
               style={{filter: `url(#filterHairColor${this.state.hair_classes})`, WebkitFilter: `url(#filterHairColor${this.state.hair_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/hair${this.state.hair}.png`}
          />
        )}
        {this.state.hair > 0 && (
          <img class="image1 imgHairLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/hair_line${this.state.hair}.png`}
          />
        )}
        {this.state.bang > 0 && (
          <img class="image1 imgBang"
               style={{filter: `url(#filterHairColor${this.state.bang_classes})`, WebkitFilter: `url(#filterHairColor${this.state.bang_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/bang${this.state.bang}.png`}
          />
        )}
        {this.state.bang > 0 && (
          <img class="image1 imgBangLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/bang_line${this.state.bang}.png`}
          />
        )}
        {this.state.side > 0 && (
          <img class="image1 imgSide"
               style={{filter: `url(#filterHairColor${this.state.side_classes})`, WebkitFilter: `url(#filterHairColor${this.state.side_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/side${this.state.side}.png`}
          />
        )}
        {this.state.side > 0 && (
          <img class="image1 imgSideLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/side_line${this.state.side}.png`}
          />
        )}

        // Eyes
        {this.state.eyes > 0 && (
          <img class="image1 imgEyes"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyes_line${this.state.eyes}.png`}
          />
        )}
        {this.state.eyes > 0 && (
          <img class="image1 imgEyeballs"
               style={{filter: `url(#filterEyesColor${this.state.eyes_classes})`, WebkitFilter: `url(#filterEyesColor${this.state.eyes_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyes${this.state.eyes}.png`}
          />
        )}

        // Eyebrow
        {this.state.eyebrows > 0 && (
          <img class="image1 imgEyebrows"
               style={{filter: `url(#filterHairColor${this.state.eyebrows_classes})`, WebkitFilter: `url(#filterHairColor${this.state.eyebrows_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyebrows${this.state.eyebrows}.png`}
          />
        )}
        {this.state.eyebrows > 0 && (
          <img class="image1 imgEyebrowsLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyebrows_line${this.state.eyebrows}.png`}
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
        {this.state.mouth > 0 && (
          <img class="image1 imgMouthLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/mouth_line${this.state.mouth}.png`}
          />
        )}

        // Cloth
        {this.state.cloth > 0 && (
          <img class="image1 imgCloth"
               style={{filter: `url(#filterClothColor${this.state.cloth_classes})`, WebkitFilter: `url(#filterClothColor${this.state.cloth_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/cloth${this.state.cloth}.png`}
          />
        )}
        {this.state.cloth > 0 && (
          <img class="image1 imgClothLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/cloth_line${this.state.cloth}.png`}
          />
        )}

        // Accessories
        {this.state.accessories > 0 && (
          <img class="image1 imgAccessories"
            src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/accessories${this.state.accessories}.png`}
          />
        )}
      </div>

      <div>
       <p> Color </p>
       <div style={{ display: (this.state.looked_element === 0 || this.state.looked_element === 1 || this.state.looked_element === 2 || this.state.looked_element === 4)
          ? "block" : "none" }}>
         <span class="dot" style={{filter: "url(#filterHairColor1)", WebkitFilter: "url(#filterHairColor1)"}} onClick={() => this.changeColorFilter(1)} ></span>
         <span class="dot" style={{filter: "url(#filterHairColor2)", WebkitFilter: "url(#filterHairColor2)"}} onClick={() => this.changeColorFilter(2)} ></span>
         <span class="dot" style={{filter: "url(#filterHairColor3)", WebkitFilter: "url(#filterHairColor3)"}} onClick={() => this.changeColorFilter(3)} ></span>
         <span class="dot" style={{filter: "url(#filterHairColor4)", WebkitFilter: "url(#filterHairColor4)"}} onClick={() => this.changeColorFilter(4)} ></span>
         <span class="dot" style={{filter: "url(#filterHairColor5)", WebkitFilter: "url(#filterHairColor5)"}} onClick={() => this.changeColorFilter(5)} ></span>
         <span class="dot" style={{filter: "url(#filterHairColor6)", WebkitFilter: "url(#filterHairColor6)"}} onClick={() => this.changeColorFilter(6)} ></span>
         <span class="dot" style={{filter: "url(#filterHairColor7)", WebkitFilter: "url(#filterHairColor7)"}} onClick={() => this.changeColorFilter(7)} ></span>
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
         <span class="dot" style={{filter: "url(#filterMouthColor5)", WebkitFilter: "url(#filterMouthColor4)"}} onClick={() => this.changeColorFilter(5)} ></span>
         <span class="dot" style={{filter: "url(#filterMouthColor6)", WebkitFilter: "url(#filterMouthColor4)"}} onClick={() => this.changeColorFilter(6)} ></span>
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
         <span class="dot" style={{filter: "url(#filterSkinColor5)", WebkitFilter: "url(#filterSkinColor5)"}} onClick={() => this.changeColorFilter(5)} ></span>
         <span class="dot" style={{filter: "url(#filterSkinColor6)", WebkitFilter: "url(#filterSkinColor6)"}} onClick={() => this.changeColorFilter(6)} ></span>
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
        <button onClick={() => this.changeLookedElement(9)} > Accessories </button>
        <button onClick={() => this.changeLookedElement(8)} > Face </button>
        <button onClick={() => this.changeLookedElement(0)} > Hair </button>
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

      <div class="function-buttons">
        <div style={{ display: this.state.looked_element === 0 ? "block" : "none" }}>
          <p>Hair</p>
          {this.getAvailableOptions("hair")}
        </div>

        <div style={{ display: this.state.looked_element === 1 ? "block" : "none" }}>
          <p>Bang</p>
          {this.getAvailableOptions("bang")}
        </div>

        <div style={{ display: this.state.looked_element === 2 ? "block" : "none" }}>
          <p>Side</p>
          {this.getAvailableOptions("side")}
        </div>

        <div style={{ display: this.state.looked_element === 3 ? "block" : "none" }}>
          <p>Eyes</p>
          {this.getAvailableOptions("eyes")}
        </div>

        <div style={{ display: this.state.looked_element === 4 ? "block" : "none" }}>
          <p>Eyebrows</p>
          {this.getAvailableOptions("eyebrows")}
        </div>

        <div style={{ display: this.state.looked_element === 6 ? "block" : "none" }}>
          <p>Mouth</p>
          {this.getAvailableOptions("mouth")}
        </div>

        <div style={{ display: this.state.looked_element === 7 ? "block" : "none" }}>
          <p>Cloth</p>
          {this.getAvailableOptions("cloth")}
        </div>

        <div style={{ display: this.state.looked_element === 8 ? "block" : "none" }}>
          <p>Face</p>
          {this.getAvailableOptions("face")}
        </div>

        <div style={{ display: this.state.looked_element === 9 ? "block" : "none" }}>
          <p>Accessories</p>
          {this.getAvailableOptions("accessories")}
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

export default connect(mapStateToProps, mapDispatchToProps)(IconMakerTest);
