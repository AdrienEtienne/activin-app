'use strict';

describe('Controller: EditPlaceCtrl', function () {
	var ctrl;
	var $rootScope, $stateParams, $httpBackend, $ionicHistory, $controller;
	var Search, Place;

	// load the controller's module
	beforeEach(module('place.module'));

	// Initialize the controller and a mock scope
	beforeEach(inject(function (_$controller_, _$rootScope_,
		_$httpBackend_, _Search_, _Place_) {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		$httpBackend = _$httpBackend_;
		Search = _Search_;
		Place = _Place_;
		$stateParams = {};
		$ionicHistory = {};
		ctrl = $controller('EditPlaceCtrl', {
			Place: Place,
			Search: Search,
			$stateParams: $stateParams,
			$ionicHistory: $ionicHistory
		});
	}));

	describe('place', function () {
		it('should be empty', function () {
			ctrl.place.should.be.empty;
		});

		it('should not be empty', function () {
			$stateParams.place = {
				placeid: 'id',
				description: 'description'
			};
			ctrl = $controller('EditPlaceCtrl', {
				Place: Place,
				Search: Search,
				$stateParams: $stateParams,
				$ionicHistory: $ionicHistory
			});
			ctrl.place.should.not.be.empty;
		});
	});

	describe('isNew', function () {
		it('should be new', function () {
			ctrl.isNew.should.be.true;
		});

		it('should not be new', function () {
			$stateParams.place = {
				placeid: 'id',
				description: 'description'
			};
			ctrl = $controller('EditPlaceCtrl', {
				Place: Place,
				Search: Search,
				$stateParams: $stateParams,
				$ionicHistory: $ionicHistory
			});
			ctrl.isNew.should.be.false;
		});
	});
});
