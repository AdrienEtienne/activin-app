angular.module('menu.controller', ['components.user'])

.controller('MainMenuCtrl', function (User) {
  var that = this;

  that.name = User.getCurrentUser().name;

  that.email = User.getCurrentUser().email;
});
