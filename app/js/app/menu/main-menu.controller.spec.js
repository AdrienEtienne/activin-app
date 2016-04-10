'use strict';

describe('Controller: MainMenuCtrl', function () {

  var ctrl;
  var User;

  beforeEach(module('menu.controller'));
  beforeEach(module('$cordovaGeolocationMock'));

  // Initialize the controller and a mock $window
  beforeEach(inject(function ($controller, _User_, $httpBackend) {
    User = _User_;

    $httpBackend.when('GET', 'http://localhost:9000/api/users/me').respond({
      _id: 'id',
      name: 'name',
      email: 'email'
    });
    User.get();
    $httpBackend.flush();

    ctrl = $controller('MainMenuCtrl', {
      User: User
    });
  }));

  it('should return the name', function () {
    ctrl.name.should.equal('name');
  });

  it('should return the mail', function () {
    ctrl.email.should.equal('email');
  });
});