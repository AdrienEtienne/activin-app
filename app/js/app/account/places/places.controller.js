angular.module('account.module')
  .controller('PlacesAccountCtrl', function($scope) {
    $scope.shouldShowDelete = true;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;

    $scope.items = [];
    for (var i = 0; i <= 5; i++) {
      $scope.items.push({
        title: 'Place ' + (i + 1),
        description: 'Description'
      });
    }
  });