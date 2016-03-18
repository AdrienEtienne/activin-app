'use strict';

describe('Controller: AccountCtrl', function() {

  var ctrl, scope, User, state, $httpBackend;

  // load the controller's module
  beforeEach(module('account.module'));

  // Initialize the controller and a mock $window
  beforeEach(inject(function($controller, $rootScope, _User_, $state, _$httpBackend_) {
    scope = $rootScope.$new();
    User = _User_;
    $httpBackend = _$httpBackend_;
    state = $state;
    ctrl = $controller('AccountCtrl', {
      $scope: scope
    });
  }));

  it('should go to auth', function() {
    var tmp;
    state.go = function(name) {
      tmp = name;
    };
    scope.logout();
    assert.equal(tmp, 'login');
  });
});