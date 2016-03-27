angular.module('dashboard.module', [
  'ui.router',
  'search.service',
  'components.util'
])

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
    });
});
