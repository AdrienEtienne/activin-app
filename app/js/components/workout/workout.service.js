'use strict';

(function () {

	function Workout($resource, appConfig) {
		return $resource(appConfig.apiUrl + '/api/workouts/:id/:controller/:element', {
			id: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
			getNext: {
				method: 'GET',
				isArray: true,
				params: {
					next: 'true',
					filter: 'accepted,refused,unknown'
				}
			},
			getUnknown: {
				method: 'GET',
				isArray: true,
				params: {
					filter: 'unknown'
				}
			},
		});
	}

	angular.module('workout.service')
		.factory('Workout', Workout);

})();
