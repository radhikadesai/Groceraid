app.controller("myCtrl", function($scope) {
	$scope.firstName	= "John";
    $scope.lastName= "Doe";

    $scope.foods = [
    {
      quantity: 5,
      healthVal: 5
    },
    {
      quantity: 4,
      healthVal: 2
    },
    {
      quantity: 3,
      healthVal: 1
    },
    {
      quantity: 2,
      healthVal: 5
    }
   ];
});