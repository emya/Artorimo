import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import {icons, auth} from "../actions";

import { keys } from '../keys.js';
import '../css/icons.scss';
import '../css/filters.scss';

class IconMakerTest extends Component {

  componentDidMount() {
    this.props.fetchIconParts();
  }

  state = {
    artist_id: "d9d5c4f7-8977-4181-a94a-cc811c15b4be",
    mapping: {
      0: "hair",
      1: "bang",
      2: "side",
      3: "eyes",
      4: "eyebrows",
      5: "nose",
      6: "mouth",
      7: "cloth",
    },
    looked_element: 0,
    hair: 1,
    bang: 1,
    side: 1,
    eyes: 1,
    eyebrows: 1,
    mouth: 1,
    cloth: 1,
    hair_classes: "image1 imgHair filterBrown",
    bang_classes: "image1 imgBang filterBrown",
    side_classes: "image1 imgSide filterBrown",
    eyes_classes: "image1 imgEyeballs filterBrown",
    eyebrows_classes: "image1 imgEyebrows filterBrown",
    mouth_classes: "image1 imgMouth filterBrown",
    cloth_classes: "image1 imgCloth filterBrown",
  }

  changeColorFilter = (filter) => {
    let className = `${this.state.mapping[this.state.looked_element]}_classes`;
    console.log("changeColorFilter", className);
    let classes = this.state[className];
    console.log("classes", classes);
    let classes_ls = classes.split(" ");
    if (classes_ls[classes_ls.length - 1].startsWith("filter")) {
      classes_ls.pop();
    }
    classes_ls.push(filter);
    classes = classes_ls.join(" ");
    this.setState({
      [className]: classes
    })

  }

  changeLookedElement = (value) => {
    console.log("changeLookedElement", value);
    this.setState({
      looked_element: value
    })
  }

  changeOption = (optionName, optionValue) => {
    console.log("changeOption")
    this.setState({
      [optionName]: optionValue
    })
  }

  getClothOptions = (optionName) => {
    console.log("getClothOptions", this.props);

    if (this.props.icons && this.props.icons.icon_parts && this.props.icons.icon_parts[optionName]){
      let content = [];

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
          </div>
        )
      }
      console.log(content);
      return content;
    }
  }

  proceedCheckout = (e) => {
    e.preventDefault();

    this.props.orderIcon();
  }

  render() {
    console.log(this.state);
    console.log(this.props.icons);

    return (
  <div>
    <Header />
    <div class="wrapper clearfix">

      <div class="parent">
        <img class="image1 imgFaceline filterBeige" src={require('../img/faceline.png')} />

        // Hair
        {this.state.hair && (
          <img class={this.state.hair_classes}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/hair${this.state.hair}.png`}
          />
        )}
        {this.state.bang && (
          <img class={this.state.bang_classes}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/bang${this.state.bang}.png`}
          />
        )}
        {this.state.side && (
          <img class={this.state.side_classes}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/side${this.state.side}.png`}
          />
        )}

        // Eyes
        {this.state.eyes && (
          <img class="image1 imgEyes"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyes${this.state.eyes}.png`}
          />
        )}
        {this.state.eyes && (
          <img class={this.state.eyes_classes}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyeballs${this.state.eyes}.png`}
          />
        )}

        // Eyebrow
        {this.state.eyebrows && (
          <img class={this.state.eyebrows_classes}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/eyebrows${this.state.eyebrows}.png`}
          />
        )}

        // Nose
        <img class="image1 imgNose" src={require('../img/nose.png')} />

        // Mouth
        {this.state.mouth && (
          <img class={this.state.mouth_classes}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/mouth${this.state.mouth}.png`}
          />
        )}

        // Cloth
        {this.state.cloth && (
          <img
            class={this.state.cloth_classes}
            src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/icons/${this.state.artist_id}/cloth${this.state.cloth}.png`}
          />
        )}
      </div>

      <div>
       <p> Color </p>
       <div style={{ display: (this.state.looked_element === 0 || this.state.looked_element === 1 || this.state.looked_element === 2 || this.state.looked_element === 4)
          ? "block" : "none" }}>
         <span class="dot filterHairColor1" onClick={() => this.changeColorFilter("filterHairColor1")} ></span>
         <span class="dot filterHairColor2" onClick={() => this.changeColorFilter("filterHairColor2")} ></span>
         <span class="dot filterHairColor3" onClick={() => this.changeColorFilter("filterHairColor3")} ></span>
         <span class="dot filterHairColor4" onClick={() => this.changeColorFilter("filterHairColor4")} ></span>
         <span class="dot filterHairColor5" onClick={() => this.changeColorFilter("filterHairColor5")} ></span>
         <span class="dot filterHairColor6" onClick={() => this.changeColorFilter("filterHairColor6")} ></span>
         <span class="dot filterHairColor7" onClick={() => this.changeColorFilter("filterHairColor7")} ></span>
       </div>

       <div style={{ display: this.state.looked_element === 3 ? "block" : "none" }}>
         <span class="dot filterEyesColor1" onClick={() => this.changeColorFilter("filterEyesColor1")} ></span>
         <span class="dot filterEyesColor2" onClick={() => this.changeColorFilter("filterEyesColor2")} ></span>
         <span class="dot filterEyesColor3" onClick={() => this.changeColorFilter("filterEyesColor3")} ></span>
         <span class="dot filterEyesColor4" onClick={() => this.changeColorFilter("filterEyesColor4")} ></span>
         <span class="dot filterEyesColor5" onClick={() => this.changeColorFilter("filterEyesColor5")} ></span>
       </div>

       {/* Mouth */}
       <div style={{ display: this.state.looked_element === 6 ? "block" : "none" }}>
         <span class="dot filterMouthColor1" onClick={() => this.changeColorFilter("filterMouthColor1")} ></span>
         <span class="dot filterMouthColor1" onClick={() => this.changeColorFilter("filterMouthColor1")} ></span>
         <span class="dot filterMouthColor2" onClick={() => this.changeColorFilter("filterMouthColor2")} ></span>
         <span class="dot filterMouthColor3" onClick={() => this.changeColorFilter("filterMouthColor3")} ></span>
       </div>


       {/* Cloth */}
       <div style={{ display: this.state.looked_element === 7 ? "block" : "none" }}>
         <span class="dot filterMouthColor1" onClick={() => this.changeColorFilter("filterMouthColor1")} ></span>
         <span class="dot filterMouthColor1" onClick={() => this.changeColorFilter("filterMouthColor1")} ></span>
         <span class="dot filterMouthColor2" onClick={() => this.changeColorFilter("filterMouthColor2")} ></span>
         <span class="dot filterMouthColor3" onClick={() => this.changeColorFilter("filterMouthColor3")} ></span>
       </div>

      </div>

      <div>

        <button onClick={() => this.changeLookedElement(0)} > Hair </button>
        <button onClick={() => this.changeLookedElement(1)} > Bang </button>
        <button onClick={() => this.changeLookedElement(2)} > Side </button>
        <button onClick={() => this.changeLookedElement(3)} > Eyes </button>
        <button onClick={() => this.changeLookedElement(4)} > Eyebrows </button>
        <button onClick={() => this.changeLookedElement(6)} > Mouth </button>
        <button onClick={() => this.changeLookedElement(7)} > Cloth </button>
      </div>

      <div class="function-buttons">
        <div style={{ display: this.state.looked_element === 0 ? "block" : "none" }}>
          <p>Hair</p>
          {this.getClothOptions("hair")}
        </div>

        <div style={{ display: this.state.looked_element === 1 ? "block" : "none" }}>
          <p>Bang</p>
          {this.getClothOptions("bang")}
        </div>

        <div style={{ display: this.state.looked_element === 2 ? "block" : "none" }}>
          <p>Side</p>
          {this.getClothOptions("side")}
        </div>

        <div style={{ display: this.state.looked_element === 3 ? "block" : "none" }}>
          <p>Eyes</p>
          {this.getClothOptions("eyes")}
        </div>

        <div style={{ display: this.state.looked_element === 4 ? "block" : "none" }}>
          <p>Eyebrows</p>
          {this.getClothOptions("eyebrows")}
        </div>

        <div style={{ display: this.state.looked_element === 6 ? "block" : "none" }}>
          <p>Mouth</p>
          {this.getClothOptions("mouth")}
        </div>

        <div style={{ display: this.state.looked_element === 7 ? "block" : "none" }}>
          <p>Cloth</p>
          {this.getClothOptions("cloth")}
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
    orderIcon: () => {
      dispatch(icons.orderIcon());
    },
    fetchIconParts: () => {
      dispatch(icons.fetchIconParts());
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconMakerTest);
