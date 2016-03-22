'use strict';

describe('Controller: LoginCtrl', function () {

  var ctrl, scope, $httpBackend, Auth, User, $state;

  // load the controller's module
  beforeEach(module('login.controller'));
  beforeEach(module('$cordovaGeolocationMock'));

  // Initialize the controller and a mock $window
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, _Auth_, _User_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    Auth = _Auth_;
    User = _User_;
    $state = {
      go: function () {}
    };
    ctrl = $controller('LoginCtrl', {
      $scope: scope,
      Auth: Auth,
      User: User,
      $state: $state
    });
  }));

  describe('Login(form)', function () {
    it('should not be login', function () {
      scope.isLogin.should.equal(false);
    });

    it('should be login if form valid', function () {
      scope.login({
        $valid: true
      });
      scope.isLogin.should.equal(true);
    });

    it('should not be login if form not valid', function () {
      scope.login({
        $valid: false
      });
      scope.isLogin.should.equal(false);
    });

    it('should not be login after request', function () {
      $httpBackend.when('POST', 'http://localhost:9000/auth/local').respond({
        token: 'mon token'
      });
      $httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond(200);
      $httpBackend.when('PUT', 'http://localhost:9000/api/users/setLocation').respond(200);
      scope.login({
        $valid: true
      });
      $httpBackend.flush();
      scope.isLogin.should.equal(false);
    });
  });
});
