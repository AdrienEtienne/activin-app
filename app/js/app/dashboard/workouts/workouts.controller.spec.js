'use strict';

describe('Controller: WorkoutsCtrl', function () {
	var ctrl;
	var $httpBackend, $controller;
	var res, resInvitation;

	// load the controller's module
	beforeEach(module('workouts.controller'));

	beforeEach(inject(function (_$controller_, _$httpBackend_) {
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;

		ctrl = $controller('WorkoutsCtrl', {});

		res = $httpBackend
			.when('GET', 'http://localhost:9000/api/workouts' +
				'?filter=accepted,refused,unknown' +
				'&next=true' +
				'&scope=user,sport')
			.respond([{
				_id: 'id'
			}]);
		resInvitation = $httpBackend
			.when('GET', 'http://localhost:9000/api/workouts/id/invitation')
			.respond({
				_id: 'invitationId'
			});
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

	describe('workouts.invitation', function () {
		it('should have invitation', function () {
			$httpBackend.flush();
			ctrl.workouts[0].invitation._id.should.equal('invitationId');
		});
	});
});
