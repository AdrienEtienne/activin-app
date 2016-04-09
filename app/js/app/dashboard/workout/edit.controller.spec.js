'use strict';

describe('Controller: WorkoutsCtrl', function () {
  var ctrl;
  var $httpBackend, $controller;

  // load the controller's module
  beforeEach(module('workoutEdit.controller'));

  beforeEach(inject(function (_$controller_, _$httpBackend_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    ctrl = $controller('WorkoutEditCtrl', {});
    $httpBackend.when('GET', 'http://localhost:9000/api/sports')
      .respond([{
        _id: 'id',
        name: 'running'
      }]);
  }));

  describe('create()', function () {
    var req;
    beforeEach(function () {
      ctrl.workout = {
        name: 'name',
        sport: 'sportId',
        dateStart: new Date()
      };
      req = $httpBackend.when('POST', 'http://localhost:9000/api/workouts', {
        name: 'name',
        sport: 'sportId',
        dateStart: new Date()
      });
    });

    it('should request POST', function () {
      req.respond(200);
      ctrl.create();
      $httpBackend.flush();
    });

    it('should set error', function () {
      req.respond(404);
      ctrl.create();
      $httpBackend.flush();
      should.exist(ctrl.error);
      req.respond(404, {
        message: 'message'
      });
      ctrl.create();
      $httpBackend.flush();
      should.exist(ctrl.error);
      req.respond(404, {
        toto: 'titi'
      });
      ctrl.create();
      $httpBackend.flush();
      should.exist(ctrl.error);
    });
  });
});