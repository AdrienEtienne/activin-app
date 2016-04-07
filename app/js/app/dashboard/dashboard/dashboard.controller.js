angular.module('dashboard.controller', [
		'workout.service'
	])
	.controller('DashboardCtrl', function (Workout) {
		var that = this;

		var nextWorkout = Workout.query({
			next: 'true',
			scope: 'id',
			filter: 'accepted'
		});
		var unknownWorkout = Workout.query({
			next: 'true',
			scope: 'id',
			filter: 'unknown'
		});
		var refusedWorkout = Workout.query({
			next: 'true',
			scope: 'id',
			filter: 'refused'
		});

		that.countNextWorkout = function () {
			return nextWorkout.length;
		};

		that.countUnknownWorkout = function () {
			return unknownWorkout.length;
		};

		that.countRefusedWorkout = function () {
			return refusedWorkout.length;
		};
	});
