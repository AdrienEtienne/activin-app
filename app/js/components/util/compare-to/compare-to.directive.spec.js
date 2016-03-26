'use strict';

describe('Directive: compareTo', function () {

  // load the directive's module and view
  beforeEach(module('components.util'));

  var element, parentScope, elementScope;
  var html = '<form name="form"><div name="input" ng-model="var1" compare-to="var2"></div></form>';

  var compileDirective = function (template) {
    inject(function ($compile) {
      element = angular.element(template);
      element = $compile(element)(parentScope);
      parentScope.$digest();
      elementScope = element.isolateScope();
    });
  };

  beforeEach(inject(function ($rootScope) {
    parentScope = $rootScope.$new();
  }));

  it('should return valid', function () {
    parentScope.var1 = 'toto';
    parentScope.var2 = 'toto';
    compileDirective(html);
    parentScope.form.input.$valid.should.be.true;
  });

  it('should return invalid', function () {
    parentScope.var1 = 'toto';
    parentScope.var2 = 'tata';
    compileDirective(html);
    parentScope.form.input.$invalid.should.be.true;
  });

  it('should return valid when empty', function () {
    parentScope.var1 = null;
    parentScope.var2 = 'tata';
    compileDirective(html);
    parentScope.form.input.$valid.should.be.true;
  });
});
