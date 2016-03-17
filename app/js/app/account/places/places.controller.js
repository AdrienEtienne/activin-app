angular.module('account.module')
	.controller('PlacesAccountCtrl', function ($scope, Auth) {
		var that = this;

		that.user = Auth.getCurrentUser();

		$scope.newPlace = '';
		$scope.location = {};
	})
	.directive('googleplace', function () {
		return {
			require: 'ngModel',
			scope: {
				location: '='
			},
			link: function (scope, element, attrs, model) {
				var options = {
					types: [],
					componentRestrictions: {}
				};
			scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

				google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
					scope.location.longitude = scope.gPlace.getPlace().geometry.location.lng();
					scope.location.latitude = scope.gPlace.getPlace().geometry.location.lat();

					scope.$apply(function () {
						model.$setViewValue(element.val());
					});
				});
			}
		};
	});
