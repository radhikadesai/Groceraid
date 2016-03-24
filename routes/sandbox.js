var express = require('express');
var router = express.Router();

/* You are entering my sandbox. Proceed with caution. */
router.get('/', function(req, res, next) {
	var spawn = require("child_process").spawn;
	var jsonObj = {'user_input':'Hello Mr. Fridge today you have milk eggs and cheese'}; //{'user_input':'Hello Mr. Fridge today you have milk eggs and cheese'}; {'user_input':['chocolate', 'milk']}; {'user_input':'1309 NW 5th Ave, Gainesville, FL'};
	var process = spawn('python',["python/process_speech.py", JSON.stringify(jsonObj)]);
	process.stdout.on('data', function (data){
		var x = JSON.parse(data);
		res.send(JSON.stringify(x));
	});
});

module.exports = router;