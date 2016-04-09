'use strict';

describe('Filter: distance', function () {

  // load the directive's module and view
  beforeEach(module('components.util'));

  it('should exist', inject(function ($filter) {
    should.exist($filter('distance'));
  }));

  it('should return result in meters', inject(function (distanceFilter) {
    distanceFilter(0.511).should.equal('500 meters');
  }));

  it('should return result in kilometers', inject(function (distanceFilter) {
    distanceFilter(1.611).should.equal('1.6 kilometers');
  }));
});