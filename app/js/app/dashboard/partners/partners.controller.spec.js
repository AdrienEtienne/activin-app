'use strict';

describe('Controller: SearchPartnersCtrl', function () {
  var ctrl, scope;
  var $httpBackend, $controller, $rootScope;
  var Search;

  var partners;

  // load the controller's module
  beforeEach(module('dashboard.module'));

  beforeEach(module('templates/dash.html'));
  beforeEach(module('templates/partners/list.html'));
  beforeEach(module('templates/modal/searchPartners.html'));

  beforeEach(inject(function (
    _$controller_, _$rootScope_, _$httpBackend_, _Search_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    Search = _Search_;
    ctrl = $controller('SearchPartnersCtrl', {
      Search: Search,
      $scope: scope
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

  describe('scope.params.distance()', function () {
    it('should not exist', function () {
      should.not.exist(scope.modal.params.distance());
    });

    it('should be equal to 3', function () {
      scope.modal.params.distance(3);
      scope.modal.params.distance().should.equal(3);
    });

    it('should no request if distance not changed', function () {
      $httpBackend
        .when('POST', 'http://localhost:9000/api/searchs/partners')
        .respond(partners);
      $httpBackend.flush();
      scope.modal.close();
    });

    it('should request if distance changed', function () {
      $httpBackend
        .when('POST', 'http://localhost:9000/api/searchs/partners')
        .respond(partners);
      $httpBackend.flush();
      scope.modal.params.distance(3);
      $httpBackend
        .when('POST', 'http://localhost:9000/api/searchs/partners', {
          distance: 3
        })
        .respond(partners);
      scope.modal.close();
      $httpBackend.flush();
    });
  });
});
