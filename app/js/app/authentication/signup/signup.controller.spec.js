'use strict';

describe('Controller: SignupCtrl', function () {

  var ctrl, scope, $httpBackend, Auth, User, $state;

  // load the controller's module
  beforeEach(module('signup.controller'));
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
    ctrl = $controller('SignupCtrl', {
      $scope: scope,
      Auth: Auth,
      User: User,
      $state: $state
    });
  }));

  describe('signup(form)', function () {
    it('should not be signup', function () {
      scope.isSignup.should.equal(false);
    });

    it('should be signup if form valid', function () {
      scope.signup({
        $valid: true
      });
      scope.isSignup.should.equal(true);
    });

    it('should not be signup if form not valid', function () {
      scope.signup({
        $valid: false
      });
      scope.isSignup.should.equal(false);
    });

    it('should not be signup after request', function () {
      $httpBackend.when('POST', 'http://localhost:9000/api/users', {
          name: 'name',
          email: 'mail',
          password: 'password'
        })
        .respond({
          token: 'mon token'
        });
      $httpBackend.when('PUT', 'http://localhost:9000/api/users/setLocation').respond(200);
      scope.user = {
        name: 'name',
        email: 'mail',
        password: 'password'
      };
      scope.signup({
        $valid: true
      });
      $httpBackend.flush();
      scope.isSignup.should.equal(false);
    });
  });
});
