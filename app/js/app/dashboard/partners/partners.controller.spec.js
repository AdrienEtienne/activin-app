'use strict';

describe('Controller: SearchPartnersCtrl', function () {
  var ctrl;
  var $httpBackend, $controller;
  var Search;

  var partners;

  // load the controller's module
  beforeEach(module('dashboard.module'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_,
    _$httpBackend_, _Search_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    Search = _Search_;
    ctrl = $controller('SearchPartnersCtrl', {
      Search: Search
    });
  }));

  beforeEach(function () {
    partners = [{
      _id: 'id',
      name: 'name',
      distance: 1.5,
      sports: []
    }];
  });

  describe('partners', function () {
    it('should not have results', function () {
      ctrl.partners.should.be.empty;
    });

    it('should have one result', function () {
      $httpBackend
        .when('POST', 'http://localhost:9000/api/searchs/partners')
        .respond(partners);
      $httpBackend.flush();
      ctrl.partners.should.have.length(1);
    });
  });
});
