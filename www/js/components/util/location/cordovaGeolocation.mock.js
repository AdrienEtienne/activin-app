'use strict';

angular.module('$cordovaGeolocationMock', [])
	.factory('$cordovaGeolocation', function ($q) {
		var data = {
			lat: 1,
			long: 1
		};

		return {
			data: data,
			getCurrentPosition: function (options) {
				return $q(function (resolve, reject) {
					if (options) {
						resolve({
							coords: {
								latitude: data.lat,
								longitude: data.long
							}
						});
					} else {
						reject({
							message: 'Error'
						});
					}
				});
			}
		};
	});
