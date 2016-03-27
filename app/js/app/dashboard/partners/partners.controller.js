angular.module('dashboard.module')
  .controller('SearchPartnersCtrl', function (Search, $ionicModal, $scope) {
    var that = this;

    var modal = null;
    $scope.modal = {
      title: 'Filter',
      params: {
        distance: 2
      },
      close: function () {
        modal.hide();
      }
    };

    that.partners = Search.partners();

    $ionicModal.fromTemplateUrl('templates/modal/searchPartners.html', {
      animation: 'slide-in-up',
      scope: $scope,
      backdropClickToClose: true,
      hardwareBackButtonClose: true
    }).then(function (result) {
      console.log(result);
      modal = result;
    });

    that.filter = function () {
      modal.show();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
      console.log('modal.hidden');
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
      console.log('modal.removed');
    });
  });
