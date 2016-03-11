angular.module('account.controller', [
		'components.auth',
		'starter.services'
	])
	.controller('AccountCtrl', function ($scope, Auth, $state) {

		$scope.logout = function () {
			Auth.logout();
			$state.go('login');
		}
	});
