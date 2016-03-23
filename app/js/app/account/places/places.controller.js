angular.module('account.module')
  .controller('PlacesAccountCtrl', function (Place) {
    var that = this;

    var places = [];

    that.getPlaces = function () {
      return places;
    }

    that.removePlace = function (index) {
      var tmp = places.splice(index, 1);
      if (tmp.length === 1) {
        tmp[0].$delete();
      }
    }

    Place.query().$promise
      .then(function (data) {
        places = data;
      })
      .catch(function () {
        places = [];
      });

  });
