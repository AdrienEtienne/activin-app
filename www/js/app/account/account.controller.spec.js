'use strict';

describe('Controller: AccountCtrl', function () {

	var ctrl, scope, Auth, state;

	// load the controller's module
	beforeEach(module('account.controller'));

	beforeEach(function () {
		window.localStorage['email'] = 'mail';
		window.localStorage['password'] = 'password';
		window.localStorage['token'] = 'token';
	});

	// Initialize the controller and a mock $window
	beforeEach(inject(function ($controller, $rootScope, _Auth_, $state) {
		scope = $rootScope.$new();
		Auth = _Auth_;
		state = $state;
		ctrl = $controller('AccountCtrl', {
			$scope: scope
		});
	}));

	it('should have login infos', function () {
		assert.equal(Auth.hasLogin(), true);
	});

	it('should logout the user', function () {
		state.go = function () {};
		scope.logout();
		assert.equal(Auth.hasLogin(), false);
	});

	it('should go to auth', function () {
		var tmp;
		state.go = function (name) {
			tmp = name;
		}
		scope.logout();
		assert.equal(tmp, 'auth');
	});
});
