var ip = window.location.href;
app.controller("newCtrl", function($scope, $http, $timeout) {

	$http({
        method : "GET",
        url : ip + "sandbox/suggest"
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
        url : ip + "sandbox/location"
    }).then(function mySucces(response) {
        $scope.stores = response.data;
        //$scope.storeDataArr = $scope.myWelcome.result;
        console.log("$scope.stores: ",$scope.stores);
    }, function myError(response) {
        $scope.stores = response.statusText;
         console.log("error: ",response);
    });


    $http({
        method : "GET",
        url : ip + "food/foods_to_buy"
    }).then(function mySucces(response) {
        $scope.foodsToGet = response.data;
        console.log("$scope.foodsToGet: ",$scope.foodsToGet);
        // $scope.numFoods = 0;
        // for(var food in $scope.myWelcome){
        //   $scope.numFoods += $scope.myWelcome[food].abundance;
        // }


    }, function myError(response) {
        $scope.foodsToGet = response.statusText;
         console.log("error: ",response);
    });

    $scope.minusShoppingListItem = function(key){
          //$scope.myWelcome[key].abundance-=1;
          $http({
            method : "POST",
            url : ip + "food/remove_from_shopping_list",
            data : { food: key}

          }).then(function mySucces(response) {
                $scope.foodList = response.data;
                
             }, function myError(response) {
             
              console.log("error: ",response);
             });
         };
    $scope.addToShoppingList = function(key){
          //$scope.myWelcome[key].abundance-=1;
          $http({
            method : "POST",
            url : ip + "food/add_to_shopping_list",
            data : { food: key}

          }).then(function mySucces(response) {
                $scope.foodItem = response.data;
             }, function myError(response) {
             
              console.log("error: ",response);
             });
         };
})