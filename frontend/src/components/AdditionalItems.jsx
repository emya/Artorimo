import React, { Component } from 'react';
import {connect} from 'react-redux';

import ReactDropzone from 'react-dropzone';

import {auth} from "../actions";
import Filters from './Filters';
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { keys } from '../keys.js';
import '../css/style.scss';


// Mask images
const images0 = [
  `https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/items/all-over-print-premium-face-mask-black-right-609990d986a22.jpg`,
  `https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/items/all-over-print-premium-face-mask-black-front-609990d986baf.jpg`,
];

// iPhone images
const images1 = [
  `https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/items/iphone-case-iphone-11-case-on-phone-6099968906c57.png`,
  `https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/items/iphone-case-iphone-11-case-with-phone-6099968906d3c.png`,
];

// Tote bag
const images2 = [
  `https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/items/eco-tote-bag-oyster-front-609994ad90e62.png`,
  `https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/items/eco-tote-bag-oyster-front-609994ad90f49.png`,
];

// Stickers
const images3 = [
  `https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/items/kiss-cut-stickers-4x4-default-609996ae3598c.png`,
  `https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/items/kiss-cut-stickers-5.5x5.5-lifestyle-1-609996ae35aff.png`,
];

// Post Cards
const images4 = [
  `https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/items/standard-postcard-4x6-front-609996d0dbfb8.png`,
  `https://${keys.AWS_BUCKET}.s3-us-west-2.amazonaws.com/img/items/standard-postcard-4x6-front-609996d0dc024.png`,
];

class AdditionalItems extends Component {
  // Item Number
  /*
    0: Mask
    1: iPhone Case
    2: Tote Bag
    3: Stickers
    4: Post card
  */
  componentWillUpdate(nextProps, nextState) {
    if (nextState.added_items !== this.state.added_items){
      this.props.parentCallback(nextState.added_items);
    }
  }

  state = {
    photoIndex: 0,
    isOpen: false,
    added_items : [],
    item_number: 0,
    images: {
      0: images0,
      1: images1,
      2: images2,
      3: images3,
      4: images4,
    },
    prices: {
      0: 28,
      1: 21,
      2: 34,
      3: 8,
      4: 7,
    }
  }

  handleAddedItemsChange = (item_number, action) => {
    if (action === -1){
      this.setState({
        added_items: this.state.added_items.filter((_, i) => _ !== item_number)
      });
    }
    else {
      this.setState(prevState => ({
        added_items: [...prevState.added_items, item_number]
      }))
    }
  }

  openLightbox = (item_number) => {
    this.setState({
      isOpen: true,
      item_number: item_number
    })
  };

  closeLightbox = () => {
    this.setState({
      isOpen: false
    })
  };


  render() {
    const photoIndex = this.state.photoIndex;
    const images = this.state.images[this.state.item_number];

    return (
    <div>
      {this.state.isOpen &&
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => this.setState({ isOpen: false })}
          onMovePrevRequest={() =>
            this.setState({
              photoIndex: (photoIndex + images.length - 1) % images.length,
            })
          }
          onMoveNextRequest={() =>
            this.setState({
              photoIndex: (photoIndex + 1) % images.length,
            })
          }
        />
      }

      <h2> Add Items </h2>
      <tr>
        <td>
          <h3> Face Mask </h3>
          <img class="top-item-img"
            src={images0[0]}
            onClick={() => this.openLightbox(0)}
          />
          <p> $ {this.state.prices[0]} </p>
          { this.state.added_items.includes(0) ? (
            <div>
              Remove from the cart
              <input class="checkbox" type="radio" onClick={this.handleAddedItemsChange.bind(this, 0, -1)} checked />
            </div>
          ):(
            <div>
              Add to the cart
              <input class="checkbox" type="radio" onClick={this.handleAddedItemsChange.bind(this, 0, 1)} />
            </div>
          )}
        </td>

        <td>
          <h3> iPhone Case </h3>
          <img class="top-item-img"
            src={images1[0]}
            onClick={() => this.openLightbox(1)}
          />
          <p> $ {this.state.prices[1]} </p>
          { this.state.added_items.includes(1) ? (
            <div>
              Remove from the cart
              <input class="checkbox" type="radio" onClick={this.handleAddedItemsChange.bind(this, 1, -1)} checked />
            </div>
          ):(
            <div>
              Add to the cart
              <input class="checkbox" type="radio" onClick={this.handleAddedItemsChange.bind(this, 1, 1)} />
            </div>
          )}
        </td>

        <td>
          <h3> Tote Bag </h3>
          <img class="top-item-img"
            src={images2[0]}
            onClick={() => this.openLightbox(2)}
          />
          <p> $ {this.state.prices[2]} </p>
          { this.state.added_items.includes(2) ? (
            <div>
              Remove from the cart
              <input class="checkbox" type="radio" onClick={this.handleAddedItemsChange.bind(this, 2, -1)} checked />
            </div>
          ):(
            <div>
              Add to the cart
              <input class="checkbox" type="radio" onClick={this.handleAddedItemsChange.bind(this, 2, 1)} />
            </div>
          )}
        </td>

        <td>
          <h3> Stickers </h3>
          <img class="top-item-img"
            src={images3[0]}
            onClick={() => this.openLightbox(3)}
          />
          <p> $ {this.state.prices[3]} </p>
          { this.state.added_items.includes(3) ? (
            <div>
              Remove from the cart
              <input class="checkbox" type="radio" onClick={this.handleAddedItemsChange.bind(this, 3, -1)} checked />
            </div>
          ):(
            <div>
              Add to the cart
              <input class="checkbox" type="radio" onClick={this.handleAddedItemsChange.bind(this, 3, 1)} />
            </div>
          )}
        </td>

        <td>
          <h3> Post card </h3>
          <img class="top-item-img"
            src={images4[0]}
            onClick={() => this.openLightbox(4)}
          />
          <p> $ {this.state.prices[4]} </p>
          { this.state.added_items.includes(4) ? (
            <div>
              Remove from the cart
              <input class="checkbox" type="radio" onClick={this.handleAddedItemsChange.bind(this, 4, -1)} checked />
            </div>
          ):(
            <div>
              Add to the cart
              <input class="checkbox" type="radio" onClick={this.handleAddedItemsChange.bind(this, 4, 1)} />
            </div>
          )}
        </td>

      </tr>
    </div>
    )
  }
}

export default AdditionalItems;
