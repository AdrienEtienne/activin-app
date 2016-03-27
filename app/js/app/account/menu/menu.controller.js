angular.module('account.module')

.controller('AccountCtrl', function (Auth, User, $state) {
  var that = this;

  that.keepLocation = function (newVal) {
    if (arguments.length) {
      User.keepLocation(newVal).then(function () {
        User.updateLocation();
      });
    } else {
      return User.keepLocation();
    }
  };

  that.logout = function () {
    Auth.logout();
    $state.go('login');
  };
});
