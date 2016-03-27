'use strict';

angular.module('starter.controllers', [
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
