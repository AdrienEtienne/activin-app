angular.module('account.controller')
	.controller('MySportsAccountCtrl', function ($scope, MySport) {
		$scope.mySports = MySport.mine();
		$scope.noneMySports = MySport.noneMine();

		$scope.select = function (sport, index) {
			sport.$select().then(function () {
				$scope.noneMySports.splice(index, 1);
				$scope.mySports.push(sport);

			});
		}

		$scope.unselect = function (sport, index) {
			sport.$unselect().then(function () {
				$scope.mySports.splice(index, 1);
				$scope.noneMySports.push(sport);
			});
		}
	});
