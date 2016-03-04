'use strict';

describe('Controller: AccountCtrl', function () {

	var ctrl, scope, Auth;

	// load the controller's module
	beforeEach(module('account.controller'));

	beforeEach(function () {
		window.localStorage['email'] = 'mail';
		window.localStorage['password'] = 'password';
		window.localStorage['token'] = 'token';
	});

	// Initialize the controller and a mock $window
	beforeEach(inject(function ($controller, $rootScope, _Auth_) {
		scope = $rootScope.$new();
		Auth = _Auth_;
		ctrl = $controller('AccountCtrl', {
			$scope: scope
		});
	}));

	it('should have login infos', function () {
		assert.equal(Auth.hasLogin(), true);
	});

	it('should logout the user', function () {

	});
});
