angular.module('auth.controller', ['components.auth', 'components.location'])

.controller('LoginCtrl', function ($scope, Auth, $state, Location, $q) {
	var that = this;

	$scope.user = {};
	$scope.user.email = Auth.getLogin();
	$scope.user.password = Auth.getPassword();
	$scope.isLogin = false;
	$scope.errors = null;

	that.updateLocation = function () {
		return $q(function (resolve, reject) {
			if (Auth.getCurrentUser().keepLocation == true) {
				Location.getLongLat().then(function (loc) {
					Auth.setCurrentLocation(loc.long, loc.lat)
						.then(resolve)
						.catch(reject);
				}).catch(reject);
			} else {
				resolve({
					message: 'keepLocation disabled'
				});
			}
		});
	}

	$scope.login = function () {
		$scope.isLogin = true;
		$scope.error = null;
		Auth.login($scope.user.email, $scope.user.password)
			.then(function () {
				$scope.isLogin = false;
				that.updateLocation();
				$state.go('home.dash');
			})
			.catch(function (response) {
				$scope.isLogin = false;
				if (!response) {
					$scope.error = 'No response';
				} else if (response.message) {
					$scope.error = response.message;
				} else {
					$scope.error = 'Unknown error';
				}
			});
	}
});
