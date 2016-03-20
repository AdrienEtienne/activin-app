angular.module('login.controller', ['components.auth', 'components.location'])

.controller('LoginCtrl', function($scope, Auth, User, $state, Location, $q) {
  var that = this;

  $scope.user = {};
  $scope.user.email = Auth.getLogin();
  $scope.user.password = Auth.getPassword();
  $scope.isLogin = false;
  $scope.errors = null;

  that.updateLocation = function() {
    return $q(function(resolve, reject) {
      Location.getLongLat().then(function(loc) {
        User.currentLocation(loc.long, loc.lat)
          .then(resolve)
          .catch(reject);
      }).catch(reject);
    });
  };

  $scope.login = function(form) {
    if (form.$valid) {
      $scope.isLogin = true;
      $scope.error = null;
      Auth
        .login($scope.user.email, $scope.user.password)
        .then(function() {
          $scope.isLogin = false;
          that.updateLocation();
          $state.go('homemenu.dash');
        })
        .catch(function(response) {
          $scope.isLogin = false;
          if (!response) {
            $scope.error = 'No response';
          } else if (response.message) {
            $scope.error = response.message;
          } else {
            $scope.error = 'Unknown error';
          }
        });
    } else {
      return;
    }
  };
});