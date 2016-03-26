'use strict';

describe('Service: User', function () {

  var User, $httpBackend;
  var $rootScope;
  var _$cordovaGeolocation;

  // load the controller's module
  beforeEach(module('components.user'));
  beforeEach(module('$cordovaGeolocationMock'));

  // Initialize the controller and a mock $window
  beforeEach(inject(function (_User_, _$httpBackend_, _$rootScope_, $cordovaGeolocation) {
    User = _User_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    _$cordovaGeolocation = $cordovaGeolocation;
  }));

  describe('get()', function () {
    it('should call /api/users/me', function (done) {
      $httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond({
        _id: 'id',
        keepLocation: true
      });
      User.get().then(function () {
        done();
      });
      $httpBackend.flush();
    });
  });

  describe('changeSports(sportIds)', function () {
    beforeEach(function () {
      $httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond({
        _id: 'id',
        sports: []
      });
      User.get();
      $httpBackend.flush();
    });

    it('should call /api/users/:id/sports with empty array', function (done) {
      $httpBackend.when('PUT', 'http://localhost:9000/api/users/id/sports', []).respond(204);
      User.changeSports().then(function () {
        done();
      });
      $httpBackend.flush();
    });

    it('should call /api/users/:id/sports with ids', function (done) {
      $httpBackend.when('PUT', 'http://localhost:9000/api/users/id/sports', ['id']).respond(204);
      User.changeSports(['id']).then(function () {
        User.getSportIds().should.deep.equal(['id']);
        done();
      });
      $httpBackend.flush();
    });
  });

  describe('Location', function () {
    beforeEach(function () {
      $httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond({
        _id: 'id',
        keepLocation: true,
        location: [1, 1]
      });
      User.get();
      $httpBackend.flush();
    });

    describe('currentLocation(lat, long)', function () {
      it('should return the location', function () {
        User.currentLocation().should.deep.equal([1, 1]);
      });

      it('should not call /api/users/:id/setLocation', function (done) {
        User.getCurrentUser().keepLocation = false;
        User.currentLocation(1, 2)
          .catch(function () {
            User.currentLocation().should.deep.equal([1, 1]);
            done();
          });
        $rootScope.$digest();
      });

      it('should call /api/users/:id/setLocation', function (done) {
        $httpBackend.when('PUT', 'http://localhost:9000/api/users/id/setLocation', {
          keepLocation: true,
          location: [1, 2]
        }).respond({
          location: [1, 2],
          keepLocation: true
        });
        User.currentLocation(1, 2).then(function () {
          User.currentLocation().should.deep.equal([1, 2]);
          User.keepLocation().should.equal(true);
          done();
        });
        $httpBackend.flush();
        $rootScope.$digest();
      });

      it('should call /api/users/:id/setLocation and return 404', function (done) {
        $httpBackend.when('PUT', 'http://localhost:9000/api/users/id/setLocation', {
          keepLocation: true,
          location: [1, 2]
        }).respond(403);
        User.currentLocation(1, 2).catch(function () {
          User.currentLocation().should.deep.equal([1, 1]);
          User.keepLocation().should.equal(true);
          done();
        });
        $httpBackend.flush();
        $rootScope.$digest();
      });
    });

    describe('updateLocation()', function () {
      beforeEach('Get current user', function () {
        $httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond({
          _id: 'id',
          location: [],
          keepLocation: true
        });
        User.get();
        $httpBackend.flush();
      });

      it('should not call /api/users/:id/setLocation', function (done) {
        User.getCurrentUser().keepLocation = false;
        User.updateLocation().catch(function () {
          done();
        });
        $rootScope.$digest();
      });

      it('should call /api/users/:id/setLocation', function (done) {
        _$cordovaGeolocation.setLongLat(1, 2);
        $httpBackend.when('PUT', 'http://localhost:9000/api/users/id/setLocation', {
          keepLocation: true,
          location: [1, 2]
        }).respond({
          location: [1, 2],
          keepLocation: true
        });
        User.updateLocation().then(function () {
          User.currentLocation().should.deep.equal([1, 2]);
          User.keepLocation().should.equal(true);
          done();
        });
        $httpBackend.flush();
        $rootScope.$digest();
      });
    });

    describe('keepLocation(newVal)', function () {
      it('should return true', function () {
        User.keepLocation().should.equal(true);
      });

      it('should return false', function () {
        User.getCurrentUser().keepLocation = false;
        User.keepLocation().should.equal(false);
      });

      it('should set value to false', function () {
        User.keepLocation(false);
        User.keepLocation().should.equal(false);
      });

      it('should set value to true', function () {
        User.getCurrentUser().keepLocation = false;
        User.keepLocation(true);
        User.keepLocation().should.equal(true);
      });

      it('should request /api/users/id/setLocation', function () {
        $httpBackend.when('PUT', 'http://localhost:9000/api/users/id/setLocation', {
          keepLocation: false,
          location: []
        }).respond({
          keepLocation: false,
          location: []
        });
        User.keepLocation(false);
        $httpBackend.flush();
        User.getCurrentUser().location.should.deep.equal([]);
      });
    });
  });
});
