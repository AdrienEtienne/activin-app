angular.module('place.module')
	.controller('EditPlaceCtrl', function (Place, Location, $stateParams, $ionicHistory) {
		var that = this;

		var place = null;
		var currentSearch = null;

		that.isNew = null;

		that.predictions = [];

		if ($stateParams.place) {
			place = $stateParams.place;
			that.isNew = false;
			that.title = 'Edit Place';
		} else {
			place = new Place();
			that.isNew = true;
			that.title = 'New Place';
		}

		that.isValidPlace = function () {
			if (place.name && place.location && place.location.length > 0) {
				return true;
			} else {
				return false;
			}
		};

		that.placeName = function (newVal) {
			if (arguments.length) {
				place.name = newVal;
			} else {
				return place.name;
			}
		};

		that.search = function (newVal) {
			if (arguments.length) {
				currentSearch = newVal;
				Location.getPredictions(currentSearch)
					.then(function (predictions) {
						that.predictions = predictions;
					});
			} else {
				return currentSearch;
			}
		};

		that.setCurrentPrediction = function (prediction) {
			currentSearch = prediction.description;
			if (!place.name) {
				place.name = prediction.description;
			}
			that.predictions = [];
			Location.getDetails(prediction.placeid).then(function (data) {
				place.location = data.location;
			});
		};

		that.save = function () {
			place.$save();
			$ionicHistory.goBack();
		};

		that.remove = function () {
			place.$delete();
			$ionicHistory.goBack();
		};
	});
