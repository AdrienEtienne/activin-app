angular.module('starter.controllers', ['ngResource'])

.controller('DashCtrl', function ($scope, $resource, appConfig, $http) {
  var Sport = $resource(appConfig.apiUrl + '/api/sports');
  $scope.sports = Sport.query(
    function (data) {
      console.log(data);
    },
    function (err) {
      console.log(err);
    });

  $scope.add = function (name) {
    var sport = new Sport({
      name: name
    });
    sport.save().then(function (response) {
      console.log('then save', response);
    }).catch(function (response) {
      console.log('catch save', response);
    });
  }
})

.controller('ChatsCtrl', function ($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function (chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
