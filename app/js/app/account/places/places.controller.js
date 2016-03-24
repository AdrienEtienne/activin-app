angular.module('account.module')
  .controller('PlacesAccountCtrl', function (Place, $state) {
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

    that.goPlace = function (place) {
      $state.go('account.place', {
        place: place
      });
    }

    Place.query().$promise
      .then(function (data) {
        places = data;
        places.push({
          placeid: 'id',
          description: 'description'
        });
      })
      .catch(function () {
        places = [];
      });

  });
