import React, { Component } from 'react';

class Filters extends Component {
  render() {
    return (
  <svg>
    <defs>
      <filter id="filterHairColor1" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 .145   0 0 0 0 .160   0 0 0 0 .129   0 0 0 1 0"/>
      </filter>
      <filter id="filterHairColor2" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 .356   0 0 0 0 .121   0 0 0 0 .098   0 0 0 1 0"/>
      </filter>
      <filter id="filterHairColor3" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 .380   0 0 0 0 .278   0 0 0 0 .231   0 0 0 1 0"/>
      </filter>
      <filter id="filterHairColor4" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 .917   0 0 0 0 .847   0 0 0 0 .701   0 0 0 1 0"/>
      </filter>
      <filter id="filterHairColor5" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 .627   0 0 0 0 .525   0 0 0 0 .462   0 0 0 1 0"/>
      </filter>
      <filter id="filterHairColor6" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 .811   0 0 0 0 .631   0 0 0 0 .494   0 0 0 1 0"/>
      </filter>
      <filter id="filterHairColor7" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 1.0   0 0 0 0 .976   0 0 0 0 .913   0 0 0 1 0"/>
      </filter>

      <filter id="filterSkinColor1" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 1.0   0 0 0 0 1.0   0 0 0 0 1.0   0 0 0 1 0"/>
      </filter>
      <filter id="filterSkinColor2" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.929   0 0 0 0 0.843   0 0 0 0 0.756   0 0 0 1 0"/>
      </filter>
      <filter id="filterSkinColor3" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.913   0 0 0 0 0.788   0 0 0 0 0.694   0 0 0 1 0"/>
      </filter>
      <filter id="filterSkinColor4" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.843   0 0 0 0 0.639   0 0 0 0 0.521  0 0 0 1 0"/>
      </filter>
      <filter id="filterSkinColor5" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.772   0 0 0 0 0.521   0 0 0 0 0.309  0 0 0 1 0"/>
      </filter>
      <filter id="filterSkinColor6" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.584   0 0 0 0 0.305   0 0 0 0 0.117  0 0 0 1 0"/>
      </filter>

      <filter id="filterEyesColor1" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.686   0 0 0 0 0.686   0 0 0 0 0.466  0 0 0 1 0"/>
      </filter>
      <filter id="filterEyesColor2" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.686   0 0 0 0 0.756   0 0 0 0 0.827  0 0 0 1 0"/>
      </filter>
      <filter id="filterEyesColor3" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.772   0 0 0 0 0.545   0 0 0 0 0.356  0 0 0 1 0"/>
      </filter>
      <filter id="filterEyesColor4" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.4   0 0 0 0 0.231   0 0 0 0 0.149  0 0 0 1 0"/>
      </filter>
      <filter id="filterEyesColor5" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.223   0 0 0 0 0.145   0 0 0 0 0.133  0 0 0 1 0"/>
      </filter>

      <filter id="filterMouthColor1" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.898   0 0 0 0 0.301   0 0 0 0 0.196  0 0 0 1 0"/>
      </filter>
      <filter id="filterMouthColor2" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.929   0 0 0 0 0.623   0 0 0 0 0.607  0 0 0 1 0"/>
      </filter>
      <filter id="filterMouthColor3" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.968   0 0 0 0 0.827   0 0 0 0 0.764  0 0 0 1 0"/>
      </filter>
      <filter id="filterMouthColor4" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.435   0 0 0 0 0.133   0 0 0 0 0.086  0 0 0 1 0"/>
      </filter>
      <filter id="filterMouthColor5" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.858   0 0 0 0 0.364   0 0 0 0 0.411  0 0 0 1 0"/>
      </filter>
      <filter id="filterMouthColor6" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.929   0 0 0 0 0.458   0 0 0 0 0.262  0 0 0 1 0"/>
      </filter>

      <filter id="filterClothColor1" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.960   0 0 0 0 0.827   0 0 0 0 0.819  0 0 0 1 0"/>
      </filter>
      <filter id="filterClothColor2" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.827   0 0 0 0 0.866   0 0 0 0 0.905  0 0 0 1 0"/>
      </filter>
      <filter id="filterClothColor3" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.913   0 0 0 0 0.843   0 0 0 0 0.725  0 0 0 1 0"/>
      </filter>
      <filter id="filterClothColor4" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.788   0 0 0 0 0.607   0 0 0 0 0.384  0 0 0 1 0"/>
      </filter>
      <filter id="filterClothColor5" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.898   0 0 0 0 0.780   0 0 0 0 0.866  0 0 0 1 0"/>
      </filter>
      <filter id="filterClothColor6" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.717   0 0 0 0 0.764   0 0 0 0 0.6    0 0 0 1 0"/>
      </filter>
      <filter id="filterClothColor7" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.223   0 0 0 0 0.145   0 0 0 0 0.133  0 0 0 1 0"/>
      </filter>
    </defs>
  </svg>
    );
  }
}

export default Filters;
