'use strict';

describe('Controller: MySportsCtrl', function () {

	var ctrl, Sport, User, $httpBackend, $ionicHistory;

	var sport;

	// load the controller's module
	beforeEach(module('account.module'));

	// Initialize the controller and a mock $window
	beforeEach(inject(function ($controller, _$httpBackend_, _Sport_, _User_) {
		$httpBackend = _$httpBackend_;
		Sport = _Sport_;
		User = _User_;
		$ionicHistory = {
			goBack: angular.noop
		};
		ctrl = $controller('MySportsCtrl', {
			Sport: Sport,
			User: User,
			$ionicHistory: $ionicHistory
		});

		sport = {
			_id: 'id',
			name: 'running'
		};
	}));

	it('should not have sports', function () {
		ctrl.sports.should.have.length(0);
	});

	it('should have request pending', function () {
		$httpBackend
			.when('GET', 'http://localhost:9000/api/sports')
			.respond([sport]);
		$httpBackend.flush();
		ctrl.sports.should.have.length(1);
	});

	describe('selected(sport)', function () {
		beforeEach(function () {
			$httpBackend
				.when('GET', 'http://localhost:9000/api/sports')
				.respond([sport]);
			$httpBackend.flush();
		});

		it('should return false if no user', function () {
			ctrl.selected(sport)().should.be.false;
		});

		it('should return true after sport selection', function () {
			ctrl.selected(sport)(true);
			ctrl.selected(sport)().should.be.true;
		});

		it('should return false after sport unselection', function () {
			ctrl.selected(sport)(true);
			ctrl.selected(sport)().should.be.true;
			ctrl.selected(sport)(false);
			ctrl.selected(sport)().should.be.false;
		});

		it('should return false if no sports for user', function () {
			$httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond({
				_id: 'id',
				sports: []
			});
			User.get();
			$httpBackend.flush();
			ctrl.selected(sport)().should.be.false;
		});

		it('should return true if sport in array', function () {
			$httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond({
				_id: 'id',
				sports: [sport._id]
			});
			User.get();
			$httpBackend.flush();
			ctrl.selected(sport._id)().should.be.false;
		});

	});

	describe('save()', function () {
		beforeEach(function () {
			$httpBackend
				.when('GET', 'http://localhost:9000/api/sports')
				.respond([sport]);
			$httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond({
				_id: 'id',
				sports: []
			});
			User.get();
			$httpBackend.flush();
		});

		it('should request user sports update with empty array', function () {
			$httpBackend.when('PUT', 'http://localhost:9000/api/users/id/sports', [])
				.respond(204);
			ctrl.save();
			$httpBackend.flush();
		});

		it('should call $ionicHistory.goBack()', function (done) {
			$ionicHistory.goBack = function () {
				done();
			};
			ctrl.save();
		});
	});
});
