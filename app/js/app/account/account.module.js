angular.module('account.module', [
  'components.auth',
  'starter.services'
])

.config(function($stateProvider) {
  $stateProvider
    .state('account', {
      parent: 'homemenu',
      cache: false,
      url: '/account',
      views: {
        'home-dash': {
          templateUrl: 'templates/account/list.html',
          controller: 'AccountCtrl'
        }
      }
    })
    .state('account.mysports', {
      url: '/mysports',
      views: {
        'home-dash@homemenu': {
          templateUrl: 'templates/account/my-sports.html',
          controller: 'MySportsAccountCtrl'
        }
      }
    })
    .state('account.places', {
      url: '/places',
      views: {
        'home-dash@homemenu': {
          templateUrl: 'templates/account/places.html',
          controller: 'PlacesAccountCtrl'
        }
      }
    });
})

.controller('AccountCtrl', function($scope, Auth, User, $state) {
  $scope.keepLocation = function(newVal) {
    if (arguments.length) {
      User.keepLocation(newVal);
    } else {
      return User.keepLocation();
    }
  };

  $scope.logout = function() {
    Auth.logout();
    $state.go('login');
  };
});