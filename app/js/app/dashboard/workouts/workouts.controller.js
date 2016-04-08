angular.module('workouts.controller', [
		'workout.service',
		'components.workout',
		'components.user',
	])
	.controller('WorkoutsCtrl', function ($q, User, Workout, Invitation) {
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
				that.workouts.forEach(function (workout, i) {
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
	});
