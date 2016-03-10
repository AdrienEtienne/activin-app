angular.module('account.controller')
	.controller('MySportsAccountCtrl', function ($scope, MySport) {
		var that = this;

		$scope.myIsPending = true;
		$scope.notMyIsPending = true;

		MySport.mine().$promise.then(function (data) {
			$scope.mySports = data;
			$scope.myIsPending = false;
		});

		MySport.noneMine().$promise.then(function (data) {
			$scope.notMySports = data;
			$scope.notMyIsPending = false;
		});

		$scope.select = function (sport, index) {
			sport.isUpdating = true;
			sport.$select().then(function () {
				$scope.notMySports.splice(index, 1);
				sport.isUpdating = false;
				$scope.mySports.push(sport);
			});
		}

		$scope.unselect = function (sport, index) {
			sport.isUpdating = true;
			sport.$unselect().then(function () {
				$scope.mySports.splice(index, 1);
				sport.isUpdating = false;
				$scope.notMySports.push(sport);
			});
		}

		$scope.sportIsUpdating = function (sport) {
			if (sport && sport.isUpdating) {
				return true;
			} else {
				return false;
			}
		}
	});
