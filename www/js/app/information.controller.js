angular.module('information.controller', ['activinApp.constants'])

.controller('InformationCtrl', function (appConfig, $scope) {
	var that = this;

	$scope.version = appConfig.version;
});
