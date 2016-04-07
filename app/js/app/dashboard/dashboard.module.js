angular.module('dashboard.module', [
  'ui.router',
  'ionic',
  'dashboard.controller',
  'workouts.controller',
  'search.service',
  'components.util'
])

.config(function ($stateProvider) {

  $stateProvider
    .state('homemenu.dash', {
      url: '/dash',
      views: {
        'home-dash': {
          templateUrl: 'templates/dash.html',
          controller: 'DashboardCtrl',
          controllerAs: 'vm'
        }
      },
      cache: false
    })
    .state('partners', {
      url: '/partners',
      parent: 'homemenu.dash',
      views: {
        'home-dash@homemenu': {
          templateUrl: 'templates/partners/list.html',
          controller: 'SearchPartnersCtrl',
          controllerAs: 'vm'
        }
      },
      cache: false
    })
    .state('workouts', {
      url: '/workouts',
      parent: 'homemenu.dash',
      views: {
        'home-dash@homemenu': {
          templateUrl: 'templates/workout/workouts.html',
          controller: 'WorkoutsCtrl',
          controllerAs: 'vm'
        }
      },
      cache: false
    })
    .state('sessions.edit', {
      url: '/session/edit',
      parent: 'homemenu.dash',
      views: {
        'home-dash@homemenu': {
          templateUrl: 'templates/workout/edit.html'
        }
      },
      cache: false
    });
});
