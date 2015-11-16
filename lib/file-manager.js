'use strict';

const fs = require('fs');
const q = require('q');

const path = './data';

var manager = {
  getFile: function (name) {
    var d = q.defer();

    fs.readFile('./data/' + name, (err, data) => {
      if(err) {
        return d.reject(err);
      }
      d.resolve(data);
    });

    return d.promise;
  },


  listFiles: function () {
    var d = q.defer();

    fs.readdir(path, (err, data) => {
      if(err) {
        return d.reject(err);
      }
      d.resolve(data);
    });

    return d.promise;
  }
};


module.exports = manager;
