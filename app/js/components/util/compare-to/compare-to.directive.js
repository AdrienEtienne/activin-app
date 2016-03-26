angular.module('components.util')
  .directive('compareTo', function () {
    return {
      require: 'ngModel',
      scope: {
        otherValue: '=compareTo'
      },
      link: function (scope, elm, attrs, ctrl) {
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
