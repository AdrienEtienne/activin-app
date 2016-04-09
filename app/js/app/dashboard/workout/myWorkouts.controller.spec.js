'use strict';

describe('Controller: WorkoutsCtrl', function () {
	var ctrl;
	var $httpBackend, $controller;
	var partner, $state, state;

	// load the controller's module
	beforeEach(module('myWorkouts.controller'));

	beforeEach(function () {
		partner = {
			_id: 'id',
			sports: ['idsport1', {
				_id: 'idsport2'
			}]
		};
	});

	beforeEach(function () {
		state = null;
		$state = {
			go: function (_state) {
				state = _state;
			}
		};
	});

	beforeEach(inject(function (_$controller_, _$httpBackend_) {
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;

		ctrl = $controller('MyWorkoutsCtrl', {
			$state: $state,
			$stateParams: {
				partner: partner
			}
		});
	}));

	describe('params.partner', function () {
		it('should return if no partner', function () {
			ctrl = $controller('MyWorkoutsCtrl', {
				$state: $state
			});
			state.should.equal('homemenu.dash');
		});

		it('should continue if partner', function () {
			should.not.exist(state);
		});
	});

	describe('Workout query', function () {
		it('should not request if no sports', function (done) {
			partner.sports = null;
			ctrl = $controller('MyWorkoutsCtrl', {
				$state: $state,
				$stateParams: {
					partner: partner
				}
			});

			try {
				$httpBackend.flush();
			} catch (e) {
				done();
			}
		});

		it('should request if sports', function () {
			$httpBackend.when('GET', /http:\/\/localhost:9000\/api\/workouts.*/)
				.respond([{
					_id: 'id'
				}]);

			$httpBackend.flush();
			ctrl.workouts.should.have.length(1);
		});
	});

	describe('select(workout)', function () {
		beforeEach(function () {
			$httpBackend.when('GET', /http:\/\/localhost:9000\/api\/workouts.*/)
				.respond([{
					_id: 'id'
				}]);
			$httpBackend.flush();
		});

		it('should request for invitation creation', function () {
			$httpBackend.when('POST', 'http://localhost:9000/api/workouts/workoutId/invitation', {
					userInvited: partner._id
				})
				.respond(200);

			ctrl.select({
				_id: 'workoutId'
			});
			$httpBackend.flush();
		});

		it('should catch request error', function () {
			$httpBackend.when('POST', 'http://localhost:9000/api/workouts/workoutId/invitation', {
					userInvited: partner._id
				})
				.respond(400);

			ctrl.select({
				_id: 'workoutId'
			});
			$httpBackend.flush();
		});
	});

});