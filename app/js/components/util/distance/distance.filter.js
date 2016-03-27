angular.module('components.util')
  .filter('distance', function () {
    return function (input) {
      input = parseInt(input);
      if (input >= 1) {
        return input.toFixed(1) + 'km';
      } else {
        return input * 1000 + 'm';
      }
    }
  });
