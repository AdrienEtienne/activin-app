angular.module('authentication.module')

.controller('LoginCtrl', function (Auth, User, $state) {
  var that = this;

  that.user = {};
  that.user.email = Auth.getLogin();
  that.user.password = Auth.getPassword();
  that.isLogin = false;
  that.error = null;

  that.login = function (form) {
    if (form.$valid) {
      that.isLogin = true;
      that.error = null;
      Auth
        .login(that.user.email, that.user.password)
        .then(function () {
          that.isLogin = false;
          User.updateLocation();
          $state.go('homemenu.dash');
        })
        .catch(function (response) {
          that.isLogin = false;
          if (!response) {
            that.error = 'No response';
          } else if (response.message) {
            that.error = response.message;
          } else {
            that.error = 'Unknown error';
          }
        });
    } else {
      return;
    }
  };
});