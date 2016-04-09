'use strict';

(function () {

	function Workout($resource, appConfig) {
		return $resource(appConfig.apiUrl + '/api/workouts/:id/:controller/:element', {
			id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}

	angular.module('workout.service')
		.factory('Workout', Workout);

})();
