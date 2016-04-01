'use strict';

describe('Controller: InformationCtrl', function () {

	var ctrl, scope;

	// load the controller's module
	beforeEach(module('information.controller'));

	// Initialize the controller and a mock $window
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();

		ctrl = $controller('InformationCtrl', {
			$scope: scope
		});
	}));

	it('should have the good version', function () {
		assert.match(scope.version, /[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}(\-(alpha|beta)\.[0-9]{1,2})?/);
	});
});
