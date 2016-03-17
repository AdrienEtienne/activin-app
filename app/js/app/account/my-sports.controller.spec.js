'use strict';

describe('Controller: MySportsCtrl', function () {

	var ctrl, scope, MySport, $httpBackend;

	// load the controller's module
	beforeEach(module('account.controller'));

	// Initialize the controller and a mock $window
	beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, _MySport_) {
		scope = $rootScope.$new();
		$httpBackend = _$httpBackend_;
		MySport = _MySport_;
		ctrl = $controller('MySportsAccountCtrl', {
			$scope: scope,
			MySport: MySport
		});
	}));

	it('should have request pending', function () {
		scope.myIsPending.should.equal(true);
		scope.notMyIsPending.should.equal(true);
	});

	it('should have request not pending', function () {
		$httpBackend
			.when('GET', 'http://localhost:9000/api/mySports/mine')
			.respond(['toto', 'titi']);
		$httpBackend
			.when('GET', 'http://localhost:9000/api/mySports/noneMine')
			.respond(['toto', 'titi']);
		$httpBackend.flush();

		scope.myIsPending.should.equal(false);
		scope.notMyIsPending.should.equal(false);
	});

	describe('Test selection', function () {
		beforeEach(function () {
			$httpBackend
				.when('GET', 'http://localhost:9000/api/mySports/mine')
				.respond([{
					_id: 'id1',
					name: 'sport1'
				}]);
			$httpBackend
				.when('GET', 'http://localhost:9000/api/mySports/noneMine')
				.respond([{
					_id: 'id2',
					name: 'sport2'
				}]);
			$httpBackend.flush();
		});

		it('should not be updating', function () {
			scope.sportIsUpdating(scope.mySports[0]).should.equal(false);
			scope.sportIsUpdating(scope.notMySports[0]).should.equal(false);
		});

		it('should be updating after select', function () {
			scope.select(scope.notMySports[0]);
			scope.sportIsUpdating(scope.notMySports[0]).should.equal(true);
		});

		it('should be updating after unselect', function () {
			scope.unselect(scope.mySports[0]);
			scope.sportIsUpdating(scope.mySports[0]).should.equal(true);
		});

		it('should not be updating after select and response', function () {
			scope.select(scope.notMySports[0]);
			$httpBackend
				.when('POST', 'http://localhost:9000/api/mySports/select/id2')
				.respond(200);
			$httpBackend.flush();
			scope.sportIsUpdating(scope.notMySports[0]).should.equal(false);
		});

		it('should not be updating after unselect and response', function () {
			scope.unselect(scope.mySports[0]);
			$httpBackend
				.when('POST', 'http://localhost:9000/api/mySports/unselect/id1')
				.respond(200);
			$httpBackend.flush();
			scope.sportIsUpdating(scope.mySports[0]).should.equal(false);
		});
	});
});
