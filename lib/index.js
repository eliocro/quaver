'use strict';


const fs = require('fs');

const AV = require('av');
require('mp3');
require('flac.js');
require('aac');
require('alac');


var file;


module.exports = {
  play: () => {
    file = file || AV.Player.fromFile('./data/take-five.flac');
    file.play();
  },

  pause: () => {
    file.togglePlayback();
  },

  stop: () => {
    file.stop();
    file = null;
  },
};



module.exports.play();
