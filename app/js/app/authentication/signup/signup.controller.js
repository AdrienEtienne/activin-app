angular.module('authentication.module')

.controller('SignupCtrl', function (Auth, User, $state) {
  var that = this;

  that.user = {};
  that.user.email = Auth.getLogin();
  that.user.password = Auth.getPassword();
  that.isSignup = false;
  that.errors = null;

  that.signup = function (form) {
    if (form.$valid) {
      that.isSignup = true;
      that.error = null;
      Auth
        .createUser({
          name: that.user.name,
          email: that.user.email,
          password: that.user.password
        })
        .then(function () {
          that.isSignup = false;
          User.updateLocation();
          $state.go('homemenu.dash');
        })
        .catch(function (response) {
          that.isSignup = false;
          if (!response) {
            that.error = 'No response';
          } else if (response.errors) {
            if (response.errors.email) {
              that.error = response.errors.email.message;
            } else if (response.errors.password) {
              that.error = response.errors.password.message;
            } else if (response.errors.name) {
              that.error = response.errors.name.message;
            } else {
              that.error = 'Unknown error';
            }
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