angular.module('account.module', [
  'components.auth',
  'starter.services',
  'place.module'
])

.config(function ($stateProvider) {
  $stateProvider
    .state('account', {
      parent: 'homemenu',
      cache: false,
      url: '/account',
      views: {
        'home-dash': {
          templateUrl: 'templates/account/list.html',
          controller: 'AccountCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('account.mysports', {
      url: '/mysports',
      views: {
        'home-dash@homemenu': {
          templateUrl: 'templates/account/my-sports.html',
          controller: 'MySportsCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('account.places', {
      url: '/places',
      views: {
        'home-dash@homemenu': {
          templateUrl: 'templates/place/places.html',
          controller: 'PlacesAccountCtrl',
          controllerAs: 'vm'
        }
      },
      cache: false
    })
    .state('account.place', {
      url: '/place',
      views: {
        'home-dash@homemenu': {
          templateUrl: 'templates/place/edit-place.html',
          controller: 'EditPlaceCtrl',
          controllerAs: 'vm'
        }
      },
      params: {
        place: null
      }
    });
});
