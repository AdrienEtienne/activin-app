(function(angular, undefined) {
  angular.module("activinApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin"
	],
	"version": "1.0.0-alpha.2",
	"apiUrl": "http://activin-aenode.rhcloud.com"
})

.constant("localEnv", {})

;
})(angular);