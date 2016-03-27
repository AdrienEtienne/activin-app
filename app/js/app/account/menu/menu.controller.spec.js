'use strict';

describe('Controller: AccountCtrl', function () {

  var ctrl, User, state, $httpBackend;

  // load the controller's module
  beforeEach(module('account.module'));

  // Initialize the controller and a mock $window
  beforeEach(inject(function ($controller, $rootScope, _User_, $state, _$httpBackend_) {
    User = _User_;
    $httpBackend = _$httpBackend_;
    state = $state;
    ctrl = $controller('AccountCtrl', {});
  }));

  it('should go to auth', function () {
    var tmp;
    state.go = function (name) {
      tmp = name;
    };
    ctrl.logout();
    assert.equal(tmp, 'login');
  });

  it('should call keepLocation User function', function (done) {
    User.keepLocation = function () {
      done();
      return {
        then: angular.noop
      };
    };
    ctrl.keepLocation(true);
  });

  it('should call keepLocation with empty arguments', function (done) {
    User.keepLocation = function (arg) {
      arguments.length.should.equal(0);
      done();
    };
    ctrl.keepLocation();
  });

  it('should call User.updateLocation()', function (done) {
    User.updateLocation = function () {
      done();
    };
    User.keepLocation = function () {
      return {
        then: function (cb) {
          cb();
        }
      }
    };
    ctrl.keepLocation(true);
  });
});
