'use strict';

angular.module('$ionicPopupMock', [])
  .factory('$ionicPopup', function () {

    return {
      alert: function () {}
    };
  });