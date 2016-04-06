var foodList = angular.module('foodList', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('/api/food')
		.success(function(data) {
			$scope.food = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.createFood = function() {
		$http.post('/api/food', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.food = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.deleteFood = function(id) {
		$http.delete('/api/food/' + id)
			.success(function(data) {
				$scope.food = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}
