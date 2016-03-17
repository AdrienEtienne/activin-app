angular.module('account.module')
	.controller('PlacesAccountCtrl', function ($scope, Auth) {
		var user = Auth.getCurrentUser();

		if (user.location) {
			var latLng = new google.maps.LatLng(user.location[1], user.location[0]);

			var mapOptions = {
				center: latLng,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

			//Wait until the map is loaded
			google.maps.event.addListenerOnce($scope.map, 'idle', function () {
				new google.maps.Marker({
					map: $scope.map,
					animation: google.maps.Animation.DROP,
					position: latLng
				});
			});
		}

	});
