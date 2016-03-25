'use strict';

describe('Controller: EditPlaceCtrl', function () {
	var ctrl;
	var $rootScope, $stateParams, $httpBackend, $ionicHistory, $controller;
	var Location, Place;

	var place, prediction, details;

	// load the controller's module
	beforeEach(module('place.module'));

	// Initialize the controller and a mock scope
	beforeEach(inject(function (_$controller_, _$rootScope_,
		_$httpBackend_, _Location_, _Place_) {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		$httpBackend = _$httpBackend_;
		Location = _Location_;
		Place = _Place_;
		$stateParams = {};
		$ionicHistory = {
			goBack: function () {}
		};
		ctrl = $controller('EditPlaceCtrl', {
			Place: Place,
			Location: Location,
			$stateParams: $stateParams,
			$ionicHistory: $ionicHistory
		});
	}));

	beforeEach(function () {
		place = new Place({
			_id: 'id',
			name: 'name',
			location: [1, 2]
		});
		prediction = {
			placeid: 'placeid',
			description: 'description'
		};
		details = {
			placeid: 'id',
			name: 'name',
			location: [1, 2]
		};
	});

	describe('isValidPlace()', function () {
		it('should be false if new', function () {
			ctrl.isValidPlace().should.be.false;
		});

		it('should be true if edit', function () {
			$stateParams.place = place;
			ctrl = $controller('EditPlaceCtrl', {
				Place: Place,
				Location: Location,
				$stateParams: $stateParams,
				$ionicHistory: $ionicHistory
			});
			ctrl.isValidPlace().should.be.true;
		});

		it('should be true if prediction set', function () {
			ctrl.setCurrentPrediction(prediction);
			$httpBackend
				.when('GET', 'http://localhost:9000/api/searchs/details?placeid=placeid')
				.respond(details);
			$httpBackend.flush();
			$rootScope.$digest();
			ctrl.isValidPlace().should.be.true;
		});

		it('should be false if prediction set but no location received', function () {
			ctrl.setCurrentPrediction(prediction);
			ctrl.isValidPlace().should.be.false;
		});

		it('should be false if name empty', function () {
			ctrl.setCurrentPrediction(prediction);
			$httpBackend
				.when('GET', 'http://localhost:9000/api/searchs/details?placeid=placeid')
				.respond(details);
			$httpBackend.flush();
			$rootScope.$digest();
			ctrl.placeName('');
			ctrl.isValidPlace().should.be.false;
		});
	});

	describe('placeName(newVal)', function () {
		it('should be empty', function () {
			should.not.exist(ctrl.placeName());
		});

		it('should not be empty', function () {
			$stateParams.place = place;
			ctrl = $controller('EditPlaceCtrl', {
				Place: Place,
				Location: Location,
				$stateParams: $stateParams,
				$ionicHistory: $ionicHistory
			});
			ctrl.placeName().should.equal(place.name);
		});

		it('should set place name', function () {
			ctrl.placeName('new name');
			ctrl.placeName().should.equal('new name');
		});
	});

	describe('isNew', function () {
		it('should be new', function () {
			ctrl.isNew.should.be.true;
		});

		it('should not be new', function () {
			$stateParams.place = place;
			ctrl = $controller('EditPlaceCtrl', {
				Place: Place,
				Location: Location,
				$stateParams: $stateParams,
				$ionicHistory: $ionicHistory
			});
			ctrl.isNew.should.be.false;
		});
	});

	describe('search(newVal)', function () {
		it('should be empty', function () {
			should.not.exist(ctrl.search());
		});

		it('should not have predictions', function () {
			ctrl.predictions.should.have.length(0);
		});

		it('should request predictions', function () {
			ctrl.search('Paris');
			$httpBackend
				.when('GET', 'http://localhost:9000/api/searchs/predictions?input=Paris')
				.respond([{
					placeid: 'id',
					desciption: 'description'
				}]);
			$httpBackend.flush();
			$rootScope.$digest();
			ctrl.predictions.should.have.length(1);
		});
	});

	describe('setCurrentPrediction(prediction)', function () {
		it('should empty array of predictions', function () {
			ctrl.predictions = ['toto'];
			ctrl.setCurrentPrediction(prediction);
			ctrl.predictions.should.have.length(0);
		});

		it('should search() be equal to prediction name', function () {
			ctrl.setCurrentPrediction(prediction);
			$httpBackend
				.when('GET', 'http://localhost:9000/api/searchs/details?placeid=placeid')
				.respond(details);
			$httpBackend.flush();
			$rootScope.$digest();
			ctrl.search().should.equal(prediction.description);
		});

		it('should placeName be equal to prediction name', function () {
			ctrl.setCurrentPrediction(prediction);
			$httpBackend
				.when('GET', 'http://localhost:9000/api/searchs/details?placeid=placeid')
				.respond(details);
			$httpBackend.flush();
			$rootScope.$digest();
			ctrl.placeName().should.equal(prediction.description);
		});

		it('should placeName be equal to current Place object', function () {
			$stateParams.place = place;
			ctrl = $controller('EditPlaceCtrl', {
				Place: Place,
				Location: Location,
				$stateParams: $stateParams,
				$ionicHistory: $ionicHistory
			});
			ctrl.setCurrentPrediction(prediction);
			$httpBackend
				.when('GET', 'http://localhost:9000/api/searchs/details?placeid=placeid')
				.respond(details);
			$httpBackend.flush();
			$rootScope.$digest();
			ctrl.placeName().should.equal(place.name);
		});
	});

	describe('save()', function () {
		beforeEach(function () {
			ctrl.setCurrentPrediction(prediction);
			$httpBackend
				.when('GET', 'http://localhost:9000/api/searchs/details?placeid=placeid')
				.respond(details);
			$httpBackend.flush();
			$rootScope.$digest();
		});

		it('should save a new Place', function () {
			ctrl.save();
			$httpBackend
				.when('POST', 'http://localhost:9000/api/places', {
					name: prediction.description,
					location: details.location
				})
				.respond(200);
			$httpBackend.flush();
		});

		it('should update an existing place', function () {
			$stateParams.place = place;
			ctrl = $controller('EditPlaceCtrl', {
				Place: Place,
				Location: Location,
				$stateParams: $stateParams,
				$ionicHistory: $ionicHistory
			});
			$httpBackend
				.when('PUT', 'http://localhost:9000/api/places/id', {
					_id: place._id,
					name: place.name,
					location: place.location
				})
				.respond(200);
			ctrl.save();
			$httpBackend.flush();
		});

		it('should call goBack() after save', function (done) {
			$ionicHistory.goBack = function () {
				done();
			}
			ctrl.save();
			$httpBackend.flush();
		});
	});

	describe('remove()', function () {
		it('should remove the place', function () {
			$stateParams.place = place;
			ctrl = $controller('EditPlaceCtrl', {
				Place: Place,
				Location: Location,
				$stateParams: $stateParams,
				$ionicHistory: $ionicHistory
			});
			ctrl.remove();
			$httpBackend
				.when('DELETE', 'http://localhost:9000/api/places/id')
				.respond(200);
			$httpBackend.flush();
		});
	});
});
