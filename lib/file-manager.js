'use strict';

const fs = require('fs');
const q = require('q');

const AudioFile = require('./audio-file');
const path = '/Users/elio/Sites/personal/quaver/data';


var manager = {
  getFile (name) {
    var d = q.defer();

    fs.readFile('./data/' + name, (err, data) => {
      if(err) {
        return d.reject(err);
      }
      d.resolve(data);
    });

    return d.promise;
  },


  listFiles () {
    var d = q.defer();

    fs.readdir(path, (err, data) => {
      if(err) {
        return d.reject(err);
      }

      let res = [];
      for(let file of data) {
        if(file.match(/.+\.(mp3|flac|aac|alac|wav)$/i)) {
          res.push(new AudioFile(path + '/' + file));
        }
      }
      d.resolve(res);
    });

    return d.promise;
  },


  walk (path)  {
    var dir;
    try{
      dir = fs.readdirSync(path);
    }
    catch(e) {
      console.log(e);
      return;
    }

    for(let item of dir) {
      let subPath = path + '/' + item;

      console.log(subPath);
      this.walk(subPath);
    }
  }
};


module.exports = manager;
