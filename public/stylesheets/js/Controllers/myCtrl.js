app.controller("myCtrl", function($scope, $http, $timeout) {
  
  /*
  $http.get("http://10.136.103.170:3000/sandbox")
    .then(function mySuccess(response) {
        $scope.myWelcome = response.data[user_input];
        alert("Worked");
    });
*/
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

    $scope.timeFunction = function($scope, $timeout){
      //Counter needs to actually be initialized with the min value of the foods list's time
      //until something is predicted to run out
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
      var mytimeout = $timeout($scope.onTimeout($scope),1000);
        
      $scope.reset= function(){
        $scope.counter = 5;
        mytimeout = $timeout($scope.onTimeout,1000);
      }
    };
    */
    /*
    $http({
        method : "GET",
        url : "http://localhost:3000/food"
    }).then(function mySucces(response) {
        $scope.myWelcome = response.data;
        console.log("$scope.myWelcome: ",$scope.myWelcome);
        /*
        $scope.counter = 15;
        $scope.myTimeFunction = $scope.timeFunction();
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
        /*
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
*/

    $http({
        method : "GET",
        url : "http://localhost:3000/sandbox/suggest"
    }).then(function mySucces(response) {
        $scope.suggestions = response.data.result.suggestions;
        $scope.recipes = response.data.result.recipes;
        console.log("$scope.suggestions: ",$scope.suggestions);
        console.log("$scope.recipes: ",$scope.recipes);
    }, function myError(response) {
        $scope.suggestions = response.statusText;
         console.log("error: ",response);
    });

    $http({
        method : "GET",
        url : "http://localhost:3000/testStoresData"
    }).then(function mySucces(response) {
        $scope.stores = response.data;
        //$scope.storeDataArr = $scope.myWelcome.result;
        console.log("$scope.stores: ",$scope.stores);
    }, function myError(response) {
        $scope.stores = response.statusText;
         console.log("error: ",response);
    });


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