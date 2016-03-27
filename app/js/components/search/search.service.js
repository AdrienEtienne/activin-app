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
			},
			partners: {
				method: 'POST',
				isArray: true,
				params: {
					method: 'partners'
				}
			}
		});
	}

	angular.module('search.service', [
			'ngResource',
			'activinApp.constants'
		])
		.factory('Search', Search);

})();
