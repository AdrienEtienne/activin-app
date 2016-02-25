'use strict';

angular.module('components.oauth')
  .directive('oauthButtons', function () {
    return {
      templateUrl: 'templates/oauth-buttons/oauth-buttons.html',
      restrict: 'EA',
      controller: 'OauthButtonsCtrl',
      controllerAs: 'OauthButtons',
      scope: {
        classes: '@'
      }
    };
  });
