angular.module('components.util')
  .filter('distance', function () {
    return function (input) {
      input = parseFloat(input);
      input = parseFloat(input.toFixed(1));
      if (input >= 1) {
        return input + 'km';
      } else {
        return input * 1000 + 'm';
      }
    }
  });
