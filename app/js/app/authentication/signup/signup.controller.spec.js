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
      $httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond(200);
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

    describe('Error', function () {
      beforeEach(function () {
        ctrl.user = {
          name: 'name',
          email: 'mail',
          password: 'password'
        };
      });

      it('should set error of response.message', function () {
        $httpBackend.when('POST', 'http://localhost:9000/api/users', {
            name: 'name',
            email: 'mail',
            password: 'password'
          })
          .respond(400, {
            message: 'error'
          });
        ctrl.signup({
          $valid: true
        });
        $httpBackend.flush();
        ctrl.error.should.equal('error');
      });

      describe('response.errors', function () {
        it('should set error of response.errors.email', function () {
          $httpBackend.when('POST', 'http://localhost:9000/api/users', ctrl.user)
            .respond(400, {
              errors: {
                email: {
                  message: 'email'
                }
              }
            });
          ctrl.signup({
            $valid: true
          });
          $httpBackend.flush();
          ctrl.error.should.equal('email');
        });

        it('should set error of response.errors.name', function () {
          $httpBackend.when('POST', 'http://localhost:9000/api/users', ctrl.user)
            .respond(400, {
              errors: {
                name: {
                  message: 'name'
                }
              }
            });
          ctrl.signup({
            $valid: true
          });
          $httpBackend.flush();
          ctrl.error.should.equal('name');
        });

        it('should set error of response.errors.password', function () {
          $httpBackend.when('POST', 'http://localhost:9000/api/users', ctrl.user)
            .respond(400, {
              errors: {
                password: {
                  message: 'password'
                }
              }
            });
          ctrl.signup({
            $valid: true
          });
          $httpBackend.flush();
          ctrl.error.should.equal('password');
        });

        it('should set error of response.errors.Unknown', function () {
          $httpBackend.when('POST', 'http://localhost:9000/api/users', ctrl.user)
            .respond(400, {
              errors: {
                Unknown: {
                  message: 'Unknown'
                }
              }
            });
          ctrl.signup({
            $valid: true
          });
          $httpBackend.flush();
          ctrl.error.should.equal('Unknown error');
        });
      });

      it('should set default error', function () {
        $httpBackend.when('POST', 'http://localhost:9000/api/users', {
          name: 'name',
          email: 'mail',
          password: 'password'
        }).respond(400);
        ctrl.signup({
          $valid: true
        });
        $httpBackend.flush();
        ctrl.error.should.equal('No response');
      });

      it('should set Unknown error', function () {
        $httpBackend.when('POST', 'http://localhost:9000/api/users', {
          name: 'name',
          email: 'mail',
          password: 'password'
        }).respond(400, {
          truc: 'truc'
        });
        ctrl.signup({
          $valid: true
        });
        $httpBackend.flush();
        ctrl.error.should.equal('Unknown error');
      });
    });
  });
});
