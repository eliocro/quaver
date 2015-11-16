'use strict';

angular.module('quaver', [])

.controller('MainCtrl', function ($scope) {
  var buffer, player;
  var fileManager = remote.require('./lib/file-manager');

  fileManager.getFile('significant-other.mp3')
  .then(function (buf) {
    buffer = buf;
  });

  $scope.play = function  () {
    player = player || AV.Player.fromBuffer(buffer);
    player.play();
  };

  $scope.pause = function  () {
    player.pause();
  };

  $scope.stop = function  () {
    player.stop();
    player = null;
  };
})

;
