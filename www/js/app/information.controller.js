angular.module('information.controller', ['activinApp.constants'])

.controller('InformationCtrl', function (appConfig) {
	var that = this;

	that.version = appConfig.version;
});
