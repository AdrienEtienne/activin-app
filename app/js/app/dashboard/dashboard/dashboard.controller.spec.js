'use strict';

describe('Controller: DashboardCtrl', function () {
	var ctrl;
	var $httpBackend, $controller;

	// load the controller's module
	beforeEach(module('dashboard.controller'));

	beforeEach(inject(function (_$controller_, _$httpBackend_) {
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;

		ctrl = $controller('DashboardCtrl', {});

		$httpBackend.when('GET', 'http://localhost:9000/api/workouts?filter=accepted&next=true&scope=id')
			.respond([{
				_id: 'id'
			}]);
		$httpBackend.when('GET', 'http://localhost:9000/api/workouts?filter=unknown&next=true&scope=id')
			.respond([{
				_id: 'id'
			}]);
		$httpBackend.when('GET', 'http://localhost:9000/api/workouts?filter=refused&next=true&scope=id')
			.respond([{
				_id: 'id'
			}]);
	}));

	describe('countNextWorkout()', function () {
		it('should return 0', function () {
			ctrl.countNextWorkout().should.equal(0);
		});

		it('should return 1', function () {
			$httpBackend.flush();
			ctrl.countNextWorkout().should.equal(1);
		});
	});

	describe('countUnknownWorkout()', function () {
		it('should return 0', function () {
			ctrl.countUnknownWorkout().should.equal(0);
		});

		it('should return 1', function () {
			$httpBackend.flush();
			ctrl.countUnknownWorkout().should.equal(1);
		});
	});

	describe('countRefusedWorkout()', function () {
		it('should return 0', function () {
			ctrl.countRefusedWorkout().should.equal(0);
		});

		it('should return 1', function () {
			$httpBackend.flush();
			ctrl.countRefusedWorkout().should.equal(1);
		});
	});
});
