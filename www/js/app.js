'use strict';

var remote = require('remote');

angular.module('quaver', [])

.controller('MainCtrl', function ($scope, $timeout) {
  var player;
  var fileManager = remote.require('./lib/file-manager');


  fileManager.listFiles()
  .then(function (fileList) {
    $timeout(function () {
      $scope.fileList = fileList;
      var asset = fileList[0].getAsset();

      asset.get('duration', function (something) {
        console.log(msToTime(something));
      });
      asset.get('format', function (something) {
        console.log(something);
      });
      asset.get('metadata', function (something) {
        console.log(something);
      });
    });
  });


  $scope.play = function (file) {
    $scope.stop();
    setTimeout(function  () {
      file.getPlayer()
      .then(function (p) {
        player = p;
        $scope.start();
      },
      function (err) {
        console.log(err);
      });
    }, 250);
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
