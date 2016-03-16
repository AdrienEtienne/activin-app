angular.module('account.controller', [
		'components.auth',
		'components.location',
		'starter.services'
	])
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
