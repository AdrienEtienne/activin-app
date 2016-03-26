'use strict';

describe('Service: Util', function () {

  var Util;
  var $rootScope, $window;

  // load the controller's module
  beforeEach(module('components.util'));

  // Initialize the controller and a mock $window
  beforeEach('Injection', inject(function (_$rootScope_, _$window_, _Util_) {
    Util = _Util_;
    $rootScope = _$rootScope_;
    $window = _$window_;
  }));

  describe('safeCb(cb)', function () {
    it('should return angular.noop', function () {
      Util.safeCb().should.equal(angular.noop);
    });

    it('should return angular.noop', function () {
      function fn() {
        return 'toto';
      }
      Util.safeCb(fn).should.equal(fn);
    });
  });
});
