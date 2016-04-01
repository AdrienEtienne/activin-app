'use strict';

(function () {

	function OAuth($resource, appConfig) {
		return $resource(appConfig.apiUrl + '/auth/:provider/client');
	}

	angular.module('components.auth')
		.service('OAuth', OAuth);

})();
