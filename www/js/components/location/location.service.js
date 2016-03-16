'use strict';

(function () {

	/**
	 * The Location service is for thin, globally reusable, utility functions
	 */
	function LocationService($cordovaGeolocation, $q) {
		var posOptions = {
			timeout: 10000,
			enableHighAccuracy: false
		};

		var watchOptions = {
			timeout: 3000,
			enableHighAccuracy: false // may cause errors if true
		};

		var Location = {
			getLongLat: function () {
				var deferred = $q.defer();

				$cordovaGeolocation
					.getCurrentPosition(posOptions)
					.then(function (position) {
						deferred.resolve({
							lat: position.coords.latitude,
							long: position.coords.longitude
						});
					}, function (err) {
						deferred.reject(err);
					});

				return deferred.promise;
			},
		};

		return Location;
	}

	angular.module('components.location')
		.factory('Location', LocationService);

})();
