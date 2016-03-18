angular.module('account.module', [
	'components.auth',
	'components.location',
	'starter.services'
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
					controller: 'AccountCtrl'
				}
			}
		})
		.state('account.mysports', {
			url: '/mysports',
			views: {
				'home-dash@homemenu': {
					templateUrl: 'templates/account/my-sports.html',
					controller: 'MySportsAccountCtrl'
				}
			}
		})
		.state('account.places', {
			url: '/places',
			views: {
				'home-dash@homemenu': {
					templateUrl: 'templates/account/places.html',
					controller: 'PlacesAccountCtrl'
				}
			}
		});
})

.controller('AccountCtrl', function ($scope, Auth, $state, Location) {
	var that = this;
	that.user = Auth.getCurrentUser();

	$scope.keepLocation = function (newVal) {
		if (arguments.length) {
			if (newVal === true) {
				that.user.keepLocation = true;
				Location.getLongLat().then(function (loc) {
					Auth.setCurrentLocation(loc.long, loc.lat);
				});
			} else {
				that.user.keepLocation = false;
				Auth.setCurrentLocation();
			}
		} else {
			return that.user.keepLocation;
		}
	};

	$scope.logout = function () {
		Auth.logout();
		$state.go('login');
	};
});
