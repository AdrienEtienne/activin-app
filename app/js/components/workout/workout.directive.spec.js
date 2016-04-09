'use strict';

describe('Directive: workout', function () {

	// load the directive's module and view
	beforeEach(module('components.workout'));
	beforeEach(module('templates/workout/workout.html'));

	var element, parentScope, elementScope;

	var compileDirective = function (template) {
		inject(function ($compile) {
			element = angular.element(template);
			element = $compile(element)(parentScope);
			parentScope.$digest();
			elementScope = element.isolateScope();
		});
	};

	beforeEach(inject(function ($rootScope) {
		parentScope = $rootScope.$new();
	}));

	it('should have a name', function () {
		parentScope.wo = {
			name: 'name'
		};
		compileDirective('<workout ng-model="wo"></workout>');
		element = angular.element(element[0].querySelector('.item-divider h2'));
		element.text().should.equal('name');
	});

	describe('invitations', function () {
		it('should have number of invitations at 0 by default', function () {
			compileDirective('<workout ng-model="wo"></workout>');
			element = angular.element(element[0].querySelector('.item-divider span.badge span'));
			element.text().should.equal('0');
		});

		it('should have number of invitations', function () {
			parentScope.wo = {
				invitations: [{
					_id: 'id'
				}]
			};
			compileDirective('<workout ng-model="wo"></workout>');
			element = angular.element(element[0].querySelector('.item-divider span.badge span'));
			element.text().should.equal('1');
		});
	});

	it('should have a sport', function () {
		parentScope.wo = {
			sport: {
				name: 'sport'
			}
		};
		compileDirective('<workout ng-model="wo"></workout>');
		element = angular.element(element[0].querySelector('.workout-info p:first-child '));
		element.text().should.contains('SPORT');
	});

	it('should have a date', function () {
		var date = new Date();
		parentScope.wo = {
			dateStart: date
		};
		compileDirective('<workout ng-model="wo"></workout>');
		element = angular.element(element[0].querySelector('.workout-info p:nth-child(2)'));
		element.text().should.match(/@[0-9]{1,2}\:[0-9]{1,2}(AM|PM)/);
	});

	it('should have a user name', function () {
		parentScope.wo = {
			createdBy: {
				name: 'user'
			}
		};
		compileDirective('<workout ng-model="wo"></workout>');
		element = angular.element(element[0].querySelector('.workout-info p:nth-child(3)'));
		element.text().should.contains('user');
	});

	describe('select', function () {
		it('should have invitation state at 0', function () {
			compileDirective('<workout ng-model="wo"></workout>');
			element = angular.element(element[0].querySelector('.workout-info p:nth-child(3)'));
			elementScope.vm.getInvitationState().should.equal(0);
		});

		it('should hide radio if no invitation', function () {
			compileDirective('<workout ng-model="wo"></workout>');
			element = angular.element(element[0].querySelector('.radio.ng-hide'));
			element.should.have.length(1);
		});

		it('should display radio if invitation', function () {
			parentScope.wo = {
				invitation: {
					state: 0
				}
			};
			compileDirective('<workout ng-model="wo" on-selection="fn()"></workout>');
			element = angular.element(element[0].querySelector('.radio.ng-hide'));
			element.should.have.length(0);
		});

		it('should call onSelection function', function (done) {
			parentScope.fn = function () {
				done();
			};
			compileDirective('<workout ng-model="wo" on-selection="fn()"></workout>');
			element = angular.element(element[0].querySelector('.item-radio'));
			element[0].click();
		});

		it('should have MAYBE by default', function () {
			compileDirective('<workout ng-model="wo" on-selection="fn()"></workout>');
			elementScope.vm.choice().should.equal('0');
		});

		it('should modify the choice value', function (done) {
			parentScope.wo = {
				invitation: {
					state: 0
				}
			};
			parentScope.fn = function (choice) {
				parentScope.wo.invitation.state = choice;
				elementScope.vm.choice().should.equal('1');
				done();
			};
			compileDirective('<workout ng-model="wo" on-selection="fn(choice)"></workout>');
			element = angular.element(element[0].querySelector('.item-radio'));
			element[0].click();
		});
	});
});