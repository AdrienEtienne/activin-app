'use strict';

describe('Service: Auth', function () {

	var Auth, $httpBackend;

	// load the controller's module
	beforeEach(module('components.auth'));

	// Initialize the controller and a mock $window
	beforeEach(inject(function (_Auth_, _$httpBackend_) {
		Auth = _Auth_;
		$httpBackend = _$httpBackend_;
		window.localStorage['token'] = undefined;
	}));

	describe('Login/Password/Token', function () {
		beforeEach(function () {
			$httpBackend.when('POST', 'http://localhost:9000/auth/local').respond({
				token: 'mon token'
			});
			$httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond({});
			Auth.login('email', 'password');
			$httpBackend.flush();
		});

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
});
