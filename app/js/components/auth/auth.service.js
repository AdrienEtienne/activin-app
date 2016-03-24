'use strict';

(function() {

  function AuthService($http, $q, appConfig, Util, User) {

    var Auth = {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @return {Promise}
       */
      login: function(email, password) {
        return $http.post(appConfig.apiUrl + '/auth/local', {
            email: email,
            password: password
          })
          .then(function(res) {
            window.localStorage.email = email;
            window.localStorage.password = password;
            window.localStorage.token = res.data.token;
            return User.get();
          })
          .catch(function(err) {
            Auth.logout();
            return $q.reject(err.data);
          });
      },

      /**
       * Delete access token and user info
       */
      logout: function() {
        window.localStorage.email = undefined;
        window.localStorage.password = undefined;
        window.localStorage.token = undefined;
        User.empty();
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      createUser: function(user) {
        return $q(function(resolve, reject) {
          User.save(user)
            .then(function(data) {
              window.localStorage.email = user.email;
              window.localStorage.password = user.password;
              window.localStorage.token = data.token;
              resolve(User.getCurrentUser());
            })
            .catch(function(err) {
              Auth.logout();
              reject(err.data);
            });
        });
      },

      /**
       * Test if login is present
       *
       * @return {Boolean} - local login present
       */
      getLogin: function() {
        if (window.localStorage.email !== 'undefined' &&
          window.localStorage.email !== 'null') {
          return window.localStorage.email;
        } else {
          return null;
        }
      },

      /**
       * Test if password is present
       *
       * @return {Boolean} - local password present
       */
      getPassword: function() {
        if (window.localStorage.password !== 'undefined' &&
          window.localStorage.password !== 'null') {
          return window.localStorage.password;
        } else {
          return null;
        }
      },

      /**
       * Test if token is present
       *
       * @return {String} - a token string used for authenticating
       */
      getToken: function() {
        if (window.localStorage.token !== 'undefined' &&
          window.localStorage.token !== 'null') {
          return window.localStorage.token;
        } else {
          return null;
        }
      }
    };

    return Auth;
  }

  angular.module('components.auth')
    .factory('Auth', AuthService);

})();