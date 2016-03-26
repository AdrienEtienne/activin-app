'use strict';

(function () {

  function User(UserResource, $q, Location) {
    var currentUser = {};

    var User = {
      get: function () {
        return $q(function (resolve, reject) {
          UserResource.get().$promise.then(function (data) {
            currentUser = data;
            resolve(data);
          }).catch(reject);
        });
      },
      empty: function () {
        currentUser = {};
      },
      save: function (user) {
        currentUser = new UserResource(user);
        return currentUser.$save();
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @return {Promise}
       */
      changePassword: function (oldPassword, newPassword) {
        return UserResource.changePassword({
          id: currentUser._id
        }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }).$promise;
      },

      /**
       * Gets all available info on a user
       *   (synchronous|asynchronous)
       *
       * @return {Object|Promise}
       */
      getCurrentUser: function () {
        if (currentUser._id) {
          return currentUser;
        } else {
          var value = (currentUser.hasOwnProperty('$promise')) ?
            currentUser.$promise : currentUser;
          return $q.when(value)
            .then(function (user) {
              return user;
            }, function () {
              return null;
            });
        }
      },

      /**
       * Get user role
       *   (synchronous|asynchronous)
       *
       * @return {Promise}
       */
      getRole: function () {
        return User.getCurrentUser()
          .then(function (user) {
            return user.role;
          });
      },

      /**
       * Get sports
       * @return {Array}         sport ids
       */
      getSportsId: function () {
        return currentUser.sports || [];
      },

      /**
       * Change sports
       * @return {Promise}       request result
       */
      changeSports: function (sportIds) {
        return UserResource.changeSports({
          id: currentUser._id
        }, sportIds || []).$promise;
      },

      /**
       * Change location
       *
       * @param  {Number}   long
       * @param  {Number}   lat
       * @return {Promise}
       */
      currentLocation: function (long, lat) {
        if (arguments.length) {
          return $q(function (resolve, reject) {
            if (!User.keepLocation()) {
              reject('Do not keepLocation!');
            } else {
              UserResource.setLocation({
                id: currentUser._id
              }, {
                keepLocation: true,
                location: [long, lat]
              }, function (data) {
                currentUser.location = [long, lat];
                resolve(data);
              }, reject);
            }
          });
        } else {
          if (currentUser.location) {
            return currentUser.location;
          } else {
            return [];
          }
        }
      },

      /**
       * Update the currentLocation
       * @return {Promise} promise
       */
      updateLocation: function () {
        return $q(function (resolve, reject) {
          Location.getLongLat().then(function (loc) {
            User.currentLocation(loc.long, loc.lat)
              .then(resolve)
              .catch(reject);
          }).catch(reject);
        });
      },

      /**
       * Getter Setter on location keep attribute
       * @param  {Boolean} newVal Keep the current location
       * @return {Boolean|Promise}
       */
      keepLocation: function (newVal) {
        if (arguments.length) {
          currentUser.keepLocation = newVal;
          return UserResource.setLocation({
            id: currentUser._id
          }, {
            keepLocation: currentUser.keepLocation,
            location: []
          }, function (data) {
            currentUser.location = data.location;
            currentUser.keepLocation = data.keepLocation;
          }).$promise;
        } else {
          if (currentUser.keepLocation === true) {
            return true;
          } else {
            return false;
          }
        }
      }
    };

    return User;
  }

  angular.module('components.user')
    .service('User', User);

})();
