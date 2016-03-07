angular.module('account.controller')
	.controller('MySportsAccountCtrl', function ($scope, MySport) {
		$scope.mySports = MySport.mine();
		$scope.noneMySports = MySport.noneMine();
	});
