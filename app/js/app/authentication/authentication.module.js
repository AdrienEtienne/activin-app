angular.module('authentication.module', [
  'login.controller',
  'signup.controller'
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
