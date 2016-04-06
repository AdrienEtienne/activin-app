angular.module('dashboard.controller', [
		'workout.service'
	])
	.controller('DashboardCtrl', function (Workout) {
		var that = this;

		var nextWorkout = Workout.getNext();

		that.countNextWorkout = function () {
			return nextWorkout.length;
		}
	});
