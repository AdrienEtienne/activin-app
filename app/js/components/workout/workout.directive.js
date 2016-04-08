'use strict';

angular.module('components.workout', ['ionic'])
	.directive('workout', function () {
		return {
			templateUrl: 'templates/workout/workout.html',
			restrict: 'EA',
			require: 'ngModel',
			replace: true,
			scope: {
				onSelection: '&'
			},
			link: function (scope, iElement, iAttrs, ngModelCtrl) {
				var choice;

				if (iAttrs.onSelection) {
					choice = ngModelCtrl.$modelValue._choice || 'MAYBE';
				} else {
					choice = null;
				}

				scope.vm = {
					choice: function (newVal) {
						if (arguments.length) {
							choice = newVal;
							ngModelCtrl.$viewValue._choice = choice;
							scope.onSelection({
								'choice': choice
							});
						} else {
							return choice;
						}
					},

					getName: function () {
						return ngModelCtrl.$viewValue ? ngModelCtrl.$viewValue.name : '';
					},
					countInvitations: function () {
						return (ngModelCtrl.$viewValue && ngModelCtrl.$viewValue.invitations) ?
							ngModelCtrl.$viewValue.invitations.length : 0;
					},
					sportName: function () {
						return (ngModelCtrl.$viewValue && ngModelCtrl.$viewValue.sport) ?
							ngModelCtrl.$viewValue.sport.name : 'Error';
					},
					dateStart: function () {
						return (ngModelCtrl.$viewValue) ?
							ngModelCtrl.$viewValue.dateStart : 'Error';
					},
					createdBy: function () {
						return (ngModelCtrl.$viewValue && ngModelCtrl.$viewValue.createdBy) ?
							ngModelCtrl.$viewValue.createdBy.name : 'Error';
					}
				};
			}
		};
	});
