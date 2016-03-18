'use strict';

describe('Controller: AccountCtrl', function () {

	var ctrl, scope, Auth, state, $httpBackend;

	// load the controller's module
	beforeEach(module('account.module'));
	beforeEach(module('$cordovaGeolocationMock'));

	// Initialize the controller and a mock $window
	beforeEach(inject(function ($controller, $rootScope, _Auth_, $state, _$httpBackend_) {
		scope = $rootScope.$new();
		Auth = _Auth_;
		$httpBackend = _$httpBackend_;
		state = $state;
		ctrl = $controller('AccountCtrl', {
			$scope: scope
		});
	}));

	it('should have the user', function () {
		should.exist(ctrl.user);
	});

	it('should go to auth', function () {
		var tmp;
		state.go = function (name) {
			tmp = name;
		};
		scope.logout();
		assert.equal(tmp, 'login');
	});

	describe('Location', function () {
		beforeEach(function () {
			Auth.getCurrentUser()._id = 'id';
			Auth.getCurrentUser().location = [1, 2];
			Auth.getCurrentUser().keepLocation = true;
		});

		describe('keepLocation', function () {
			it('should return true', function () {
				scope.keepLocation().should.equal(true);
			});

			it('should return false', function () {
				Auth.getCurrentUser().keepLocation = false;
				scope.keepLocation().should.equal(false);
			});

			it('should set value to false', function () {
				scope.keepLocation(false);
				scope.keepLocation().should.equal(false);
			});

			it('should set value to true', function () {
				Auth.getCurrentUser().keepLocation = false;
				scope.keepLocation(true);
				scope.keepLocation().should.equal(true);
			});

			it('should request /api/users/id/setLocation', function () {
				$httpBackend.when('PUT', 'http://localhost:9000/api/users/id/setLocation', {
					keepLocation: false,
					location: []
				}).respond({
					keepLocation: false,
					location: []
				});
				scope.keepLocation(false);
				$httpBackend.flush();
				Auth.getCurrentUser().location.should.deep.equal([]);
			});
		});
	});
});
