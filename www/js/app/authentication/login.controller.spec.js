'use strict';

describe('Controller: LoginCtrl', function () {

	var ctrl, scope, $httpBackend, Auth, $state;

	// load the controller's module
	beforeEach(module('auth.controller'));

	// Initialize the controller and a mock $window
	beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, _Auth_) {
		scope = $rootScope.$new();
		$httpBackend = _$httpBackend_;
		Auth = _Auth_;
		$state = {
			go: function () {}
		};
		ctrl = $controller('LoginCtrl', {
			$scope: scope,
			Auth: Auth,
			$state: $state
		});
	}));

	describe('Login', function () {
		it('should not be login', function () {
			scope.isLogin.should.equal(false);
		});

		it('should be login', function () {
			scope.login();
			scope.isLogin.should.equal(true);
		});

		it('should not be login after request', function () {
			$httpBackend.when('POST', 'http://localhost:9000/auth/local').respond({
				token: 'mon token'
			});
			$httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond(200);
			scope.login();
			$httpBackend.flush();
			scope.isLogin.should.equal(false);
		});
	});

});
