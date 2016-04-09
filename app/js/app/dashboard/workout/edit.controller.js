angular.module('workoutEdit.controller', [
		'workout.service',
		'components.workout',
		'sport.service',
	])
	.controller('WorkoutEditCtrl', function (Workout, Sport, $ionicHistory) {
		var that = this;
		that.isCreating = false;
		that.workout = {};
		that.sports = Sport.query();
		that.error = null;

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
			that.error = null;
			that.isCreating = true;
			var workout = new Workout(that.workout);
			workout.$save()
				.then(function () {
					$ionicHistory.goBack();
					that.isCreating = false;
				})
				.catch(function (response) {
					that.isCreating = false;
					if (response.data && response.data.message) {
						that.error = response.data.message;
					} else {
						that.error = 'Unknown error';
					}
				});
		};
	});