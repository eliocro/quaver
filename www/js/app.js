'use strict';

var remote = require('remote');

angular.module('quaver', [])

.controller('MainCtrl', function ($scope, $timeout) {
  var player;

  var fileManager = remote.require('./lib/file-manager');
  var audioPlayer = remote.require('./lib/audio-player');

  fileManager.listFiles()
  .then(function (fileList) {
    $timeout(function () {
      $scope.fileList = fileList;

      var first = fileList[0];
      var asset = audioPlayer.getAsset(first);
      console.log(asset);
    });
  });



  $scope.createPlayer = function (fileName) {
    $scope.stop();
    setTimeout(function  () {
      // fileManager.getFile(fileName)
      // .then(function (buffer) {
      //   player = AV.Player.fromBuffer(buffer)
      //   $scope.start();
      // });

      player = audioPlayer.createPlayer(fileName);
      console.log(player);
      $scope.start();
    });
  };



  // Player controls
  $scope.start = function () {
    if(!player) {
      return;
    }

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
