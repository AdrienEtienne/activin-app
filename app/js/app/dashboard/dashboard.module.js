angular.module('dashboard.module', [])

.config(function ($stateProvider) {

  $stateProvider
    .state('homemenu.dash', {
      url: '/dash',
      views: {
        'home-dash': {
          templateUrl: 'templates/dash.html'
        }
      },
      cache: false
    });
});
