app.controller("myCtrl", function($scope, $http) {
  
  /*
  $http.get("http://10.136.103.170:3000/sandbox")
    .then(function mySuccess(response) {
        $scope.myWelcome = response.data[user_input];
        alert("Worked");
    });
*/

    $http({
        method : "GET",
        url : "http://10.136.103.170:3000/sandbox"
    }).then(function mySucces(response) {
        $scope.myWelcome = response.data;
        console.log("$scope.myWelcome: ",$scope.myWelcome);
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
         console.log("error: ",response);
    });
    //alert("Hello");


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