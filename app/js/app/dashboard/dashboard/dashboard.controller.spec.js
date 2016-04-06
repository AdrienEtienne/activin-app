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
	}));

	describe('countNextWorkout()', function () {
		it('should return 0', function () {
			ctrl.countNextWorkout().should.equal(0);
		});

		it('should return 0', function () {
			$httpBackend.when('GET', 'http://localhost:9000/api/workouts?filter=accepted,refused,unknown&next=true')
				.respond([{
					_id: 'id'
				}]);
			$httpBackend.flush();
			ctrl.countNextWorkout().should.equal(1);
		});
	});
});
