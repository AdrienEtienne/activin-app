'use strict';

(function () {

	function Invitation($resource, appConfig) {
		return $resource(appConfig.apiUrl + '/api/workouts/:workoutId/invitation/:id', {
			workoutId: '@workoutId',
			id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}

	angular.module('workout.service', [
			'ngResource',
			'activinApp.constants'
		])
		.factory('Invitation', Invitation);

})();
