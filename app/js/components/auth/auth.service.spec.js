'use strict';

describe('Service: Auth', function () {

  var Auth, $httpBackend;

  // load the controller's module
  beforeEach(module('components.auth'));

  // Initialize the controller and a mock $window
  beforeEach(inject(function (_Auth_, _$httpBackend_) {
    Auth = _Auth_;
    $httpBackend = _$httpBackend_;
    window.localStorage.token = undefined;
  }));

  beforeEach(function () {
    $httpBackend.when('POST', 'http://localhost:9000/auth/local').respond({
      token: 'mon token'
    });
    $httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond({
      _id: 'id',
      keepLocation: true
    });
    Auth.login('email', 'password');
    $httpBackend.flush();
  });

  describe('Login/Password/Token', function () {
    it('should have login', function () {
      Auth.getLogin().should.equal('email');
    });

    it('should have password', function () {
      Auth.getPassword().should.equal('password');
    });

    it('should have token', function () {
      Auth.getToken().should.equal('mon token');
    });

    it('should not have login', function () {
      Auth.logout();
      should.not.exist(Auth.getLogin());
    });

    it('should not have password', function () {
      Auth.logout();
      should.not.exist(Auth.getPassword());
    });

    it('should not have token', function () {
      Auth.logout();
      should.not.exist(Auth.getToken());
    });
  });

  describe('oauth(provider, accessToken, refreshToken)', function () {
    it('should send request', function () {
      $httpBackend.when('GET', 'http://localhost:9000/auth/google/client?access_token=mytoken')
        .respond(200, {
          data: {
            token: 'token'
          }
        });
      Auth.oauth('google', 'mytoken');
      $httpBackend.flush();
    });

    it('should update token when success', function () {
      window.localStorage.accessToken = undefined;
      $httpBackend.when('GET', 'http://localhost:9000/auth/google/client?access_token=mytoken')
        .respond(200, {
          token: 'token'
        });
      Auth.oauth('google', 'mytoken');
      $httpBackend.flush();
      Auth.getToken().should.equal('token');
    });
  });
});