'use strict';

(function () {

  function AuthService($http, $q, appConfig, Util, User) {
    var safeCb = Util.safeCb;
    var currentUser = {};
    var userRoles = appConfig.userRoles || [];

    var Auth = {



      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      login: function (email, password, callback) {
        return $http.post(appConfig.apiUrl + '/auth/local', {
            email: email,
            password: password
          })
          .then(function (res) {
            window.localStorage.email = email;
            window.localStorage.password = password;
            window.localStorage.token = res.data.token;
            currentUser = User.get();
            return currentUser.$promise;
          })
          .then(function (user) {
            safeCb(callback)(null, user);
            return user;
          })
          .catch(function (err) {
            Auth.logout();
            safeCb(callback)(err.data);
            return $q.reject(err.data);
          });
      },

      /**
       * Delete access token and user info
       */
      logout: function () {
        window.localStorage.email = undefined;
        window.localStorage.password = undefined;
        window.localStorage.token = undefined;
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      createUser: function (user, callback) {
        return User.save(user,
          function (data) {
            window.localStorage.token = data.token;
            currentUser = User.get();
            return safeCb(callback)(null, user);
          },
          function (err) {
            Auth.logout();
            return safeCb(callback)(err);
          }).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional, function(error, user)
       * @return {Promise}
       */
      changePassword: function (oldPassword, newPassword, callback) {
        return User.changePassword({
          id: currentUser._id
        }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function () {
          return safeCb(callback)(null);
        }, function (err) {
          return safeCb(callback)(err);
        }).$promise;
      },

      /**
       * Gets all available info on a user
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, funciton(user)
       * @return {Object|Promise}
       */
      getCurrentUser: function (callback) {
        if (arguments.length === 0) {
          return currentUser;
        }

        var value = (currentUser.hasOwnProperty('$promise')) ?
          currentUser.$promise : currentUser;
        return $q.when(value)
          .then(function (user) {
            safeCb(callback)(user);
            return user;
          }, function () {
            safeCb(callback)({});
            return {};
          });
      },

      /**
       * Check if a user is logged in
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isLoggedIn: function (callback) {
        if (arguments.length === 0) {
          return currentUser.hasOwnProperty('role');
        }

        return Auth.getCurrentUser(null)
          .then(function (user) {
            var is = user.hasOwnProperty('role');
            safeCb(callback)(is);
            return is;
          });
      },

      /**
       * Check if a user has a specified role or higher
       *   (synchronous|asynchronous)
       *
       * @param  {String}     role     - the role to check against
       * @param  {Function|*} callback - optional, function(has)
       * @return {Bool|Promise}
       */
      hasRole: function (role, callback) {
        var hasRole = function (r, h) {
          return userRoles.indexOf(r) >= userRoles.indexOf(h);
        };

        if (arguments.length < 2) {
          return hasRole(currentUser.role, role);
        }

        return Auth.getCurrentUser(null)
          .then(function (user) {
            var has = (user.hasOwnProperty('role')) ?
              hasRole(user.role, role) : false;
            safeCb(callback)(has);
            return has;
          });
      },

      /**
       * Check if a user is an admin
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isAdmin: function () {
        return Auth.hasRole
          .apply(Auth, [].concat.apply(['admin'], arguments));
      },

      /**
       * Test if login is present
       *
       * @return {Boolean} - local login present
       */
      getLogin: function () {
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
      getPassword: function () {
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
      getToken: function () {
        if (window.localStorage.token !== 'undefined' &&
          window.localStorage.token !== 'null') {
          return window.localStorage.token;
        } else {
          return null;
        }
      },

      /**
       * Change location
       *
       * @param  {Number}   long
       * @param  {Number}   lat
       * @return {Promise}
       */
      setCurrentLocation: function (long, lat) {
        var oldKeepLocation = currentUser.keepLocation;
        var oldLocation = currentUser.location;
        var keepLocation;
        var location;
        if (long !== undefined && lat !== undefined) {
          location = [long, lat];
          keepLocation = true;
        } else {
          location = [];
          keepLocation = false;
        }

        return User.setLocation({
          id: currentUser._id
        }, {
          keepLocation: keepLocation,
          location: location
        }, function (data) {
          currentUser.keepLocation = data.keepLocation;
          currentUser.location = data.location;
        }, function () {
          currentUser.keepLocation = oldKeepLocation;
          currentUser.location = oldLocation;
        }).$promise;
      },
    };

    return Auth;
  }

  angular.module('components.auth')
    .factory('Auth', AuthService);

})();