angular.module('auth.controller', ['components.auth'])

.controller('AuthCtrl', function ($scope, Auth, $state) {
	var that = this;

	that.user = {};
	that.errors = null;

	that.login = function () {
		that.error = null;
		Auth.login(that.user.email, that.user.password)
			.then(function () {
				$state.go('home.dash');
			})
			.catch(function (response) {
				if (response.message) {
					that.error = response.message;
				} else {
					that.error = 'Unknown error';
				}
			});
	}
});
