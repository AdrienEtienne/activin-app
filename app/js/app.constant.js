(function(angular, undefined) {
  angular.module("activinApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin"
	],
	"version": "1.0.0-alpha.2",
	"apiUrl": "http://localhost:9000"
})

.constant("localEnv", {
	"FACEBOOK_ID": "app-id",
	"FACEBOOK_SECRET": "secret",
	"GOOGLE_ID": "397115917765-pvc61d0mrvq412ie8ldt3cj219170cbd.apps.googleusercontent.com",
	"GOOGLE_SECRET": "3YdxjbyAiRMPoQqm8Nl3r6CX",
	"DEBUG": ""
})

;
})(angular);