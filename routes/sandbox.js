var express = require('express');
var router = express.Router();

/* You are entering my sandbox. Proceed with caution. */
router.get('/test', function(req, res, next) {
	var spawn = require("child_process").spawn;
	var jsonObj =  {'user_input':'Hello Mr. Fridge today you have milk 2 eggs and cheese'}; 
	var process = spawn('python',["python/process_speech.py", JSON.stringify(jsonObj)]);
	process.stdout.on('data', function (data){
		var x = JSON.parse(data);
		res.send(JSON.stringify(x));
	});
});

router.get('/recipes', function(req, res, next) {
	var spawn = require("child_process").spawn;
	var jsonObj =  {'user_input':['chocolate', 'milk'], 'f':"recipes"}; 
	var process = spawn('python',["python/recipes.py", JSON.stringify(jsonObj)]);
	process.stdout.on('data', function (data){
		var x = JSON.parse(data);
		res.send(JSON.stringify(x));
	});
});

router.get('/suggest', function(req, res, next) {
	var spawn = require("child_process").spawn;
	var jsonObj =  {'user_input':['chocolate', 'milk'], 'f':"suggest"}; 
	var process = spawn('python',["python/recipes.py", JSON.stringify(jsonObj)]);
	process.stdout.on('data', function (data){
		var x = JSON.parse(data);
		res.send(JSON.stringify(x));
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