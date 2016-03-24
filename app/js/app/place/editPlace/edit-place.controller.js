angular.module('place.module')
	.controller('EditPlaceCtrl', function (Place, Search, $stateParams, $ionicHistory) {
		var that = this;

		that.isNew = null;
		that.place = null;

		if ($stateParams.place) {
			that.place = $stateParams.place;
			that.isNew = false;
		} else {
			that.place = {};
			that.isNew = true;
		}

		that.title = function () {
			if (isNew) {
				return 'New Place';
			} else {
				return 'Edit Place';
			}
		};

		that.save = function () {
			$ionicHistory.goBack();
		};

		that.remove = function () {
			$ionicHistory.goBack();
		};
	});
