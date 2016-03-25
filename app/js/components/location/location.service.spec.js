'use strict';

describe('Util: LocationService', function () {

	// load the controller's module
	beforeEach(module('components.location'));
	beforeEach(module('$cordovaGeolocationMock'));

	var Location, $rootScope, _$cordovaGeolocation;
	var $httpBackend;

	beforeEach(inject(function (_Location_, _$rootScope_, $cordovaGeolocation, _$httpBackend_) {
		Location = _Location_;
		$rootScope = _$rootScope_;
		_$cordovaGeolocation = $cordovaGeolocation;
		$httpBackend = _$httpBackend_;
	}));

	describe('getLongLat()', function () {
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

	describe('getPredictions(input)', function () {
		it('should return predictions', function (done) {
			$httpBackend.when('GET', 'http://localhost:9000/api/searchs/predictions?input=Paris').respond([{
				placeid: 'id',
				description: 'description'
			}]);
			Location.getPredictions('Paris').then(function (predictions) {
				predictions.should.be.instanceof(Array);
				done();
			});
			$rootScope.$digest();
			$httpBackend.flush();
		});

		it('should return error if request fail', function (done) {
			$httpBackend.when('GET', 'http://localhost:9000/api/searchs/predictions?input=Paris').respond(400);
			Location.getPredictions('Paris').catch(function () {
				done();
			});
			$rootScope.$digest();
			$httpBackend.flush();
		});

		it('should return error if no input', function (done) {
			Location.getPredictions().catch(function () {
				done();
			});
			$rootScope.$digest();
		});

		it('should return error if input empty', function (done) {
			Location.getPredictions('').catch(function () {
				done();
			});
			$rootScope.$digest();
		});
	});

	describe('getDetails(placeid)', function () {
		it('should return predictions', function (done) {
			$httpBackend.when('GET', 'http://localhost:9000/api/searchs/details?placeid=id').respond({
				placeid: 'id',
				name: 'name',
				location: [1, 2]
			});
			Location.getDetails('id').then(function (details) {
				details.placeid.should.equal('id');
				done();
			});
			$rootScope.$digest();
			$httpBackend.flush();
		});

		it('should return error if request fail', function (done) {
			$httpBackend.when('GET', 'http://localhost:9000/api/searchs/details?placeid=id').respond(400);
			Location.getDetails('id').catch(function () {
				done();
			});
			$rootScope.$digest();
			$httpBackend.flush();
		});

		it('should return error if no input', function (done) {
			Location.getDetails().catch(function () {
				done();
			});
			$rootScope.$digest();
		});
	});
});
