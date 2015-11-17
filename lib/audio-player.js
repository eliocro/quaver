'use strict';

const AV = require('av');
require('mp3');
require('flac.js');
require('aac');
require('alac');

const folder = './data/';
var player;


module.exports = {
  createPlayer: function (file) {
    return AV.Player.fromFile(folder + file);
  },

  getAsset: function (file) {
    return AV.Asset.fromFile(folder + file);
  },

  start: function () {
    if(player) {
      player.play();
    }
  },

  toggle: function () {
    if(player) {
      player.togglePlayback();
    }
  },

  stop: function () {
    if(player) {
      player.stop();
      player = null;
    }
  }
};


// module.exports.create('normal.mp3');
// module.exports.start();
