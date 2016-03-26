'use strict';

(function () {

  /**
   * The Util service is for thin, globally reusable, utility functions
   */
  function UtilService() {
    var Util = {
      /**
       * Return a callback or noop function
       *
       * @param  {Function|*} cb - a 'potential' function
       * @return {Function}
       */
      safeCb: function (cb) {
        return (angular.isFunction(cb)) ? cb : angular.noop;
      }
    };

    return Util;
  }

  angular.module('components.util')
    .factory('Util', UtilService);

})();
