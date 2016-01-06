'use strict';

const fs = require('fs');

const AV = require('av');
require('mp3');
require('flac.js');
require('aac');
require('alac');

const folder = './data/';


module.exports = {
  // Create a player for a give file
  createPlayer (file, cb) {
    fs.readFile(folder + file, (err, buffer) => {
      if(err) {
        return cb(err);
      }
      cb(null, AV.Player.fromBuffer(buffer));
    });
  },

  // The the asset with the metada
  getAsset (file) {
    return AV.Asset.fromFile(folder + file);
  }
};


// module.exports.createPlayer('normal.mp3', (err, player) => {
//   player.on('metadata', (data) => {
//     console.log(data);
//   });
//   player.play();
// });

