'use strict';

angular.module('components.auth', [
		'activinApp.constants',
		'components.util',
		'ngCookies',
		'ui.router'
	])
	.config(function ($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
	});
