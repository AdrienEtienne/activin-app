angular.module('account.controller')
	.controller('MySportsAccountCtrl', function ($scope, MySport) {
		$scope.sports = MySport.mine();
	});
