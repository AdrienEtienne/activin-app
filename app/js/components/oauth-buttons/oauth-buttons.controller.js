'use strict';

angular.module('components.oauth', [])
	.controller('OauthButtonsCtrl', function ($window) {
		this.loginOauth = function (provider) {
			$window.location.href = '/auth/' + provider;
		};
	});
