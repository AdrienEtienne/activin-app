'use strict';

(function () {

	function Search($resource, appConfig) {
		return $resource(appConfig.apiUrl + '/api/searchs/:method', {}, {
			predictions: {
				method: 'GET',
				isArray: true,
				params: {
					method: 'predictions'
				}
			},
			details: {
				method: 'GET',
				params: {
					method: 'details'
				}
			}
		});
	}

	angular.module('components.location')
		.factory('Search', Search);

})();
