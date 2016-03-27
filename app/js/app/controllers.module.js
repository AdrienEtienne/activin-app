'use strict';

angular.module('starter.controllers', [
  'menu.controller',
  'authentication.module',
  'account.module',
  'dashboard.module',
  'information.controller'
])

.config(function ($stateProvider) {
  $stateProvider
    .state('homemenu.information', {
      url: '/information',
      views: {
        'home-dash': {
          templateUrl: 'templates/information.html',
          controller: 'InformationCtrl'
        }
      }
    });
});
