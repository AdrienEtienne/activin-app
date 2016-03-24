'use strict';

angular.module('$cordovaGeolocationMock', [])
	.factory('$cordovaGeolocation', function ($q) {
		var data = {
			lat: 0,
			long: 0
		};

		return {
			setLongLat: function (long, lat) {
				data.lat = lat;
				data.long = long;
			},
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
