'use strict';

describe('Util: LocationService', function () {

	// load the controller's module
	beforeEach(module('components.util.location'));
	beforeEach(module('$cordovaGeolocationMock'));

	var Location, $rootScope, _$cordovaGeolocation;

	beforeEach(inject(function (_Location_, _$rootScope_, $cordovaGeolocation) {
		Location = _Location_;
		$rootScope = _$rootScope_;
		_$cordovaGeolocation = $cordovaGeolocation
	}));

	it('should return location', function (done) {
		Location.getLatLong().then(function (coords) {
			coords.lat.should.equal(_$cordovaGeolocation.data.lat);
			coords.long.should.equal(_$cordovaGeolocation.data.long);
			done();
		});
		$rootScope.$digest();
	});
});
