var express = require('express');
var food = require('./food.js');
//var geolocate=require('geolocate');
//var geocoder=require('geocoder');
var router = express.Router();

/* You are entering my sandbox. Proceed with caution. */
router.post('/test', function(req, res, next) {
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

router.get('/suggest', function(req, res, next) {
	var spawn = require("child_process").spawn;
	var foodsInFridge =[];
	for (var food in foods){
		foodsInFridge.push(food);
	}
	var jsonObj =  {'user_input':foodsInFridge}; 
	var process = spawn('python',["python/recipes.py", JSON.stringify(jsonObj)]);
	process.stdout.on('data', function (data){
		var x = JSON.parse(data);
		res.send(JSON.stringify(x));
	});
});
router.get('/location',function(req,res,next)
{  
	var latitude;
	var longitude;
	geolocate(function(latLong)
	{
        latitude=latLong[0];
        longitude=latLong[1];
        console.log("location is",longitude);
	});
	geocoder.reverseGeocode(latitude,longitude,function(err,data)
	{
       console.log(data);
	});

});
router.get('/maps', function(req, res, next) {
	var spawn = require("child_process").spawn;
	var jsonObj =  {'user_input':'1309 NW 5th Ave, Gainesville, FL'};
	var process = spawn('python',["python/maps.py", JSON.stringify(jsonObj)]);
	process.stdout.on('data', function (data){
		var x = JSON.parse(data);
		res.send(JSON.stringify(x));
	});
});

module.exports = router;