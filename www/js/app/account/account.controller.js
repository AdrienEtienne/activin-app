angular.module('account.controller', ['components.auth'])
	.controller('AccountCtrl', function ($scope, Auth, $state) {

		$scope.logout = function () {
			Auth.logout();
			$state.go('auth');
		}
	});
