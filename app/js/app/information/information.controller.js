angular.module('information.controller', ['activinApp.constants'])

.controller('InformationCtrl', function (appConfig, $scope) {
	$scope.version = appConfig.version;
});
