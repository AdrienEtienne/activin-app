angular.module('dashboard.module', [
  'ui.router',
  'ionic',
  'dashboard.controller',
  'partners.controller',
  'workouts.controller',
  'workoutEdit.controller',
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
    .state('workouts.edit', {
      url: '/workout/edit',
      parent: 'homemenu.dash',
      views: {
        'home-dash@homemenu': {
          templateUrl: 'templates/workout/edit.html',
          controller: 'WorkoutEditCtrl',
          controllerAs: 'vm'
        }
      },
      cache: false
    });
});
