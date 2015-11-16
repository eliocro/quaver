
angular.module('quaver', [])

.controller('MainCtrl', function ($scope) {
  // var player = remote.require('./lib');
  // console.log(player);

  // var file = new File([], '/Users/elio/Sites/personal/quaver/data/normal.mp3');
  // console.log(file);

  // var player = AV.Player.fromFile(file);
  // console.log(player);


  $scope.play = function  () {
   console.log('play');
   player.play();
  };

  $scope.pause = function  () {
   console.log('pause');
   player.pause();
  };

  $scope.stop = function  () {
   console.log('stop');
   player.stop();
  };
})

;
