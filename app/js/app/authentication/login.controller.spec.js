'use strict';

describe('Controller: LoginCtrl', function () {

	var ctrl, scope, $httpBackend, Auth, $state;

	// load the controller's module
	beforeEach(module('auth.controller'));
	beforeEach(module('$cordovaGeolocationMock'));

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

	describe('Location', function () {

		var $rootScope, _$cordovaGeolocation;

		beforeEach(inject(function (_$rootScope_, $cordovaGeolocation) {
			$rootScope = _$rootScope_;
			_$cordovaGeolocation = $cordovaGeolocation
		}));

		beforeEach('Get current user', function () {
			$httpBackend.when('POST', 'http://localhost:9000/auth/local').respond({
				token: 'mon token'
			});
			$httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond({
				_id: 'id',
				location: [1, 2],
				keepLocation: true
			});
			Auth.login();
			$httpBackend.flush();
		})

		it('should not call /api/users/:id/setLocation', function (done) {
			Auth.getCurrentUser().keepLocation = false;
			ctrl.updateLocation().then(function () {
				done();
			});
			$rootScope.$digest();
		});

		it('should call /api/users/:id/setLocation', function (done) {
			_$cordovaGeolocation.setLongLat(1, 2);
			$httpBackend.when('PUT', 'http://localhost:9000/api/users/id/setLocation', {
				keepLocation: true,
				location: [1, 2]
			}).respond({
				location: [1, 2],
				keepLocation: true
			});
			ctrl.updateLocation().then(function () {
				Auth.getCurrentUser().location = [1, 2];
				Auth.getCurrentUser().keepLocation = true;
				done();
			});
			$httpBackend.flush();
			$rootScope.$digest();
		});
	});
});
