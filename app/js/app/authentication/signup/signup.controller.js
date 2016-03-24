angular.module('signup.controller', ['components.auth', 'components.location'])

.controller('SignupCtrl', function ($scope, Auth, User, $state) {
    var that = this;

    $scope.user = {};
    $scope.user.email = Auth.getLogin();
    $scope.user.password = Auth.getPassword();
    $scope.isSignup = false;
    $scope.errors = null;

    $scope.signup = function (form) {
      if (form.$valid) {
        $scope.isSignup = true;
        $scope.error = null;
        Auth
          .createUser({
            name: $scope.user.name,
            email: $scope.user.email,
            password: $scope.user.password
          })
          .then(function () {
            $scope.isSignup = false;
            User.updateLocation();
            $state.go('homemenu.dash');
          })
          .catch(function (response) {
            $scope.isSignup = false;
            if (!response) {
              $scope.error = 'No response';
            } else if (response.errors) {
              if (response.errors.email) {
                $scope.error = response.errors.email.message;
              } else if (response.errors.password) {
                $scope.error = response.errors.password.message;
              } else if (response.errors.name) {
                $scope.error = response.errors.name.message;
              }
            } else if (response.message) {
              $scope.error = response.message;
            } else {
              $scope.error = 'Unknown error';
            }
          });
      } else {
        return;
      }
    };
  })
  .directive('compareTo', function () {
    return {
      require: 'ngModel',
      scope: {
        otherValue: '=compareTo'
      },
      link: function (scope, elm, attrs, ctrl) {
        console.log('toto', ctrl);
        ctrl.$validators.compareTo = function (modelValue, viewValue) {
          if (ctrl.$isEmpty(modelValue)) {
            return true;
          } else if (scope.otherValue === viewValue) {
            return true;
          } else {
            return false;
          }
        };
      }
    };
  });
