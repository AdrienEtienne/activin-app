'use strict';

describe('Controller: EditPlaceCtrl', function () {
	var ctrl, $rootScope, Place, $httpBackend;

	// load the controller's module
	beforeEach(module('account.module'));

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _Place_) {
		$rootScope = _$rootScope_;
		$httpBackend = _$httpBackend_;
		Place = _Place_;
		ctrl = $controller('EditPlaceCtrl', {});
	}));
});
