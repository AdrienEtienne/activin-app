'use strict';

(function () {

  function UserResource($resource, appConfig) {
    return $resource(appConfig.apiUrl + '/api/users/:id/:controller', {
      id: '@_id'
    }, {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      }
    });
  }

  angular.module('components.auth')
    .factory('User', UserResource);

})();
