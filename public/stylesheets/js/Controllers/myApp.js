var app = angular.module("myApp", []);

app.controller("timeCtrl", function($scope, $http, $timeout){
	//Counter needs to actually be initialized with the min value of the foods list's time
	//until something is predicted to run out
	$http({
        method : "GET",
        url : "http://localhost:3000/food"
    }).then(function mySucces(response) {
        $scope.myWelcome = response.data;
        console.log("$scope.myWelcome: ",$scope.myWelcome);
        $scope.counter = 3;
        //$scope.myTimeFunction = $scope.timeFunction();
        /*
        $scope.onTimeout = function($scope, $timeout){
          $scope.counter--;
          console.log(this.count);
          if($scope.counter > 0){
            mytimeout = $timeout($scope.onTimeout,1000);
          }

          else{
            console.log("Time to go shopping!");
          }
        }
        */
        $scope.Math = Math;
        $scope.timeFunction = function($scope, $timeout){
          //Counter needs to actually be initialized with the min value of the foods list's time
          //until something is predicted to run out
          $scope.onTimeout = function($scope, $timeout){
            $scope.counter--;
            console.log(this.count);
            if($scope.counter > 0){
              mytimeout = $timeout($scope.onTimeout,1000);
            }

            else{
              console.log("Time to go shopping!");
            }
          }
          var mytimeout = $timeout($scope.onTimeout,1000);
            
            $scope.reset= function(){
                $scope.counter = 5;
                mytimeout = $timeout($scope.onTimeout,1000);
            }
        };
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
         console.log("error: ",response);
    });

	$scope.counter = 15;
	//$scope.timeUntil = Date.now() - $scope.counter;
	$scope.onTimeout = function(){
		$scope.counter--;
		console.log(this.count);
		if($scope.counter > 0){
			mytimeout = $timeout($scope.onTimeout,1000);
		}

		else{
			console.log("Time to go shopping!");
		}
	}
	var mytimeout = $timeout($scope.onTimeout,1000);
    
    $scope.reset= function(){
        $scope.counter = 5;
        mytimeout = $timeout($scope.onTimeout,1000);
    }
});

app.filter('secondsToDateTime', [function(){
	return function(seconds) {
		return new Date(1970, 0, 1).setSeconds(seconds);
	};
}])