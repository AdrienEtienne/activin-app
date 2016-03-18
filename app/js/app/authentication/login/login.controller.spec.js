'use strict';

describe('Controller: LoginCtrl', function() {

  var ctrl, scope, $httpBackend, Auth, User, $state;

  // load the controller's module
  beforeEach(module('auth.controller'));
  beforeEach(module('$cordovaGeolocationMock'));

  // Initialize the controller and a mock $window
  beforeEach(inject(function($controller, $rootScope, _$httpBackend_, _Auth_, _User_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    Auth = _Auth_;
    User = _User_;
    $state = {
      go: function() {}
    };
    ctrl = $controller('LoginCtrl', {
      $scope: scope,
      Auth: Auth,
      User: User,
      $state: $state
    });
  }));

  describe('Login', function() {
    it('should not be login', function() {
      scope.isLogin.should.equal(false);
    });

    it('should be login', function() {
      scope.login();
      scope.isLogin.should.equal(true);
    });

    it('should not be login after request', function() {
      $httpBackend.when('POST', 'http://localhost:9000/auth/local').respond({
        token: 'mon token'
      });
      $httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond(200);
      $httpBackend.when('PUT', 'http://localhost:9000/api/users/setLocation').respond(200);
      scope.login();
      $httpBackend.flush();
      scope.isLogin.should.equal(false);
    });
  });

  describe('updateLocation()', function() {

    var $rootScope, _$cordovaGeolocation;

    beforeEach(inject(function(_$rootScope_, $cordovaGeolocation) {
      $rootScope = _$rootScope_;
      _$cordovaGeolocation = $cordovaGeolocation;
    }));

    beforeEach('Get current user', function() {
      $httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond({
        _id: 'id',
        location: [1, 2],
        keepLocation: true
      });
      User.get();
      $httpBackend.flush();
    });

    it('should not call /api/users/:id/setLocation', function(done) {
      User.getCurrentUser().keepLocation = false;
      ctrl.updateLocation().catch(function() {
        done();
      });
      $rootScope.$digest();
    });

    it('should call /api/users/:id/setLocation', function(done) {
      _$cordovaGeolocation.setLongLat(1, 2);
      $httpBackend.when('PUT', 'http://localhost:9000/api/users/id/setLocation', {
        keepLocation: true,
        location: [1, 2]
      }).respond({
        location: [1, 2],
        keepLocation: true
      });
      ctrl.updateLocation().then(function() {
        User.currentLocation().should.deep.equal([1, 2]);
        User.keepLocation().should.equal(true);
        done();
      });
      $httpBackend.flush();
      $rootScope.$digest();
    });
  });
});