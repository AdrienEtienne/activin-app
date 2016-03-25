'use strict';

(function () {

  function Place($resource, appConfig) {
    return $resource(appConfig.apiUrl + '/api/places/:id/:controller', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
    });
  }

  angular.module('components.location')
    .factory('Place', Place);

})();
