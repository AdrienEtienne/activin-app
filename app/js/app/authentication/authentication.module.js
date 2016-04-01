angular.module('authentication.module', [
  'ui.router',
  'components.oauth',
  'components.auth',
  'components.location',
  'components.util'
])

.config(function ($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/auth/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'vm',
      cache: false
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/auth/signup.html',
      controller: 'SignupCtrl',
      controllerAs: 'vm',
      cache: false
    });
});