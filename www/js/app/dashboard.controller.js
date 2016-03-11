angular.module('dashboard.controller', [
	'components.auth'
])

.controller('DashCtrl', function ($scope, Auth) {
	$scope.user = Auth.getCurrentUser();

});
