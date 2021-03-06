'use strict';

describe('Controller: OauthButtonsCtrl', function () {

  var ctrl, state, $httpBackend;
  var route;

  // load the controller's module
  beforeEach(module('components.oauth'));
  beforeEach(module('$cordovaGeolocationMock'));

  // Initialize the controller and a mock $window
  beforeEach(inject(function ($controller, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    state = {
      go: function (routeReceived) {
        route = routeReceived;
      }
    };
    ctrl = $controller('OauthButtonsCtrl', {
      $state: state
    });
  }));

  describe('sendToken(accessToken, refreshToken)', function () {
    var reqOauth;
    var reqMe;

    beforeEach(function () {
      reqOauth = $httpBackend.when('GET', 'http://localhost:9000/auth/google/client?access_token=mytoken');
      reqMe = $httpBackend.when('GET', 'http://localhost:9000/api/users/me');
    });

    it('should send requests', function () {
      reqOauth.respond(200, {
        data: {
          token: 'token'
        }
      });
      reqMe.respond(200);
      ctrl.sendToken('mytoken');
      $httpBackend.flush();
    });

    it('should redirect to homemenu.dash', function () {
      reqOauth.respond(200, {
        token: 'token'
      });
      reqMe.respond(200);
      ctrl.sendToken('mytoken');
      $httpBackend.flush();
      route.should.equal('homemenu.dash');
    });

    it('should catch the error', function () {
      reqOauth.respond(400);
      ctrl.isLogin = true;
      ctrl.sendToken('mytoken');
      $httpBackend.flush();
      ctrl.isLogin.should.be.false;
    });
  });

  describe('loginOauth(provider)', function () {
    it('should send no request', function () {
      ctrl.loginOauth();
    });

    describe('Google', function () {
      var cordovaOauth;
      var rootScope;
      var access, refresh;
      var valid = true;

      // Initialize the controller and a mock $window
      beforeEach(inject(function ($rootScope, $controller, $q) {
        rootScope = $rootScope;
        cordovaOauth = {
          google: function () {
            return $q(function (resolve, reject) {
              if (valid) {
                resolve({
                  access_token: access,
                  refresh_token: refresh
                });
              } else {
                reject();
              }
            });
          }
        };
        ctrl = $controller('OauthButtonsCtrl', {
          $cordovaOauth: cordovaOauth
        });
      }));

      it('should send request', function (done) {
        access = 'toto';
        refresh = 'tata';
        valid = true;
        ctrl.sendToken = function (arg1) {
          arg1.should.equal(access);
          ctrl.isLogin.should.be.true;
          done();
        };
        ctrl.loginOauth('google');
        rootScope.$digest();
      });

      it('should catch error', function () {
        valid = false;
        ctrl.loginOauth('google');
        ctrl.isLogin.should.be.true;
        rootScope.$digest();
        ctrl.isLogin.should.be.false;
      });
    });
  });
});