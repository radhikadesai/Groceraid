food.directive('healthInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: 'healthInfo.html',
    controller: '../Controllers/healthController.js'
  }; 
});