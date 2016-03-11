angular.module('auth.controller', ['components.auth'])

.controller('LoginCtrl', function ($scope, Auth, $state) {
	var that = this;

	$scope.user = {};
	$scope.user.email = Auth.getLogin();
	$scope.user.password = Auth.getPassword();
	$scope.isLogin = false;
	$scope.errors = null;

	$scope.login = function () {
		$scope.isLogin = true;
		$scope.error = null;
		Auth.login($scope.user.email, $scope.user.password)
			.then(function () {
				$scope.isLogin = false;
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
