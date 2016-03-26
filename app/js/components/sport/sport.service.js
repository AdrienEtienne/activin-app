'use strict';

(function () {

	function Sport($resource, appConfig) {
		return $resource(appConfig.apiUrl + '/api/sports/:id/:controller', {
			id: '@_id'
		});
	}

	angular.module('starter.services')
		.factory('Sport', Sport);

})();
