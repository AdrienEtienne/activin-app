'use strict';

describe('Controller: MainMenuCtrl', function () {

  var ctrl;
  var User;

  beforeEach(module('menu.controller'));

  // Initialize the controller and a mock $window
  beforeEach(inject(function ($controller, _User_, $httpBackend) {
    var User = _User_;

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

  it('should have a user properties', function () {
    ctrl.user.name.should.equal('name');
    ctrl.user.email.should.equal('email');
  });
});
