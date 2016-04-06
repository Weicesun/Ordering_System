var foodList = angular.module('foodList', []);

function mainController($scope, $http) {
	$scope.formData = {
		name:'',
		price: 0
	};
	$scope.total = 0;
	$scope.formValueData = {};
	$http.get('/api/food')
		.success(function(data) {
			$scope.food = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	$http.get('/api/total')
		.success(function(data) {
			$scope.total = data;
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
	$scope.calculatePrice = function() {
       $http.get('/api/total')
		.success(function(data) {
			$scope.total = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};
}
