'use strict';

(function () {

	function MySportResource($resource, appConfig) {
		return $resource(appConfig.apiUrl + '/api/mySports/:method/:id', {
			id: '@_id'
		}, {
			mine: {
				method: 'GET',
				isArray: true,
				params: {
					method: 'mine'
				}
			},
			select: {
				method: 'POST',
				params: {
					method: 'select'
				}
			},
			unselect: {
				method: 'POST',
				params: {
					method: 'unselect'
				}
			}
		});
	}

	angular.module('starter.services')
		.factory('MySport', MySportResource);

})();
