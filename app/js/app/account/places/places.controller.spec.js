'use strict';

describe('Controller: PlacesAccountCtrl', function () {
	var ctrl, $rootScope, Place, $httpBackend;

	// load the controller's module
	beforeEach(module('account.module'));

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _Place_) {
		$rootScope = _$rootScope_;
		$httpBackend = _$httpBackend_;
		Place = _Place_;
		ctrl = $controller('PlacesAccountCtrl', {
			Place: Place
		});
	}));

	it('should not have places', function () {
		ctrl.getPlaces().should.have.length(0);
	});

	it('should have places', function () {
		$httpBackend
			.when('GET', 'http://localhost:9000/api/places')
			.respond(['toto']);
		$httpBackend.flush();
		ctrl.getPlaces().should.have.length(1);
	});

	describe('removePlace(index)', function () {
		beforeEach(function () {
			$httpBackend
				.when('GET', 'http://localhost:9000/api/places')
				.respond([{
					_id: 'id',
					name: 'name',
					location: [1, 2]
				}]);
			$httpBackend.flush();
		});

		it('should remove place from array', function () {
			ctrl.removePlace(0);
			ctrl.getPlaces().should.have.length(0);
		});

		it('should not remove place when not in array', function () {
			ctrl.removePlace(1);
			ctrl.getPlaces().should.have.length(1);
		});

		it('should request delete the place', function () {
			$httpBackend
				.when('DELETE', 'http://localhost:9000/api/places/id')
				.respond(200);
			ctrl.removePlace(0);
			$httpBackend.flush();
		});
	});
});
