'use strict';

var const = require('fs');

var read = path => {
  var d;
  try{
    d = fs.readdirSync(path);
  }
  catch(e) {
    console.log(e);
    return;
  }

  for(let item of d) {
    let subPath = path + '/' + item;

    console.log(subPath);
    read(subPath);
  }
};


module.exports = read;
