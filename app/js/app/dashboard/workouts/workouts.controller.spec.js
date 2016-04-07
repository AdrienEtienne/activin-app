'use strict';

describe('Controller: WorkoutsCtrl', function () {
	var ctrl;
	var $httpBackend, $controller;

	// load the controller's module
	beforeEach(module('workouts.controller'));

	beforeEach(inject(function (_$controller_, _$httpBackend_) {
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;

		ctrl = $controller('WorkoutsCtrl', {});

		$httpBackend.when('GET', 'http://localhost:9000/api/workouts' +
				'?filter=accepted,refused,unknown' +
				'&next=true' +
				'&scope=user,sport')
			.respond([{
				_id: 'id'
			}]);
	}));

	describe('workouts', function () {
		it('should have 0 workout', function () {
			ctrl.workouts.should.have.length(0);
		});

		it('should have 1 workout', function () {
			$httpBackend.flush();
			ctrl.workouts.should.have.length(1);
		});
	});
});
