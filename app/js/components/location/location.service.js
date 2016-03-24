'use strict';

(function () {

	/**
	 * The Location service is for thin, globally reusable, utility functions
	 */
	function LocationService($cordovaGeolocation, $q, Search) {
		var posOptions = {
			timeout: 10000,
			enableHighAccuracy: false
		};

		// var watchOptions = {
		// 	timeout: 3000,
		// 	enableHighAccuracy: false // may cause errors if true
		// };

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

			getPredictions: function (input) {
				return $q(function (resolve, reject) {
					if (input && typeof input === 'string') {
						Search.predictions({
								input: input
							}).$promise
							.then(resolve)
							.catch(reject);
					} else {
						reject('String expected');
					}
				});
			},

			getDetails: function (placeid) {
				return $q(function (resolve, reject) {
					if (placeid && typeof placeid === 'string') {
						Search.details({
								placeid: placeid
							}).$promise
							.then(resolve)
							.catch(reject);
					} else {
						reject('String expected');
					}
				});
			}
		};

		return Location;
	}

	angular.module('components.location')
		.factory('Location', LocationService);

})();
