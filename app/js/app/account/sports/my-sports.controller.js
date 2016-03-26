angular.module('account.module')
	.controller('MySportsCtrl', function (User, Sport) {
		var that = this;

		var selectedSports = User.getSportsId();

		that.sports = Sport.query();

		that.selected = function (sport) {
			return function (newValue) {
				if (angular.isDefined(newValue)) {
					if (newValue) {
						selectedSports.push(sport._id);
					} else {
						var i = selectedSports.indexOf(sport._id);
						if (i !== -1) {
							selectedSports.splice(i, 1);
						}
					}
				} else {
					if (selectedSports.indexOf(sport._id) !== -1) {
						return true;
					} else {
						return false;
					}
				}
			}
		};
	});
