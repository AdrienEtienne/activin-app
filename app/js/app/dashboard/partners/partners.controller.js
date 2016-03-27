angular.module('dashboard.module')
  .controller('SearchPartnersCtrl', function (Search) {
    var that = this;

    that.partners = Search.partners();
  });
