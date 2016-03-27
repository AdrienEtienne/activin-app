angular.module('menu.controller', ['components.user'])

.controller('MainMenuCtrl', function (User) {
  var that = this;

  that.user = User.getCurrentUser();
});
