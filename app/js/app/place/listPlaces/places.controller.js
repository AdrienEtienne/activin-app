angular.module('place.module')
  .controller('PlacesAccountCtrl', function (Place) {
    var that = this;

    that.places = Place.query();

    that.removePlace = function (index) {
      var tmp = that.places.splice(index, 1);
      if (tmp.length === 1) {
        tmp[0].$delete();
      }
    };

  });
