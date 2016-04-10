app.controller("recipesCtrl", function($scope, $http) {

    $http({
        method : "GET",
        url : "http://localhost:3000/sandbox/recipes"
    }).then(function mySucces(response) {
        $scope.recipes = response.data.result;
        console.log("$scope.recipes: ",$scope.recipes);
    }, function myError(response) {
        $scope.recipes = response.statusText;
         console.log("error: ",response);
    });
   
});