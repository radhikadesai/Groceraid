var express = require('express');
var router = express.Router();
GLOBAL.foods={}

// foods : {"milk":{abundance : 0},
//			"eggs":{abundance: 1}}

// {"user_input":"Hello Mr. Fridge today you have milk eggs and cheese","list_of_foods":["milk","eggs","cheese"]}
// TODO : Add a number to the food type, eg. 4 eggs, 2 milk
createFoods = function(user_input,list_of_foods){
	console.log("List of foods : ", list_of_foods);
	if(user_input.includes("low on")){
		if(foods!=undefined){
			req.body.list_of_foods.forEach(function(food){
				foods[food].abundance = 0;
			});	
		}
	}
	else{
		list_of_foods.forEach(function(food){
		if(foods[food]){
			foods[food].abundance = foods[food].abundance + 1;
		}
		else{
			foods[food] = {abundance : 1}
		}
		});
	}
}
router.post('/', function(req, res, next) {
	var spawn = require("child_process").spawn;
	var test=req.body;
	console.log(test);
	var jsonObj =  {'user_input':'Hello Mr. Fridge today you have milk 2 eggs and cheese'}; 
	var process = spawn('python',["python/process_speech.py", JSON.stringify(jsonObj)]);
	process.stdout.on('data', function (data){
		var x = JSON.parse(data);
		createFoods(x.user_input, x.list_of_foods);
		res.send(foods);
	});
});

//router.post('/', function(req, res, next) {
	//createFoods(req.body.user_input,req.body.list_of_foods);	
//});

// Gets all the foods in the fridge whose abundance is > 0
router.get('/', function(req, res, next) {
	console.log("in get : ",foods)
	var foodsToSend={};
	for(var food in foods){
		if(foods[food].abundance>0){
			foodsToSend[food]=foods[food];
		}
	}
	res.send(foodsToSend);
});
module.exports = router;