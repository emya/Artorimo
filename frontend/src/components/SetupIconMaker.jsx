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
    if (prevProps.icons !== this.props.icons){
      if (this.props.icons.icon_parts){
        for (var key in this.props.icons.icon_parts) {
          if (this.props.icons.icon_parts.hasOwnProperty(key)) {
            if (this.props.icons.icon_parts[key] === 0){
              if (key === "accessories") {
                this.setState({
                  [key]: []
                })
              }else{
                this.setState({
                  [key]: null
                })
              }

            }else{
              if (key === "accessories") {
                this.setState({
                  [key]: []
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
      if (this.props.icons.isRemoved === true){
        console.log("reload");
        window.location.reload(true);
      }
    }
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
      fillingFile: []
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

  removeChosenAccessory = (optionNumber) => {
    if (optionNumber === null){
      this.setState({accessories: []});
      return false;
    }

    let accessories = [...this.state.accessories]; // make a separate copy of the array
    let index = accessories.indexOf(optionNumber)
    if (index !== -1) {
      accessories.splice(index, 1);
      this.setState({accessories: accessories});
    }
  }

  handleRemoveOption = (optionNumber) => {
    let removedFiles = [...this.state.removedFiles]; // make a separate copy of the array
    let index = removedFiles.indexOf(optionNumber)
    if (index !== -1) {
      removedFiles.splice(index, 1);
      this.setState({removedFiles: removedFiles});
      return false;
    }

    this.setState({ removedFiles: [...this.state.removedFiles, optionNumber] })
  }

  removeChosenOption = (e) => {
    e.preventDefault();
    this.props.removeIconParts(
      this.state.artist_id,
      this.state.mapping[this.state.looked_element],
      this.state.removedFiles
    );
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
      let line = "";
      if (!this.state.line_only_elements.includes(optionName)){
        line = "_line";
      }
      for (var i = 1; i <= this.props.icons.icon_parts[optionName]; i++) {
        content.push(
          <div class="column">
            {this.state[optionName] === i ? (
              <img class="chosen"
                   src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/${optionName}${line}${i}.png`}
                   onClick={this.changeOption.bind(this, optionName, i)}
              />
            )
            : (
              <img class="choice"
                   src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/${optionName}${line}${i}.png`}
                   onClick={this.changeOption.bind(this, optionName, i)}
              />
            )}
            <div>
              <input type="checkbox" onChange={this.handleRemoveOption.bind(this, i)} />
              {this.state.selected_language === "jpn" ? (
                "アイテムを削除するため選択"
                 ) : (
                "Select this item to delete"
              )}
            </div>
          </div>
        )
      }
      content.push(<button style={{width:"70%"}} class="form-send-btn btn" onClick={this.removeChosenOption} >
              {this.state.selected_language === "jpn" ? (
                "選択したアイテムを削除"
                 ) : (
                "Remove selected item(s)"
              )}</button>)
      return content;
    }
    return [<div>
             {this.state.selected_language === "jpn" ? (
                "アップロードされたアイテムはありません"
                 ) : (
                "No parts uploaded"
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
                 onClick={this.removeChosenAccessory.bind(this, null)}
            > Unselected </button>
          )
          : (
            <button class="choice"
                 onClick={this.removeChosenAccessory.bind(this, null)}
            > Disable </button>
          )}
        </div>
      )

      for (var i = 1; i <= this.props.icons.icon_parts[optionName]; i++) {
        content.push(
          <div class="column">
            {this.state[optionName].includes(i) ? (
              <img class="chosen"
                   src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/${optionName}${i}.png`}
                   onClick={this.removeChosenAccessory.bind(this, i)}
              />
            )
            : (
              <img class="choice"
                   src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/${optionName}${i}.png`}
                   onClick={this.chooseAccessory.bind(this, i)}
              />
            )}
            <div>
              <input type="checkbox" onChange={this.handleRemoveOption.bind(this, i)} />
              {this.state.selected_language === "jpn" ? (
                "アイテムを削除するため選択"
                 ) : (
                "Select this item to delete"
              )}
            </div>
          </div>
        )
      }
      content.push(<button style={{width:"70%"}} class="form-send-btn btn" onClick={this.removeChosenOption} >
              {this.state.selected_language === "jpn" ? (
                "選択したアイテムを削除"
                 ) : (
                "Remove selected item(s)"
              )}</button>)
      return content;
    }
    return [<div>
             {this.state.selected_language === "jpn" ? (
                "アップロードされたアイテムはありません"
                 ) : (
                "No parts uploaded"
              )}
             </div>];
  }


  uploadIconParts = (e) => {
    e.preventDefault();

    if (this.state.line_only_elements.includes(this.state.mapping[this.state.looked_element])){
      this.props.uploadIconParts(
        this.state.artist_id,
        this.state.mapping[this.state.looked_element],
        this.state.imageFiles
      );
      this.setState({
        imageFiles: [],
      });
    } else {
      const errors = this.validateUpload();
      if (errors.length > 0) {
        this.setState({ errors });
        return;
      }

      this.props.uploadPairedParts(
        this.state.artist_id,
        this.state.mapping[this.state.looked_element],
        this.state.lineFile,
        this.state.fillingFile
      );

      this.setState({
        lineFile: [],
        fillingFile: [],
      });
    }
  }

  validateUpload = () => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if (this.state.lineFile.length !== 1){
      errors.push("線画を一枚選択してください / Please select one image for Line.")
    }

    if (this.state.fillingFile.length !== 1){
      errors.push("塗りつぶし用の絵を一枚選択してください / Please select one image for Filling.")
    }
    return errors;
   }

  onDrop = (imageFiles) => {
    this.setState({ errors: [] });

    if (imageFiles.length > 5) {
      this.setState({ errors: "Files to be uploaded are up to 5" });
      return;
    }

    for (var img in imageFiles) {
      if (img.size > 500000){
        this.setState({ errors: "500KB以下の写真を選択してください / Please Select an image smaller than 500KB." });
        return;
      }
    }

    this.setState({
        imageFiles: imageFiles
    })
  }

  onDropLine = (imageFiles) => {
    this.setState({ line_errors: [] });
    this.setState({ errors: [] });

    if (imageFiles.length > 1) {
      this.setState({ line_errors: "線画は一枚のみ選択してください / Only one file allowed for lining" });
      return;
    }

    if (imageFiles.length === 1 && imageFiles[0].size > 500000){
      this.setState({ line_errors: "線画のサイズが500KBを超えています / Please Select an image smaller than 500KB." });
      return;
    }

    this.setState({
      lineFile: imageFiles
    })
  }

  onDropFilling = (imageFiles) => {
    this.setState({ filling_errors: [] });
    this.setState({ errors: [] });

    if (imageFiles.length > 1) {
      this.setState({ filling_errors: "塗りつぶし用の絵は一枚のみ選択してください / Only one file allowed for filling" });
      return;
    }

    if (imageFiles.length === 1 && imageFiles[0].size > 500000){
      this.setState({ filling_errors: "塗りつぶし用の絵のサイズが500KBを超えています / Please Select an image smaller than 500KB." });
      return;
    }

    this.setState({
      fillingFile: imageFiles
    })
  }

  render() {
    const previewStyle = {
      display: 'inline',
      width: 50,
      height: 50,
    };

    const previewPairedStyle = {
      //display: 'inline',
      position: 'relative',
      top: 0,
      left: 0,
      width: 150,
      height: 150,
    };

    const previewColoredStyle = {
      //display: 'inline',
      position: 'relative',
      top: 0,
      left: -150,
      width: 150,
      height: 150,
      filter: "url(#filterHairColor6)",
      WebkitFilter: "url(#filterHairColor6)"
    };

    const accessories = this.state.accessories;
    const errors = this.state.errors;
    const line_errors = this.state.line_errors;
    const filling_errors = this.state.filling_errors;

    console.log(this.state.removedFiles);

    return (
  <div>
    <Header />
    <div class="wrapper-icon clearfix">

      <div class="icon-container ">
      {/*<div class="parent">*/}
        <div class="icon-container-left">
        {this.state.face > 0 && (
          <img class="image1 imgFace"
               style={{filter: `url(#filterSkinColor${this.state.face_classes})`, WebkitFilter: `url(#filterSkinColor${this.state.face_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/face${this.state.face}.png`}
          />
        )}
        {this.state.face > 0 && (
          <img class="image1 imgFaceLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/face_line${this.state.face}.png`}
          />
        )}

        {/* Hair */}
        {this.state.hair > 0 && (
          <img class="image1 imgHair"
               style={{filter: `url(#filterHairColor${this.state.hair_classes})`, WebkitFilter: `url(#filterHairColor${this.state.hair_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/hair${this.state.hair}.png`}
          />
        )}
        {this.state.hair > 0 && (
          <img class="image1 imgHairLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/hair_line${this.state.hair}.png`}
          />
        )}

        {this.state.bang > 0 && (
          <img class="image1 imgBang"
               style={{filter: `url(#filterHairColor${this.state.bang_classes})`, WebkitFilter: `url(#filterHairColor${this.state.bang_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/bang${this.state.bang}.png`}
          />
        )}
        {this.state.bang > 0 && (
          <img class="image1 imgBangLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/bang_line${this.state.bang}.png`}
          />
        )}

        {this.state.side > 0 && (
          <img class="image1 imgSide"
               style={{filter: `url(#filterHairColor${this.state.side_classes})`, WebkitFilter: `url(#filterHairColor${this.state.side_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/side${this.state.side}.png`}
          />
        )}
        {this.state.side > 0 && (
          <img class="image1 imgSideLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/side_line${this.state.side}.png`}
          />
        )}

        {/* Eyes */}
        {this.state.eyes > 0 && (
          <img class="image1 imgEyes"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/eyes_line${this.state.eyes}.png`}
          />
        )}
        {this.state.eyes > 0 && (
          <img class="image1 imgEyeballs"
               style={{filter: `url(#filterEyesColor${this.state.eyes_classes})`, WebkitFilter: `url(#filterEyesColor${this.state.eyes_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/eyes${this.state.eyes}.png`}
          />
        )}

        {/* Eyebrow */}
        {this.state.eyebrows > 0 && (
          <img class="image1 imgEyebrows"
               style={{filter: `url(#filterHairColor${this.state.eyebrows_classes})`, WebkitFilter: `url(#filterHairColor${this.state.eyebrows_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/eyebrows${this.state.eyebrows}.png`}
          />
        )}
        {this.state.eyebrows > 0 && (
          <img class="image1 imgEyebrowsLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/eyebrows_line${this.state.eyebrows}.png`}
          />
        )}

        {/* Nose */}
        {this.state.nose > 0 && (
          <img class="image1 imgNose"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/nose${this.state.nose}.png`}
          />
        )}

        {/* Mouth */}
        {this.state.mouth > 0 && (
          <img class="image1 imgMouth"
               style={{filter: `url(#filterMouthColor${this.state.mouth_classes})`, WebkitFilter: `url(#filterMouthColor${this.state.mouth_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/mouth${this.state.mouth}.png`}
          />
        )}
        {this.state.mouth > 0 && (
          <img class="image1 imgMouthLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/mouth_line${this.state.mouth}.png`}
          />
        )}

        {/* Cloth */}
        {this.state.cloth > 0 && (
          <img class="image1 imgCloth"
               style={{filter: `url(#filterClothColor${this.state.cloth_classes})`, WebkitFilter: `url(#filterClothColor${this.state.cloth_classes})`}}
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/cloth${this.state.cloth}.png`}
          />
        )}
        {this.state.cloth > 0 && (
          <img class="image1 imgClothLine"
               src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/cloth_line${this.state.cloth}.png`}
          />
        )}

        {/* Accessories */}
        {/*this.state.accessories > 0 && (
          <img class="image1 imgCloth"
            src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/accessories${this.state.accessories}.png`}
          />
        )*/}

        {/* Accessories */}
        {accessories.map(accessory => (
          <img class="image1 imgCloth"
            src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/accessories${accessory}.png`}
          />
        ))}

        {/* Glasses */}
        {this.state.glasses > 0 && (
          <img class="image1 imgCloth"
            src={`https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/uploaded_icons/${this.state.artist_id}/glasses${this.state.glasses}.png`}
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

       <div class="upload-memo-pad">
         {!this.state.line_only_elements.includes(this.state.mapping[this.state.looked_element]) && this.state.selected_language === "jpn" &&
           <p>線画と塗りつぶし部分をセットで選択してアップロードをクリックしてください</p>
         }

         {!this.state.line_only_elements.includes(this.state.mapping[this.state.looked_element]) && this.state.selected_language !== "jpn" &&
           <p>Select a pair of a line drawing and a colored area and click Upload</p>
         }

       </div>

       {this.state.line_only_elements.includes(this.state.mapping[this.state.looked_element]) &&
         <Dropzone onDrop={acceptedFiles => this.onDrop(acceptedFiles)}>
           {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div class="dropzone-icon-upload">
                  {this.state.selected_language === "jpn" ? (
                    <p class="dropzone-text">絵を選択/ドラッグ＆ドロップしてください (一度に５枚まで)</p>) : (
                    <p>Drag & drop or click to select up to 5 files</p>
                  )}
                </div>
              </div>
            </section>
           )}
         </Dropzone>
       }

       {!this.state.line_only_elements.includes(this.state.mapping[this.state.looked_element]) &&
         <div>
           <Dropzone onDrop={acceptedFiles => this.onDropLine(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div class="dropzone-icon-line-upload">
                    {this.state.selected_language === "jpn" ? (
                      <p class="dropzone-text">線画（輪郭部分）の絵を選択/ドラッグ＆ドロップしてください</p>) : (
                      <p>Drag & drop or click to select a file for a ling drawing</p>
                    )}
                  </div>
                </div>
              </section>
            )}
           </Dropzone>
          {line_errors.length > 0 && <p class="error-heading">エラー: {line_errors}</p>}
           <Dropzone onDrop={acceptedFiles => this.onDropFilling(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div class="dropzone-icon-colored-upload">
                    {this.state.selected_language === "jpn" ? (
                      <p class="dropzone-text">塗りつぶし用の絵を選択/ドラッグ＆ドロップしてください</p>) : (
                      <p>Drag & drop or click to select a file for a colored area</p>
                    )}
                  </div>
                </div>
              </section>
            )}
           </Dropzone>
          {filling_errors.length > 0 && <p class="error-heading">エラー: {filling_errors}</p>}
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

       {(this.state.lineFile.length === 1 || this.state.fillingFile.length === 1) &&
         <Fragment>
           <h3>Previews</h3>
             <div class="preview">
               {this.state.lineFile.length === 1 && (
                 <img
                  alt="Preview"
                  class="imgFaceLine"
                  key={this.state.lineFile[0].preview}
                  src={URL.createObjectURL(this.state.lineFile[0])}
                  style={previewPairedStyle}
                 />
               )}
               {this.state.fillingFile.length === 1 && (
                 <img
                  alt="Preview"
                  class="imgFace"
                  key={this.state.fillingFile[0].preview}
                  src={URL.createObjectURL(this.state.fillingFile[0])}
                  style={previewColoredStyle}
                 />
               )}
               {this.state.fillingFile.length === 1 && this.state.selected_language === "jpn" &&
                  <p>サンプルの色で塗った状態で表示しています</p>
               }
               {this.state.fillingFile.length === 1 && this.state.selected_language !== "jpn" &&
                  <p>Showing with sample color</p>
               }
             </div>
         </Fragment>
       }

      {errors.map(error => (
        <p class="error-heading" key={error}>エラー: {error}</p>
      ))}
        <button style={{width:"50%"}} class="form-send-btn btn" onClick={this.uploadIconParts}>
          {/*Upload Parts of {this.state.mapping[this.state.looked_element]}*/}
          {this.state.selected_language === "jpn" ? (
            "アップロード"
             ) : (
            "Upload"
          )}
        </button>
      </div>
    </div>

    <div class="icon-uploaded-completed">
      <button style={{width:"45%", float: "left", marginLeft: "30px", marginBottom: "30px"}} class="form-send-btn btn"> 保存して戻る </button>
      <button style={{width:"45%", float: "left", marginLeft: "30px", marginBottom: "30px"}} class="form-send-btn btn"> 完了する </button>
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
        <h3 style={{width:"50%"}}>Uploaded Accessories</h3>
        {this.getAvailableAccessoriesOptions()}
      </div>

      <div style={{ display: this.state.looked_element === 10 ? "block" : "none" }}>
        <h3 style={{width:"50%"}}>Uploaded Glasses</h3>
        {this.getAvailableOptions("glasses")}
      </div>

    </div>
    </div>
    { /*<button class="form-send-btn btn" onClick={this.proceedCheckout}>Proceed to Checkout</button> */}
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
    uploadIconParts: (artist_id, icon_part, imageFiles) => {
      dispatch(icons.uploadIconParts(artist_id, icon_part, imageFiles));
    },
    removeIconParts: (artist_id, icon_part, removedFiles) => {
      dispatch(icons.removeIconParts(artist_id, icon_part, removedFiles));
    },
    uploadPairedParts: (artist_id, icon_part, lineFile, fillingFile) => {
      dispatch(icons.uploadPairedParts(artist_id, icon_part, lineFile, fillingFile));
    },
    fetchIconParts: (artist_id) => {
      dispatch(icons.fetchIconParts(artist_id, true));
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupIconMaker);
