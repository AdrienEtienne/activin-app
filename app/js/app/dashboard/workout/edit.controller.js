angular.module('workoutEdit.controller', [
		'workout.service',
		'components.workout',
		'components.user',
		'sport.service',
	])
	.controller('WorkoutEditCtrl', function (User, Workout, Sport) {
		var that = this;
		that.workout = {};
		that.sports = Sport.query();

		that.dates = [{
			name: 'In one day?',
			value: new Date().setDate(new Date().getDate() + 1)
		}, {
			name: 'Two days?',
			value: new Date().setDate(new Date().getDate() + 2)
		}, {
			name: 'No lower than 3!',
			value: new Date().setDate(new Date().getDate() + 3)
		}, {
			name: 'What 4 and more?!',
			value: new Date().setDate(new Date().getDate() + 4)
		}];

		that.create = function () {
			var workout = new Workout(that.workout);
			workout.createdBy = User.getCurrentUser()._id;
			workout.$save();
		};
	});
