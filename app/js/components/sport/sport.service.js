'use strict';

(function () {

  function Sport($resource, appConfig) {
    return $resource(appConfig.apiUrl + '/api/sports/:id/:controller', {
      id: '@_id'
    });
  }

  angular.module('sport.service', [
      'ngResource',
      'activinApp.constants'
    ])
    .factory('Sport', Sport);

})();
