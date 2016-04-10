app.controller("suggestCtrl", function($scope, $http) {

    $http({
        method : "GET",
        url : "http://localhost:3000/sandbox/suggest"
    }).then(function mySucces(response) {
        $scope.suggestions = response.data.result;
        console.log("$scope.suggestions: ",$scope.suggestions);
    }, function myError(response) {
        $scope.suggestions = response.statusText;
         console.log("error: ",response);
    });
   
});

