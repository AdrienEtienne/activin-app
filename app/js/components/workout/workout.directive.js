'use strict';

angular.module('components.workout', ['ionic'])
	.directive('workout', function () {
		return {
			templateUrl: 'templates/workout/workout.html',
			restrict: 'E',
			require: 'ngModel',
			replace: true,
			scope: {
				onRadioSelection: '&',
				onSelection: '&'
			},
			link: function (scope, iElement, iAttrs, ngModelCtrl) {
				var vm = {
					hasInvitation: function () {
						return ngModelCtrl.$viewValue && ngModelCtrl.$viewValue.invitation ?
							true : false;
					},

					getInvitationState: function () {
						return ngModelCtrl.$viewValue && ngModelCtrl.$viewValue.invitation ?
							ngModelCtrl.$viewValue.invitation.state :
							0;
					},

					choice: function (newVal) {
						if (arguments.length) {
							scope.onRadioSelection({
								'choice': parseInt(newVal)
							});
						} else {
							return '' + scope.vm.getInvitationState();
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

				if (iAttrs.onSelection) {
					vm.select = function () {
						scope.onSelection();
					};
				}

				scope.vm = vm;
			}
		};
	});