angular.module('workouts.controller', [
		'ui.router',
		'workout.service',
		'components.workout',
	])
	.controller('WorkoutsCtrl', function (Workout, Invitation, $state) {
		var that = this;
		that.workouts = [];
		that.invitations = [];
		Workout.query({
				next: 'true',
				scope: 'user,sport',
				filter: 'accepted,refused,unknown'
			}).$promise
			.then(function (data) {
				that.workouts = data;
				that.workouts.forEach(function (workout) {
					workout.invitation = Workout.get({
						id: workout._id,
						controller: 'invitation'
					});
				});
			});

		that.invitResponse = function (choice, workout) {
			workout.invitation.state = choice;
			Invitation.update({
				workoutId: workout._id,
				id: workout.invitation._id
			}, {
				state: choice
			});
		};

		that.add = function () {
			$state.go('workouts.edit');
		};
	});