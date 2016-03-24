angular.module('account.module')
	.controller('EditPlaceCtrl', function ($stateParams, $ionicHistory) {
		var that = this;

		var isNew = null;
		var place = null;

		if ($stateParams.place) {
			place = $stateParams.place;
			isNew = false;
		} else {
			place = {};
			isNew = true;
		}

		that.title = function () {
			if (isNew) {
				return 'New Place';
			} else {
				return 'Edit Place';
			}
		};

		that.isNew = function () {
			return isNew;
		};

		that.save = function () {
			$ionicHistory.goBack();
		};

		that.remove = function () {
			$ionicHistory.goBack();
		};
	});
