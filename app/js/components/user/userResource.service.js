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
      changeSports: {
        method: 'PUT',
        params: {
          controller: 'sports'
        }
      },
      setLocation: {
        method: 'PUT',
        params: {
          controller: 'setLocation'
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

  angular.module('components.user')
    .service('UserResource', UserResource);

})();
