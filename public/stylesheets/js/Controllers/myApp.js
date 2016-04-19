var ip = window.location.href;
var app = angular.module("myApp", []);

app.controller("timeCtrl", function($scope, $http, $timeout){
	//Counter needs to actually be initialized with the min value of the foods list's time
	//until something is predicted to run out
  $scope.foodName = "pizza";
  
	$http({
        method : "GET",
        url : ip + "food"
    }).then(function mySucces(response) {
        $scope.myWelcome = response.data;
        console.log("$scope.myWelcome: ",$scope.myWelcome);
        $scope.tripDate = new Date();
        $scope.counter = 3600;
        $scope.numFoods = 0;
        for(var food in $scope.myWelcome){
          $scope.numFoods += $scope.myWelcome[food].abundance;
        }

    }, function myError(response) {
        $scope.myWelcome = response.statusText;
         console.log("error: ",response);
    });

	$http({
        method : "GET",
        url : ip + "food/time_to_next_trip"
    }).then(function mySucces(response) {
        $scope.counter = Math.floor(response.data.time_to_trip);
        console.log("$scope.myWelcome: ",$scope.myWelcome);
        console.log("TimeResponseData: ", response.data);
        console.log("$scope.counter: ",$scope.counter);

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

        $scope.plusOne = function(key){
          // $scope.myWelcome[key].abundance+=1;
          // console.log($scope.myWelcome.size);
          $http({
            method : "POST",
            url : ip + "food/inc_abundance",
            data : { food: key}

          }).then(function mySucces(response) {
                $scope.myWelcome = response.data;
                $scope.numFoods += 1;
                $scope.updateTime();
             }, function myError(response) {
             
              console.log("error: ",response);
             });
         
        };

        $scope.minusOne = function(key){
          //$scope.myWelcome[key].abundance-=1;
          $http({
            method : "POST",
            url : ip + "food/dec_abundance",
            data : { food: key}

          }).then(function mySucces(response) {
                $scope.myWelcome = response.data;
                if($scope.myWelcome[key].abundance == 0)
                  $scope.counter = 0;
                $scope.numFoods -=1;
                $scope.updateTime();
             }, function myError(response) {
             
              console.log("error: ",response);
             });
         };

        $scope.hideLessThanZero = function(value){
            if(value <= 0)
              return false;
            else
              return true;
        }

        $scope.showTable = function(){
         
          if($scope.numFoods <= 0)
            return false;
          else 
            return true;

        }

        $scope.updateTime = function(){
         
          $http({
                  method : "GET",
                  url : ip + "food/time_to_next_trip"
              }).then(function mySucces(response) {
                  $scope.counter = Math.floor(response.data.time_to_trip);
                  console.log("AddfoodTest: ", $scope.counter);
                }, function myError(response) {
                  $scope.myWelcome = response.statusText;
                   console.log("error: ",response);
              });
        }

        $scope.addFood = function(){
            console.log($scope.foodName);
             $http({
                method : "POST",
                url : ip + "food/add_food",
                data : { food: $scope.foodName}

             }).then(function mySucces(response) {
                $scope.myWelcome = response.data;
                $scope.numFoods += 1;
                $scope.updateTime();
             }, function myError(response) {
             
              console.log("error: ",response);
             });

        }

        $scope.Math = Math;
        console.log("Date.now() test: ", Date.now());
        $scope.timeFunction = function($scope, $timeout){
          //Counter needs to actually be initialized with the min value of the foods list's time
          //until something is predicted to run out
          $scope.onTimeout = function($scope, $timeout){
            if($scope.counter > 0)
            {
              $scope.counter--;
            }
            
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

	//$scope.counter = 15;
	//$scope.timeUntil = Date.now() - $scope.counter;
	$scope.onTimeout = function(){
    //$scope.counter = Math.floor($scope.counter);
    if($scope.counter > 0)
    {
      $scope.counter--;
    }

		//console.log(this.count);
		//console.log("CounterValue: ", $scope.counter);

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

// $scope.updateTime = function(){
 
// }


app.filter('secondsToDateTime', [function(){
	return function(seconds) {
		return new Date(1970, 0, 1).setSeconds(seconds);
	};

}])