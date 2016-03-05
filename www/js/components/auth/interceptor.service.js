'use strict';

(function () {

  function authInterceptor($rootScope, $q, $cookies, $injector, Util, appConfig) {
    var state;
    return {
      // Add authorization token to headers
      request: function (config) {

        config.headers = config.headers || {};

        if (window.localStorage['token'] && config.url.indexOf(appConfig.apiUrl) > -1) {
          config.headers.Authorization = 'Bearer ' + window.localStorage['token'];
        }

        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {
        if (response.status === 401) {
          // remove any stale tokens
          window.localStorage['token'] = undefined;
        }
        return $q.reject(response);
      }
    };
  }

  angular.module('components.auth')
    .factory('authInterceptor', authInterceptor);

})();
