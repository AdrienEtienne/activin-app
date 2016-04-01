'use strict';

angular.module('components.oauth', [
		'activinApp.constants',
		'ngCordovaOauth',
		'ui.router',
		'components.auth'
	])
	.controller('OauthButtonsCtrl', function (localEnv, $cordovaOauth, Auth, $state) {
		var that = this;

		that.isLogin = false;

		that.sendToken = function (accessToken, refreshToken) {
			Auth.oauth('google', accessToken, refreshToken)
				.then(function () {
					that.isLogin = false;
					$state.go('homemenu.dash');
				})
				.catch(function () {
					that.isLogin = false;
				});
		};

		that.loginOauth = function (provider) {
			if (provider === 'google') {
				that.isLogin = true;
				$cordovaOauth.google(localEnv.GOOGLE_ID, [
						'https://www.googleapis.com/auth/urlshortener',
						'https://www.googleapis.com/auth/userinfo.email'
					])
					.then(function (result) {
						that.sendToken(result.access_token, null);
					})
					.catch(function () {
						that.isLogin = false;
					});
			}
		};
	});