'use strict';

describe('Controller: AccountCtrl', function () {

	var ctrl, scope, Auth, state;

	// load the controller's module
	beforeEach(module('account.controller'));

	// Initialize the controller and a mock $window
	beforeEach(inject(function ($controller, $rootScope, _Auth_, $state) {
		scope = $rootScope.$new();
		Auth = _Auth_;
		state = $state;
		ctrl = $controller('AccountCtrl', {
			$scope: scope
		});
	}));

	it('should go to auth', function () {
		var tmp;
		state.go = function (name) {
			tmp = name;
		}
		scope.logout();
		assert.equal(tmp, 'login');
	});
});
