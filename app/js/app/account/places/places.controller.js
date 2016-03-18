angular.module('account.module')
	.controller('PlacesAccountCtrl', function ($scope, Auth) {
		var that = this;

		that.user = Auth.getCurrentUser();

		$scope.shouldShowDelete = true;
		$scope.shouldShowReorder = false;
		$scope.listCanSwipe = true;

		$scope.items = [];
		for (var i = 0; i <= 15; i++) {
			$scope.items.push({
				title: 'Place ' + (i + 1),
				description: 'Description'
			});
		}
	});
