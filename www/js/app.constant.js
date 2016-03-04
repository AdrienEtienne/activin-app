(function(angular, undefined) {
  angular.module("activinApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin"
	],
	"apiUrl": "http://localhost:9000"
})

;
})(angular);