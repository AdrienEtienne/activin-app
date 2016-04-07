angular.module('workouts.controller', [
		'workout.service'
	])
	.controller('WorkoutsCtrl', function (Workout) {
		var that = this;

		that.workouts = Workout.query({
			next: 'true',
			scope: 'user,sport',
			filter: 'accepted,refused,unknown'
		});
	});
