var express = require('express');
var router = express.Router();
var milk = Date.now();
var eggs = Date.now() - 360000;
GLOBAL.foods={"milk":{abundance : 0,consumption : [420000, 420000, 420000], last_trip : milk},
			"eggs":{abundance : 0,consumption : [420000], last_trip : eggs},
			"chocolate":{abundance: 1,consumption : [420000, 420000, 420000], last_trip : milk},
			 "strawberry":{abundance: 1,consumption : [420000], last_trip : milk}}

// foods : {"milk":{abundance : 0, consumption : [], last_trip : timestamp(0 initially) },
//			"eggs":{abundance: 1, consumption : [], last_trip : timestamp}}

// {"user_input":"Hello Mr. Fridge today you have milk eggs and cheese","list_of_foods":["milk","eggs","cheese"]}
// TODO : Add a number to the food type, eg. 4 eggs, 2 milk
createFoods = function(user_input,list_of_foods){
	console.log("List of foods : ",list_of_foods);
	if(user_input.includes("low on")){
		if(foods!=undefined){
			list_of_foods.forEach(function(food){
				foods[food].abundance = 0;
			});	
		}
	}
	else{
		list_of_foods.forEach(function(food){
			if(foods[food]!= undefined){
				foods[food].abundance = foods[food].abundance + 1;
			}
			else{
				foods[food] = {abundance : 1,consumption : [], last_trip : Date.now()}
			}
			var now = Date.now();
			if(foods[food].last_trip!==0){
				foods[food].consumption.push(now-foods[food].last_trip);
			}
			foods[food].last_trip = now;
		});
	}
}
router.post('/', function(req, res, next) {
	var spawn = require("child_process").spawn;
	var test=req.body;
	console.log("kevin's input : ",test);
	var process = spawn('python',["python/process_speech.py", JSON.stringify(test)]);
	process.stdout.on('data', function (data){
		var x = JSON.parse(data);
		createFoods(x.user_input, x.list_of_foods);
		console.log("Foods in Fridge : ",foods)
	});
});

router.get('/time_to_next_trip',function(req, res, next){
	var total=0;
	var min =0;
	var now = Date.now();
	// Set the min as the first non-empty consumption in the fridge   
   	for(var food in foods){
   		if(foods[food].consumption.length>0){
   			var i=0;
   			while( i < foods[food].consumption.length)
			{
			    total=total+foods[food].consumption[i];
			    i++;
			}
   			var avg=total/(foods[food].consumption.length);
			min = (foods[food].last_trip + avg) - now;
   			break;
   		}
   	}
   	// calculate the min time for all the foods in the fridge
	for(var food in foods){
		total =0;
		var i=0;
    	while( i < foods[food].consumption.length)
		{
		    total=total+foods[food].consumption[i];
		    i++;
		}
		if(foods[food].consumption.length>0)
		{ 
			var avg=total/(foods[food].consumption.length);
			min=Math.min(min,((foods[food].last_trip + avg) - now));
		}
	}
	if(min<0){
		min=0;
	}
	res.send({"time_to_trip": min/1000});
});

//router.post('/', function(req, res, next) {
	//createFoods(req.body.user_input,req.body.list_of_foods);	
//});

// Gets all the foods in the fridge whose abundance is > 0
router.get('/', function(req, res, next) {
	var foodsToSend={};
	for(var food in foods){
		if(foods[food].abundance>0){
			foodsToSend[food]=foods[food];
		}
	}
	res.send(foodsToSend);
});

router.post('/dec_abundance',function(req, res, next){
 	var food_name = req.body.food
 	foods[food_name].abundance -= 1
 	res.send(foods);
 	console.log(foods);
});

router.post('/inc_abundance',function(req, res, next){
 	var food_name = req.body.food
 	foods[food_name].abundance += 1
 	res.send(foods);
 	console.log(foods);
});

router.post('/add_food',function(req, res, next){
	console.log(req.body.food);
 	var food_name = req.body.food
 	if(foods[food_name]){
		foods[food_name].abundance = foods[food_name].abundance + 1;
	}
	else{
		foods[food_name] = {abundance : 1,consumption : [], last_trip : 0}
	}
 	res.send(foods);
 	console.log(foods);

});

module.exports = router;