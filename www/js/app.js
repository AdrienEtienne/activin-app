// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'activinApp.constants',
  'starter.controllers',
  'starter.services'
])

.run(function ($ionicPlatform, Auth, $state) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  if (Auth.getLogin() && Auth.getPassword()) {
    Auth
      .login(Auth.getLogin(), Auth.getPassword())
      .then(function () {
        $state.go('home.dash');
      }).catch(function () {
        $state.go('login');
      })
  } else {
    Auth.logout();
    $state.go('login');
  }
})

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = true;

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/auth/login.html',
      controller: 'LoginCtrl'
    })
    .state('home', {
      url: '/home',
      abstract: true,
      templateUrl: 'templates/menus.html'
    })
    .state('home.dash', {
      url: '/dash',
      views: {
        'home-dash': {
          templateUrl: 'templates/dash.html',
          controller: 'DashCtrl'
        }
      }
    })
    .state('home.account', {
      url: '/account',
      views: {
        'home-dash': {
          templateUrl: 'templates/account/list.html',
          controller: 'AccountCtrl'
        }
      }
    })
    .state('home.mysports', {
      url: '/account/mysports',
      views: {
        'home-dash': {
          templateUrl: 'templates/account/my-sports.html',
          controller: 'MySportsAccountCtrl'
        }
      }
    })
    .state('home.information', {
      url: '/information',
      views: {
        'home-dash': {
          templateUrl: 'templates/information.html',
          controller: 'InformationCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
