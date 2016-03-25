'use strict';

describe('Controller: SignupCtrl', function () {

  var ctrl, $httpBackend, Auth, User, $state;

  // load the controller's module
  beforeEach(module('signup.controller'));
  beforeEach(module('$cordovaGeolocationMock'));

  // Initialize the controller and a mock $window
  beforeEach(inject(function ($controller, _$httpBackend_, _Auth_, _User_) {
    $httpBackend = _$httpBackend_;
    Auth = _Auth_;
    User = _User_;
    $state = {
      go: function () {}
    };
    ctrl = $controller('SignupCtrl', {
      Auth: Auth,
      User: User,
      $state: $state
    });
  }));

  describe('signup(form)', function () {
    it('should not be signup', function () {
      ctrl.isSignup.should.equal(false);
    });

    it('should be signup if form valid', function () {
      ctrl.signup({
        $valid: true
      });
      ctrl.isSignup.should.equal(true);
    });

    it('should not be signup if form not valid', function () {
      ctrl.signup({
        $valid: false
      });
      ctrl.isSignup.should.equal(false);
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
      ctrl.user = {
        name: 'name',
        email: 'mail',
        password: 'password'
      };
      ctrl.signup({
        $valid: true
      });
      $httpBackend.flush();
      ctrl.isSignup.should.equal(false);
    });
  });
});
