angular.module('myWorkouts.controller', [
		'ionic',
		'ui.router',
		'workout.service',
		'components.workout',
	])
	.controller('MyWorkoutsCtrl', function (Workout, Invitation, $stateParams, $state, $ionicHistory, $ionicPopup) {
		var that = this;

		if (!$stateParams.partner) {
			$state.go('homemenu.dash');
			return;
		}

		that.partner = $stateParams.partner;
		that.title = 'Invite ' + that.partner.name;
		that.workouts = [];

		var sports = [];
		if (that.partner.sports) {
			for (var i = 0; i < that.partner.sports.length; i++) {
				if (that.partner.sports[i]._id) {
					sports.push(that.partner.sports[i]._id);
				} else {
					sports.push(that.partner.sports[i]);
				}
			}

			Workout.query({
					next: 'true',
					scope: 'user,sport',
					sports: sports
				}).$promise
				.then(function (data) {
					that.workouts = data;
				});
		}

		that.select = function (workout) {
			var invitation = new Invitation({
				userInvited: that.partner._id
			});

			invitation.$save({
					workoutId: workout._id
				})
				.then(function () {
					$ionicHistory.goBack();
				})
				.catch(function () {
					$ionicPopup.alert({
						title: 'Alert! Alert!',
						template: 'User already invited!'
					});
				});
		};
	});