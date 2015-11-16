'use strict';

var remote = require('remote');

angular.module('quaver', [])

.controller('MainCtrl', function ($scope, $timeout) {
  var buffer, player;
  var fileManager = remote.require('./lib/file-manager');

  fileManager.getFile('significant-other.mp3')
  .then(function (buf) {
    buffer = buf;
  });

  $scope.play = function  () {
    player = player || AV.Player.fromBuffer(buffer);


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

    player.play();
  };

  $scope.pause = function  () {
    player.pause();
  };

  $scope.stop = function  () {
    player.stop();
    player = null;
    $scope.progress = '00:00';
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
