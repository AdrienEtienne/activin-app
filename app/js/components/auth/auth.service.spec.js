'use strict';

describe('Service: Auth', function () {

	var Auth, $httpBackend;

	// load the controller's module
	beforeEach(module('components.auth'));

	// Initialize the controller and a mock $window
	beforeEach(inject(function (_Auth_, _$httpBackend_) {
		Auth = _Auth_;
		$httpBackend = _$httpBackend_;
		window.localStorage.token = undefined;
	}));

	beforeEach(function () {
		$httpBackend.when('POST', 'http://localhost:9000/auth/local').respond({
			token: 'mon token'
		});
		$httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond({
			_id: 'id',
			keepLocation: true
		});
		Auth.login('email', 'password');
		$httpBackend.flush();
	});

	describe('Login/Password/Token', function () {
		it('should have login', function () {
			Auth.getLogin().should.equal('email');
		});

		it('should have password', function () {
			Auth.getPassword().should.equal('password');
		});

		it('should have token', function () {
			Auth.getToken().should.equal('mon token');
		});

		it('should not have login', function () {
			Auth.logout();
			should.not.exist(Auth.getLogin());
		});

		it('should not have password', function () {
			Auth.logout();
			should.not.exist(Auth.getPassword());
		});

		it('should not have token', function () {
			Auth.logout();
			should.not.exist(Auth.getToken());
		});
	});

	describe('Location', function () {
		var $rootScope;

		beforeEach(inject(function (_$rootScope_) {
			$rootScope = _$rootScope_;
		}));

		it('should call /api/users/:id/setLocation', function (done) {
			$httpBackend.when('PUT', 'http://localhost:9000/api/users/id/setLocation', {
				keepLocation: true,
				location: [1, 2]
			}).respond({
				location: [1, 2],
				keepLocation: true
			});
			Auth.setCurrentLocation(1, 2).then(function () {
				done();
			});
			$httpBackend.flush();
			$rootScope.$digest();
		});

		it('should call /api/users/:id/setLocation and set keepLocation to false', function (done) {
			$httpBackend.when('PUT', 'http://localhost:9000/api/users/id/setLocation', {
				keepLocation: false,
				location: []
			}).respond({
				location: [],
				keepLocation: false
			});
			Auth.setCurrentLocation().then(function () {
				Auth.getCurrentUser().keepLocation.should.equal(false);
				Auth.getCurrentUser().location.should.deep.equal([]);
				done();
			});
			$httpBackend.flush();
			$rootScope.$digest();
		});
	});
});
