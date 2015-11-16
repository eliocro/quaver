'use strict';

var remote = require('remote');

angular.module('quaver', [])

.controller('MainCtrl', function ($scope, $timeout) {
  var buffer, player;
  var fileManager = remote.require('./lib/file-manager');

  fileManager.listFiles()
  .then(function (fileList) {
    $timeout(function () {
      $scope.fileList = fileList;
    });
  });

  $scope.start = function (fileName) {
    $scope.stop();

    $timeout(function  () {
      fileManager.getFile(fileName)
      .then(function (buf) {
        buffer = buf;
        $scope.play();
      });
    });
  };

  $scope.play = function  () {
    if(!player && !buffer) {
      return;
    }

    // Create new player
    player = player || AV.Player.fromBuffer(buffer);

    // Setup listeners
    player.on('duration', function (duration) {
      console.log('duration', arguments);
      $timeout(function () {
        $scope.duration = msToTime(duration);
      });
    });

    player.on('metadata', function (metadata) {
      console.log('metadata', metadata);
      $timeout(function () {
        $scope.metadata = metadata;
      });
    });

    player.on('progress', function (progress) {
      $timeout(function () {
        $scope.progress = msToTime(progress);
      });
    });

    player.on('end', function () {
      console.log('file ended');
    });

    // Start player
    player.play();
  };

  $scope.toggle = function  () {
    if(player) {
      player.togglePlayback();
    }
  };

  $scope.stop = function  () {
    if(player) {
      player.stop();
      player = null;
    }

    $scope.progress = '00:00';
    $scope.duration = '00:00';
  };


  function msToTime (duration) {
    var seconds = parseInt((duration/1000)%60);
    var minutes = parseInt(duration/(1000*60));

    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    return minutes + ':' + seconds;
  }
})

;
