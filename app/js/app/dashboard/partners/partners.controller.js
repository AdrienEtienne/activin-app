angular.module('dashboard.module')
  .controller('SearchPartnersCtrl', function (Search, $ionicModal, $scope) {
    var that = this;

    var distance = 2;
    var filterChanged = false;

    that.modal = null;

    $scope.modal = {
      title: 'Filter',
      params: {
        distance: function (newVal) {
          if (arguments.length) {
            distance = newVal;
            filterChanged = true;
          } else {
            return distance;
          }
        }
      },
      close: function () {
        that.modal.hide();
        if (filterChanged) {
          search();
        }
      }
    };

    $ionicModal.fromTemplateUrl('templates/modal/searchPartners.html', {
      animation: 'slide-in-up',
      scope: $scope
    }).then(function (result) {
      that.modal = result;
    });

    function search() {
      that.partners = Search.partners({
        distance: distance
      });
    };

    search();
  });
