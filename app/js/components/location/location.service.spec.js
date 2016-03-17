'use strict';

describe('Util: LocationService', function () {

	// load the controller's module
	beforeEach(module('components.location'));
	beforeEach(module('$cordovaGeolocationMock'));

	var Location, $rootScope, _$cordovaGeolocation;

	beforeEach(inject(function (_Location_, _$rootScope_, $cordovaGeolocation) {
		Location = _Location_;
		$rootScope = _$rootScope_;
		_$cordovaGeolocation = $cordovaGeolocation
	}));

	it('should return location', function (done) {

		_$cordovaGeolocation.setLongLat(1, 2);
		Location.getLongLat().then(function (coords) {
			coords.long.should.equal(1);
			coords.lat.should.equal(2);
			done();
		});
		$rootScope.$digest();
	});
});
