app.controller("myStoresCtrl", function($scope, $http) {

    $http({
        method : "GET",
        url : "http://localhost:3000/testStoresData"
    }).then(function mySucces(response) {
        $scope.myWelcome = response.data;
        //$scope.storeDataArr = $scope.myWelcome.result;
        console.log("$scope.myWelcome: ",$scope.myWelcome);
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
         console.log("error: ",response);
    });
});