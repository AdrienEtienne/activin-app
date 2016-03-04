angular.module('dashboard.controller', [
	'ngResource',
	'components.auth'
])

.controller('DashCtrl', function ($scope, $resource, appConfig, Auth) {
	var sport = $resource(appConfig.apiUrl + '/api/sports');
	$scope.sports = sport.query();
	$scope.user = Auth.getCurrentUser();
});
