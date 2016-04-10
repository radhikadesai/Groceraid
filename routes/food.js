var express = require('express');
var router = express.Router();
GLOBAL.foods={}

// foods : {"milk":{abundance : 0},
//			"eggs":{abundance: 1}}

// {"user_input":"Hello Mr. Fridge today you have milk eggs and cheese","list_of_foods":["milk","eggs","cheese"]}
// TODO : Add a number to the food type, eg. 4 eggs, 2 milk

router.post('/', function(req, res, next) {
	console.log("REQ BODY : ", req.body.list_of_foods);
	if(req.body.user_input.includes("low on")){
		req.body.list_of_foods.forEach(function(food){
			foods[food].abundance = 0;
			console.log("Low on foods",foods);
		});
		
	}
	else{
		req.body.list_of_foods.forEach(function(food){
		if(foods[food]){
			foods[food].abundance = foods[food].abundance + 1;
		}
		else{
			foods[food] = {abundance : 1}
		}
		console.log("Abundance",foods);

		});
	}
});

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