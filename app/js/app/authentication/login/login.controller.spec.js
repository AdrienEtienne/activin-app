'use strict';

describe('Controller: LoginCtrl', function () {

  var ctrl, $httpBackend, Auth, User, $state;

  // load the controller's module
  beforeEach(module('authentication.module'));
  beforeEach(module('$cordovaGeolocationMock'));

  // Initialize the controller and a mock $window
  beforeEach(inject(function ($controller, _$httpBackend_, _Auth_, _User_) {
    $httpBackend = _$httpBackend_;
    Auth = _Auth_;
    User = _User_;
    $state = {
      go: function () {}
    };
    ctrl = $controller('LoginCtrl', {
      Auth: Auth,
      User: User,
      $state: $state
    });
  }));

  describe('Login(form)', function () {
    it('should not be login', function () {
      ctrl.isLogin.should.equal(false);
    });

    it('should be login if form valid', function () {
      ctrl.login({
        $valid: true
      });
      ctrl.isLogin.should.equal(true);
    });

    it('should not be login if form not valid', function () {
      ctrl.login({
        $valid: false
      });
      ctrl.isLogin.should.equal(false);
    });

    it('should not be login after request', function () {
      $httpBackend.when('POST', 'http://localhost:9000/auth/local').respond({
        token: 'mon token'
      });
      $httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond(200);
      $httpBackend.when('PUT', 'http://localhost:9000/api/users/setLocation').respond(200);
      ctrl.login({
        $valid: true
      });
      $httpBackend.flush();
      ctrl.isLogin.should.equal(false);
    });

    describe('Error', function () {
      it('should set error of response.message', function () {
        $httpBackend.when('POST', 'http://localhost:9000/auth/local').respond({
          token: 'mon token'
        });
        $httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond(400, {
          message: 'error'
        });
        ctrl.login({
          $valid: true
        });
        $httpBackend.flush();
        ctrl.error.should.equal('error');
      });

      it('should set default error', function () {
        $httpBackend.when('POST', 'http://localhost:9000/auth/local').respond({
          token: 'mon token'
        });
        $httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond(400);
        ctrl.login({
          $valid: true
        });
        $httpBackend.flush();
        ctrl.error.should.equal('No response');
      });

      it('should set Unknown error', function () {
        $httpBackend.when('POST', 'http://localhost:9000/auth/local').respond({
          token: 'mon token'
        });
        $httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond(400, {
          truc: 'truc'
        });
        ctrl.login({
          $valid: true
        });
        $httpBackend.flush();
        ctrl.error.should.equal('Unknown error');
      });
    });
  });
});